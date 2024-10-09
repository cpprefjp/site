# 定義された用語の意図しない使用を検出する

import glob
import os
import sys
import re

DEFINED_WORD_LIST = [
    # ターゲット用語, その用語の許可された使用方法リスト, 許可しない使用方法リスト
    ("未定義", ["未定義動作", "未定義の動作", "動作は未定義", "未定義アドレス"], ["未定義動作となる"]),
    # 「未定義アドレス」は意味が明確に規定されていない。規定されたら「未定義動作」を使用した説明に差し替える
    # LWG issue 3906. "Undefined address" is undefined
    # https://cplusplus.github.io/LWG/issue3906
]

def check_defined_word(text: str, filename: str) -> bool:
    found_error: bool = False

    for word, allow_list, disallow_list in DEFINED_WORD_LIST:
        match_list = [m.start() for m in re.finditer(word, text)]
        if len(match_list) == 0:
            continue

        for i in match_list:
            ok_count = 0
            for allow_word in allow_list:
                index = allow_word.find(word)
                n = len(allow_word)

                if i - index < 0:
                    continue

                j = i - index
                sliced = text[j:j+n]
                if sliced == allow_word:
                    ok_count += 1

            ng_count = 0
            for disallow_word in disallow_list:
                index = disallow_word.find(word)
                n = len(disallow_word)

                if i - index < 0:
                    continue

                j = i - index
                sliced = text[j:j+n]
                if sliced == disallow_word:
                    ng_count += 1

            if ok_count == 0 or ng_count > 0:
                start = text.rfind('\n', 0, i)
                if start < 0:
                    start = 0
                else:
                    start = start + 1

                end = text.find('\n', i)
                if end < 0:
                    end = start + 20

                around_word = text[start:end]
                print("{}: the file includes unintended word use \"{}\". Around the word:\"{}\"".format(filename, word, around_word))
                found_error = True

    return not found_error

if __name__ == '__main__':
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        if p.startswith("start_editing/"):
            continue

        with open(p) as f:
            text = f.read()

        if not check_defined_word(text, p):
            found_error = True

    if found_error:
        sys.exit(1)
