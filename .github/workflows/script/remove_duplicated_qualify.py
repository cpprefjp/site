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

# ファイルを処理して、該当する行を削除
def process_file(file_path, pattern_regex):
    if pattern_regex is None:
        return 0
        
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    removed_count = 0
    
    for line in lines:
        if pattern_regex.search(line):
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