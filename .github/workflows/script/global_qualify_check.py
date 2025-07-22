# GLOBAL_QYALIFY_LIST.txtファイルについて、以下をチェックする：
# 1. プライマリ宣言ではないオーバーロード・特殊化がないこと

import glob
import os
import sys
import re

def convrert_qualify_list(qualify_list: str) -> list:
    ls: list(str, str) = []
    for line in qualify_list.split("\n"):
        stripped_line = line.strip()
        if not stripped_line or stripped_line.startswith("#"):
            continue
        m = re.fullmatch(r'[\*-] (.*?)\[link(.*?)\]', stripped_line)
        if m:
            ls.append((m.group(1), m.group(2).strip()))
    return ls

def check(global_qualify_list_str: str, primary_overload_specialization_list_str: str) -> bool:
    found_error: bool = False

    global_qualify_list = convrert_qualify_list(global_qualify_list_str)
    primary_overload_specialization_list = convrert_qualify_list(primary_overload_specialization_list_str)

    for name, link in global_qualify_list:
        for primary_name, primary_link in primary_overload_specialization_list:
            if name == primary_name:
                if not primary_link:
                    print(f"global_qualify_check: {name} is defined at GLOBAL_QUALIFY_LIST.txt, but the link doe's not have primary declaration.")
                    found_error = True
                elif link != primary_link:
                    print(f"global_qualify_check: {name} is defined at GLOBAL_QUALIFY_LIST.txt, but the link is not for primary declaration.")
                    found_error = True

    return not found_error

if __name__ == '__main__':
    found_error = False
    with open("GLOBAL_QUALIFY_LIST.txt") as f:
        global_qualify_list = f.read()
    with open("PRIMARY_OVERLOAD_SPECIALIZATION.txt") as f:
        primary_overload_specialization_list = f.read()

    if not check(global_qualify_list, primary_overload_specialization_list):
        found_error = True

    if found_error:
        sys.exit(1)
