import glob
import re
import os
import sys

def check_exist_qualify_target(text: str, filename: str) -> bool:
    code = ""
    in_code_block = False
    found_error = False
    for line in text.split("\n"):
        is_code_block = line.strip().startswith("```")
        if is_code_block:
            in_code_block = not in_code_block
            continue

        if in_code_block:
            code += line + "\n"
            continue

        m = re.fullmatch(r'[\*-] (.*?)\[(link |color |italic)(.*?)\]', line)
        if m:
            if code and len(code) > 0:
                target = m.group(1)
                if not target in code: # FIXME: 単語検索にしたい
                    print("{}: `{}` not found in code block.\n{}".format(filename, target, code))
                    found_error = True
        else:
            code = ""
    return not found_error

if __name__ == '__main__':
    found_error = False
    current_dir = os.getcwd()
    outer_link_dict = dict()
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        dirname = os.path.dirname(p)
        with open(p) as f:
            text = f.read()

        if not check_exist_qualify_target(text, p):
            found_error = True

    if found_error:
        sys.exit(1)
