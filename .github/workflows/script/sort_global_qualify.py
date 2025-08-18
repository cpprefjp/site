# グローバル修飾リストと、プライマリオーバーロード特殊化リストをソートするスクリプト
# トップディレクトリで以下を実行する：
# python3 .github/workflows/script/sort_global_qualify.py
#
# GLOBAL_QUALIFY_LIST.txtのソートルール：
# 1. コメントグループと修飾グループに分ける
# 2. コメントグループはそのままの順序で、修飾グループはヘッダの辞書順にソートする
# 3. 修飾グループ内では、以下のルールでソートする：
#    3.1. 名前空間が深い順にソートする (::の数が多い順)
#    3.2. 長い名前順にソートする ("abc"と"abcdef"では後者を優先)
#    3.3. 大文字・小文字を区別する
#
# PRIMARY_OVERLOAD_SPECIALIZATION.txtのソートルール：
# 1. 空行でグループを分ける
#     1.1. 先頭行が`# header`で始まらないグループはコメントグループとみなし、位置を維持する
#     1.2. そうではないグループは、修飾グループとみなす
# 2. 修飾グループ内では、以下を除いてGLOBAL_QUALIFY_LIST.txtと同様のルールでソートする
#     2.1. コメントは位置を維持する

from enum import Enum
import functools
import os

class Group(Enum):
    NONE = 0
    COMMENT = 1
    QUALIFY = 2

def flatten(arr: list[list[str]]) -> list[str]:
    return sum(arr, [])

def load_global_qualify_list() -> list[list[str]]:
    ls: list[list[str]] = []
    with open('GLOBAL_QUALIFY_LIST.txt', 'r', encoding='utf-8') as f:
        file = f.read()
        group_type = Group.NONE
        group: list[str] = []
        for line in file.split("\n"):
            if not line:
                continue

            if line.startswith("#"):
                if group_type != Group.COMMENT:
                    group_type = Group.COMMENT
                    if len(group) > 0:
                        ls.append(group)
                        group = []
                group.append(line)
            else:
                if group_type != Group.QUALIFY:
                    group_type = Group.QUALIFY
                    if len(group) > 0:
                        ls.append(group)
                        group = []
                elif not line.startswith("    "):
                    if len(group) > 0:
                        ls.append(group)
                        group = []
                group.append(line)

        if len(group) > 0:
            ls.append(group)
    return ls

def common_compare(a: str, b: str) -> int:
    x = a.split("[")[0]
    y = b.split("[")[0]
    x_ns = x.split("::")
    y_ns = y.split("::")
    if len(x_ns) != len(y_ns):
        return len(y_ns) - len(x_ns)

    for x_part, y_part in zip(x_ns, y_ns):
        if x_part == y_part:
            continue

        min_len = min(len(x_part), len(y_part))
        if x_part[:min_len] == y_part[:min_len]:
            return len(y_part) - len(x_part)

        if x_part < y_part:
            return -1
        else:
            return 1
    return 0

def compare_global_qualify_group(a: str, b: str) -> int:
    aa = a.startswith("    ")
    bb = b.startswith("    ")
    if aa != bb:
        return aa - bb
    return common_compare(a, b)

def compare_primary_group(a: str, b: str) -> int:
    aa = a.startswith("# header")
    bb = b.startswith("# header")
    if aa != bb:
        return bb - aa
    return common_compare(a, b)

def sort_global_qualify_list():
    ls = load_global_qualify_list()

    outer_sorted = sorted(ls, key=lambda x: (not x[0].startswith("#"), x[0]))
    inner_sorted = []
    for group in outer_sorted:
        if group[0].startswith("#"):
            inner_sorted.append(group)
        else:
            inner_sorted.append(sorted(group, key=functools.cmp_to_key(compare_global_qualify_group)))
    return flatten(inner_sorted)

def execute_sort_global_qualify_list():
    sorted_ls = sort_global_qualify_list()
    with open('GLOBAL_QUALIFY_LIST.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(sorted_ls))

def load_primary_list() -> list[list[str]]:
    ls: list[list[str]] = []
    with open('PRIMARY_OVERLOAD_SPECIALIZATION.txt', 'r', encoding='utf-8') as f:
        file = f.read()
        group_type = Group.NONE
        group: list[str] = []
        for line in file.split("\n"):
            if not line:
                if len(group) > 0:
                    ls.append(group)
                    group = []
                continue

            if line.startswith("    #"):
                group[-1] += "!!!" + line
            else:
                group.append(line)

        if len(group) > 0:
            ls.append(group)
    return ls

def sort_primary_list():
    ls = load_primary_list()
    for group in ls:
        print(group)

    outer_sorted = sorted(ls, key=lambda x: (x[0].startswith("# header"), x[0]))
    inner_sorted = []
    for group in outer_sorted:
        if not group[0].startswith("# header"):
            inner_sorted.append(group)
        else:
            inner_sorted.append(sorted(group, key=functools.cmp_to_key(compare_primary_group)))
        inner_sorted.append([""])

    comment_restored = []
    for group in inner_sorted:
        new_group = []
        for line in group:
            if "!!!" in line:
                target, comment = line.split("!!!")
                new_group.append(target)
                new_group.append(comment)
            else:
                new_group.append(line)
        comment_restored.append(new_group)
    return flatten(comment_restored)

def execute_sort_primary_list():
    sorted_ls = sort_primary_list()
    print(sorted_ls)
    with open('PRIMARY_OVERLOAD_SPECIALIZATION.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(sorted_ls))

if __name__ == '__main__':
    execute_sort_global_qualify_list()
    execute_sort_primary_list()
