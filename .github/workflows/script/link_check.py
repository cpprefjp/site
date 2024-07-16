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

urllib3.disable_warnings()

def retry_sleep():
    sec = random.uniform(20, 30);
    time.sleep(sec)

def check_url(url: str, retry: int = 5) -> (bool, str):
    try:
        headers = {'User-agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers, verify=False, timeout=60.0)
        if res.url:
            if res.url == url:
                return res.status_code != 404, "404"
            return check_url(res.url)
        else:
            return res.status_code != 404, "404"
    except requests.exceptions.ConnectionError as e:
        if retry <= 0:
            return False, "requests.exceptions.ConnectionError : {} ".format(e)
        retry_sleep()
        return check_url(url, retry - 1)
    except requests.exceptions.RequestException as e:
        if retry <= 0:
            return False, "requests.exceptions.RequestException : {}".format(e)
        retry_sleep()
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
    "https://web.archive.org", # 確実に存在すると思われる
    "http://cse.naro.affrc.go.jp", # 海外 (GitHub Actions) からのアクセスを排除していると思われる
    "https://www.cryptopp.com", # アクセスチェックでよく失敗するがブラウザ上では問題なくアクセスできる
    "https://www.microsoft.com/", # ちょくちょく失敗するが、一時的なものだと思われる
]

def is_ignore_link(link: str) -> bool:
    for x in IGNORE_LIST:
        if link.startswith(x):
            return True
    return False


def find_all_links(text: str) -> (list, set):
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
        for m in re.finditer(r'[\*-] (.*?)\[link (.*?)\]', line):
            add_link(m.group(2))

    return inner_links, outer_links

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
    args = argparser.parse_args()

    if not args.check_inner_link and not args.check_outer_link:
        print("unchecked", file=sys.stderr)
        sys.exit(1)

    found_error = False
    current_dir = os.getcwd()
    outer_link_dict = dict()
    for p in glob.glob("**/*.md", recursive=True):
        dirname = os.path.dirname(p)
        with open(p) as f:
            text = f.read()

        inner_links, outer_links = find_all_links(text)
        for link in outer_links:
            if link in outer_link_dict:
                outer_link_dict[link].append(p)
            else:
                outer_link_dict[link] = [p]

        if args.check_inner_link:
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

    if args.check_outer_link:
        for link, from_list in outer_link_dict.items():
            exists, reason = check_url(link)
            if not exists:
                print("URL {} not found. {} from:{}".format(link, reason, from_list), file=sys.stderr)
                found_error = True

    if found_error:
        sys.exit(1)
