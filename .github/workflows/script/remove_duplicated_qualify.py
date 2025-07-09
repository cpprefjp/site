import os
import re
from pathlib import Path

# GLOBAL_QUALIFY_LIST.txtを読み込んで、コード修飾パターンを抽出
def load_global_qualify_patterns():
    patterns = []
    with open('GLOBAL_QUALIFY_LIST.txt', 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and line.startswith('*'):
                # "* pattern[link path]" の形式からpatternを抽出
                match = re.match(r'\*\s+(.+?)\[link\s+.+?\]', line)
                if match:
                    pattern = match.group(1)
                    # 正規表現用にエスケープ
                    escaped_pattern = re.escape(pattern)
                    patterns.append(escaped_pattern)

    # パターンを一つの正規表現に結合（OR条件）
    if patterns:
        combined_pattern = r'\*\s+(?:' + '|'.join(patterns) + r')\[link\s+.+?\]'
        return re.compile(combined_pattern)
    return None

# 削除の対象外リスト
NOT_TARGET = [
    "* std::begin[link valarray/begin_free.md]",
    "* std::end[link valarray/end_free.md]",
    "* std::begin[link /reference/valarray/valarray/begin_free.md]",
    "* std::end[link /reference/valarray/valarray/end_free.md]",
    "* std::begin[link /reference/initializer_list/initializer_list/begin_free.md]",
    "* std::end[link /reference/initializer_list/initializer_list/end_free.md]",
    "* common_type_t[link /reference/chrono/common_type.md]",
]

def is_not_target_line(line):
    stripped_line = line.strip()
    for x in NOT_TARGET:
        if stripped_line.startswith(x):
            return True
    return False

# ファイルを処理して、該当する行を削除
def process_file(file_path, pattern_regex):
    if pattern_regex is None:
        return 0

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    removed_count = 0

    for line in lines:
        if pattern_regex.search(line) and not is_not_target_line(line):
            removed_count += 1
        else:
            new_lines.append(line)

    if removed_count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"{file_path}: {removed_count} 行を削除しました")

    return removed_count

def main():
    # GLOBAL_QUALIFY_LIST.txtからパターンを読み込む
    pattern_regex = load_global_qualify_patterns()
    if pattern_regex is None:
        print("パターンが見つかりませんでした")
        return

    # すべての.mdファイルを処理
    total_removed = 0
    processed_files = 0
    total_files = 0

    for md_file in Path('.').rglob('*.md'):
        if str(md_file).startswith("start_editing"):
            continue

        removed = process_file(md_file, pattern_regex)
        if removed > 0:
            processed_files += 1
            total_removed += removed

    print(f"\n処理完了:")
    print(f"  スキャンしたファイル数: {total_files}")
    print(f"  変更したファイル数: {processed_files}")
    print(f"  削除した行数: {total_removed}")

if __name__ == '__main__':
    main()

