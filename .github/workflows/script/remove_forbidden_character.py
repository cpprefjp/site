# 禁止された不可視文字を削除するスクリプト。
# トップディレクトリで以下を実行する：
# python3 .github/workflows/script/remove_forbidden_character.py

import os
import glob

FORBIDDEN_CHARACTERS = [
    '\u00ad',  # Soft hyphen (ソフトハイフン)
    '\u200b',  # Zero width space (ゼロ幅スペース)
]

def remove_forbidden_characters(p) -> bool:
    try:
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for char in FORBIDDEN_CHARACTERS:
            content = content.replace(char, '')

        if content != original_content:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

if __name__ == '__main__':
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        if remove_forbidden_characters(p):
            print(f"{p} -> Modified")

