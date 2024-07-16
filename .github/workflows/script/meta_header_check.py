import glob
import os
import sys
import re

def find_header_or_module(line: str) -> (re.Match, str):
    m = re.fullmatch(r'[\*-] (.*?)\[meta header\]', line, re.MULTILINE)
    if m:
        return m, "header"

    m = re.fullmatch(r'[\*-] (.*?)\[meta category\]', line, re.MULTILINE)
    if m:
        return m, "category"

    m = re.fullmatch(r'[\*-] (.*?)\[meta module\]', line, re.MULTILINE)
    if m:
        return m, "module"
    return None, ""

def check_header(text: str, filename: str) -> bool:
    found_error: bool = False
    dirs = filename.split("/")

    for line in text.split("\n"):
        m, header = find_header_or_module(line)
        if m:
            meta_header = m.group(1)
            if len(dirs) < 2:
                found_error = True
                print("[{}] invalid directory: {}".format(filename, meta_header))
            elif len(dirs) == 2 and dirs[0] in ("reference", "module"):
                own_filename = os.path.splitext(os.path.basename(filename))[0]
                if meta_header != own_filename:
                    found_error = True
                    print("[{0}] invalid meta {1} \"{2}\". You should specify \"{3}\" as meta {1}".format(
                            filename, header, meta_header, own_filename))
            elif len(dirs) > 2 and dirs[0] in ("reference", "module"):
                own_header = dirs[1]
                if meta_header != own_header:
                    found_error = True
                    print("[{0}] invalid meta {1} \"{2}\". You should specify \"{3}\" as meta {1}".format(
                            filename, header, meta_header, own_header))
            return not found_error

    if len(dirs) >= 2 and dirs[0] in ("reference", "module"):
        found_error = True
        print("[{0}] meta header is empty.".format(filename))

    return not found_error

if __name__ == '__main__':
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        with open(p) as f:
            text = f.read()

        if not check_header(text, p):
            found_error = True

    if found_error:
        sys.exit(1)
