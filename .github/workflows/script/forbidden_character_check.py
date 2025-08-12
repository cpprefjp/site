import glob
import os
import sys
import re
import unicodedata

FORBIDDEN_CHARACTERS = [
    '\u00ad',  # Soft hyphen (ソフトハイフン)
    '\u200b',  # Zero width space (ゼロ幅スペース)
]

def check_forbidden_character(text: str, filename: str) -> bool:
    found_error: bool = False

    for char in FORBIDDEN_CHARACTERS:
        m = re.search(char, text)
        if m:
            code_point = ord(char)
            name = unicodedata.name(chr(code_point))
            print("{}: the file includes forbidden character \"U+{:X}\" ({}).".format(filename, code_point, name))
            found_error = True
    return not found_error

def check() -> bool:
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        with open(p) as f:
            text = f.read()

        if not check_forbidden_character(text, p):
            found_error = True

    return not found_error

if __name__ == '__main__':
    if not check():
        sys.exit(1)
