# 言語機能ページに注意事項を記載・更新する
# リポジトリのトップディレクトリで以下を実行する
# python3 .github/workflows/script/update_lang_caution.py

import glob
import os
import sys
import re

LANG_CAUTION = '''このページはC++{}に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。'''

FUTURE_LANG_CAUTION = '''このページはC++{}に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。'''

FUTURE_LANG_VERSION = 26

START_CAUTION = "<!-- start lang caution -->"
LAST_CAUTION = "<!-- last lang caution -->"

def update_lang_caution(text: str, filename: str) -> str:
    version = 0
    new_lines = []
    is_version_line = False
    start_lang_caution = False
    end_lang_caution = False
    found_relative_page = False
    for line in text.splitlines():
        m = re.search(r'\* cpp(.*?)\[meta cpp\]', line)
        if m:
            version = int(m[1])
            new_lines.append(line)
            is_version_line = True
            continue

        if start_lang_caution:
            if line == LAST_CAUTION:
                start_lang_caution = False
                end_lang_caution = True
            continue

        if len(line) <= 0:
            new_lines.append(line)
            continue

        if line == "## 関連項目":
            new_lines.append("## <a id=\"relative-page\" href=\"#relative-page\">関連項目</a>")
            found_relative_page = True
            continue
        elif line == "## <a id=\"relative-page\" href=\"#relative-page\">関連項目</a>":
            found_relative_page = True

        if not end_lang_caution:
            is_lang_caution = False
            if line == START_CAUTION:
                start_lang_caution = True
                is_lang_caution = True
            elif is_version_line:
                is_version_line = False
                if not start_lang_caution:
                    is_lang_caution = True

            if is_lang_caution:
                caution_text = LANG_CAUTION if version < FUTURE_LANG_VERSION else FUTURE_LANG_CAUTION
                new_lines.append(START_CAUTION)
                new_lines.append("")
                new_lines.append(caution_text.format(version))
                new_lines.append("")
                new_lines.append(LAST_CAUTION)
                if not start_lang_caution:
                    new_lines.append("")

            if not start_lang_caution:
                new_lines.append(line)
            continue

        new_lines.append(line)

    new_text = "\n".join(new_lines)
    if not found_relative_page:
        new_text = new_text.replace("[関連項目](#relative_page)", "関連項目")
    return new_text

if __name__ == '__main__':
    for p in sorted(list(glob.glob("lang/**/*.md", recursive=True))):
        if p.count("/") <= 1:
            continue

        with open(p) as f:
            text = f.read()

        new_text = update_lang_caution(text, p)
        if text != new_text and text != (new_text + "\n") and (text + "\n") != new_text:
            print("hit {}".format(p))
            with open(p, 'w') as f:
                f.write(new_text)
