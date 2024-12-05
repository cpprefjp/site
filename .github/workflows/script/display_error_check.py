import glob
import os
import sys
import re

# consider tab
def indent_length(s: str) -> int:
    length = 0
    for x in s:
        length += 1 if x == " " else 4
    return length

def check_item_indent(line: str, line_no: int, filename: str) -> bool:
    m = re.match(r'^(\s*?)([0-9]+\.\s)', line)
    if m:
        indent: int = indent_length(m[1])
        if indent > 0 and indent % 4 != 0:
            print("{}:{}: number item indent {} shoule be 4. line:{}".format(filename, line_no, indent, line))
            return False
        return True

    m = re.match(r'^(\s*?)([*+-]\s)', line)
    if m:
        indent: int = indent_length(m[1])
        if indent > 0 and indent % 4 != 0:
            print("{}:{}: item indent {} shoule be 4. line:{}".format(filename, line_no, indent, line))
            return False
    return True

def check_display_error(text: str, filename: str) -> bool:
    found_error: bool = False
    in_code_block: bool = False

    for i, line in enumerate(text.split("\n")):
        is_code_block = line.strip().startswith("```")
        if is_code_block:
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue

        if not check_item_indent(line, i + 1, filename):
            found_error = True

    return not found_error

if __name__ == '__main__':
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        with open(p) as f:
            text = f.read()

        if not check_display_error(text, p):
            found_error = True

    if found_error:
        sys.exit(1)
