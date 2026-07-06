import argparse
import glob
import re
import os
import urllib.request, urllib.error, urllib.parse
import urllib3
import requests
import sys
import time
import random
from concurrent.futures import ThreadPoolExecutor

urllib3.disable_warnings()

# 外部リンクチェックの並列数。ネットワークI/OバウンドなのでスレッドでOK。
# open-std.org (全URLの過半) が同時16接続を問題なく捌けることを実測して決定。
OUTER_LINK_WORKERS = 16

MAX_OUTER_LINK_RETRY = 3

def retry_sleep(retry: int) -> None:
    # 指数バックオフ + ジッタ。残りretry回数から試行回数を求めて待機時間を増やし、
    # ジッタで再試行タイミングを分散させる (レート制限中のサーバへの集中を避ける)。
    attempt = MAX_OUTER_LINK_RETRY - retry + 1  # 1, 2, 3, ...
    backoff = min(15 * (2 ** (attempt - 1)), 60)  # 15, 30, 60 秒 (上限60秒)
    time.sleep(backoff + random.uniform(0, 15))   # 0〜15秒のジッタ

def check_url(url: str, retry: int = MAX_OUTER_LINK_RETRY) -> tuple[bool, str]:
    try:
        headers = {'User-agent': 'Mozilla/5.0'}
        # パフォーマンスのため本文は取得せずHEADで確認する。
        # ただしallow_redirects=Trueでリダイレクトはrequestsに追わせ、最終的な
        # ステータスで判定する (手動でres.urlを辿る再帰をやめ、リトライ回数が
        # 途中でリセットされる問題を避ける)。
        res = requests.head(url, headers=headers, verify=False, timeout=60.0,
                            allow_redirects=True)
        return res.status_code != 404, str(res.status_code)
    except requests.exceptions.TooManyRedirects:
        # リダイレクトループ (http↔httpsを行き来する等)。ブラウザではHSTS等で
        # 到達できることが多く、リトライしても解消しないため、存在するものとして
        # 扱う (ループ誤検出とムダな再試行を避ける)。
        # ※ TooManyRedirectsはRequestExceptionのサブクラスなので、下の汎用ハンドラ
        #    より前で捕捉する必要がある。
        return True, "redirect loop"
    except requests.exceptions.ConnectionError as e:
        if retry <= 0:
            return False, "requests.exceptions.ConnectionError : {} ".format(e)
        retry_sleep(retry)
        return check_url(url, retry - 1)
    except requests.exceptions.RequestException as e:
        if retry <= 0:
            return False, "requests.exceptions.RequestException : {}".format(e)
        retry_sleep(retry)
        return check_url(url, retry - 1)
    except Exception as e:
        return False, "unknown exception : {}".format(e)

def fix_link(link: str) -> str:
    if "http" in link or ".md" in link:
        if "http" in link and "(" in link and ")" not in link:
            link = link + ")"
        return re.sub("#.*", "", link.strip())
    else:
        if not link:
            return ""

        if link.startswith("#"):
            return ""

        return link

IGNORE_LIST = [
    "http://web.archive.org", # 確実に存在すると思われる
    "https://web.archive.org", # 確実に存在すると思われる
    "http://cse.naro.affrc.go.jp", # 海外 (GitHub Actions) からのアクセスを排除していると思われる
    "https://www.cryptopp.com", # アクセスチェックでよく失敗するがブラウザ上では問題なくアクセスできる
    "https://www.microsoft.com/", # ちょくちょく失敗するが、一時的なものだと思われる
    "https://www.gnu.org/", # 毎週失敗する。/lang/cpp11/thread_local_storage.md でのみ使用。gcc.gnu.orgは失敗しない
]

IGNORE_REGEX_LIST = [
    re.compile(r"https://github.com/(.*?)/(.*?)/commit/(.*?)") # 貢献ポイントの集計用 (非ユーザー向け)
]

def is_ignore_link(link: str) -> bool:
    for x in IGNORE_LIST:
        if link.startswith(x):
            return True
    for x in IGNORE_REGEX_LIST:
        if x.fullmatch(link):
            return True
    return False


def find_all_links(text: str, is_global: bool) -> tuple[list, set[str]]:
    inner_links = []
    outer_links = set()

    def add_link(origin_link: str):
        link = fix_link(origin_link)
        if link:
            if "http" in link:
                if not is_ignore_link(link):
                    outer_links.add(link)
            else:
                inner_links.append(link)

    in_code_block = False
    for line in text.split("\n"):
        # コードブロックのなかは、チェックしない
        is_code_block = line.strip().startswith("```")
        if is_code_block:
            in_code_block = not in_code_block
            continue

        if in_code_block:
            continue

        for m in re.finditer(r'\[(.*?)\]\((.*?)\)', line):
            pretext = line[0:m.start(0)]
            # コード修飾のなかは、チェックしない
            incode = pretext.count("`")
            if pretext.count("`") % 2 != 0:
                continue

            link = m.group(2)
            if '(' in link:
                index = line.find(')', m.end(0))
                after_link = line[m.start(2):index]
                add_link(after_link)
            else:
                add_link(link)

    for line in text.split("\n"):
        # コメント
        if is_global and line.startswith("#"):
            continue

        for m in re.finditer(r'[\*-] (.*?)\[link (.*?)\]', line):
            add_link(m.group(2))

    return inner_links, outer_links

def check(check_inner_link: bool, check_outer_link: bool, url: str) -> bool:
    if not check_inner_link and not check_outer_link:
        print("unchecked", file=sys.stderr)
        return False

    found_error = False
    current_dir = os.getcwd()
    outer_link_dict = dict()
    if len(url) <= 0:
        path_list = [(p, False) for p in glob.glob("**/*.md", recursive=True)]
        path_list.append(("GLOBAL_QUALIFY_LIST.txt", True))
        path_list.append(("PRIMARY_OVERLOAD_SPECIALIZATION.txt", True))
        for p, is_global in path_list:
            dirname = os.path.dirname(p)
            with open(p) as f:
                text = f.read()

            inner_links, outer_links = find_all_links(text, is_global)
            for link in outer_links:
                if link in outer_link_dict:
                    outer_link_dict[link].append(p)
                else:
                    outer_link_dict[link] = [p]

            if check_inner_link:
                for link in inner_links:
                    rel_link = ""
                    if link.startswith("/"):
                        rel_link = os.path.join(current_dir, link.lstrip("/"))
                    else:
                        rel_link = os.path.join(dirname, link)

                    if link.endswith(".nolink"):
                        if os.path.exists(rel_link.rstrip(".nolink")):
                            print("nolinked {} href {} found.".format(p, link.rstrip(".nolink")), file=sys.stderr)
                            found_error = True
                    else:
                        if not os.path.exists(rel_link):
                            print("{} href {} not found.".format(p, link), file=sys.stderr)
                            found_error = True

    if check_outer_link:
        if len(url) > 0:
            outer_link_dict[url] = ""

        def check_one(item):
            link, from_list = item
            exists, reason = check_url(link)
            return link, from_list, exists, reason

        # 1パス目: 失敗したURLだけ集める (ネットワークI/Oバウンドなのでスレッドで並列化)
        failed = []
        with ThreadPoolExecutor(max_workers=OUTER_LINK_WORKERS) as executor:
            for link, from_list, exists, reason in executor.map(check_one, outer_link_dict.items()):
                if not exists:
                    failed.append((link, from_list))

        # 2パス目: 一時的な障害 (ランナーのネットワーク輻輳やサイトの瞬断) を
        # 誤検出しないよう、間をあけて失敗したURLのみ再チェックし、
        # 両方のパスで失敗したものだけを報告する
        if failed:
            time.sleep(120)
            with ThreadPoolExecutor(max_workers=OUTER_LINK_WORKERS) as executor:
                for link, from_list, exists, reason in executor.map(check_one, failed):
                    if not exists:
                        print("URL {} not found. {} from:{}".format(link, reason, from_list), file=sys.stderr)
                        found_error = True

    return not found_error

def check_inner_link() -> bool:
    return check(True, False, '')

if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="")
    argparser.add_argument("--check-inner-link",
                           dest='check_inner_link',
                           action='store_true',
                           default=False)
    argparser.add_argument("--check-outer-link",
                           dest='check_outer_link',
                           action='store_true',
                           default=False)
    argparser.add_argument("--url",
                           dest='url',
                           type=str,
                           default='')
    args = argparser.parse_args()

    if not check(args.check_inner_link, args.check_outer_link, args.url):
        sys.exit(1)

