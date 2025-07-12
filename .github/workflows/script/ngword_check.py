import glob
import os
import sys
import re

NGWORD_LIST = [
    ("", "<br>", "<br/>"),
    ("", "</br>", "<br/>"),
    ("", "acccess", "access"),
    ("", "ALING", "ALIGN"),
    ("", "alloacte", "allocate"),
    ("", "asssert", "assert"),
    ("", "asssume", "assume"),
    ("", "algined", "aligned"),
    ("", "concpet", "concept"),
    ("", "condtion", "condition"),
    ("", "contraint", "constraint"),
    ("", "Dimentional", "Dimensional"),
    ("", "Doamin", "Domain"),
    ("", "eror", "error"),
    ("", "enumrate", "enumerate"),
    ("", "exectution", "execution"),
    ("", "expceted", "expected"),
    ("", "exposion", "exposition"),
    ("", "functon", "function"),
    ("", "generetor", "generator"),
    ("", "greator", "greater"),
    ("", "namespase", "namespace"),
    ("", "noexpcet", "noexcept"),
    ("", "oeprator", "operator"),
    ("", "opreator", "operator"),
    ("", "opton", "option"),
    ("", "Ohter", "Other"),
    ("", "protmise_type", "promise_type"),
    ("", "pvalue", "prvalue"),
    ("", "Recevier", "Receiver"),
    ("", "reciever", "receiver"),
    ("", "refernce", "reference"),
    ("", "repear", "repeat"),
    ("", "staitc", "static"),
    ("", "std::range::", "std::ranges::"),
    ("", "swtich", "switch"),
    ("", "voaltile", "volatile"),
    ("", "Updated upstream", ""),
    ("", "Stashed changes", ""),
    ("", "子ルーチン", "コルーチン"),
    ("", "移譲", "委譲"),
    ("", r'型]\((.*?)\)型', "型](link)"),
    ("", "括弧", "カッコ"),
    ("", "constepx", "constexpr"),
    ("", "wsting", "wstring"),
    ("", r"\[lin ", "[link "), # コード修飾ミス
    ("reference/chrono", "dulation", "duration"),
    ("reference/random", "施行", "試行"),
    ("reference/random", "疑似", "擬似"),
]

def check_ngword(text: str, filename: str) -> bool:
    found_error: bool = False

    for target_dir, ngword, correct in NGWORD_LIST:
        if not filename.startswith(target_dir):
            continue

        m = re.search(ngword, text)
        if m:
            print("{}: the file includes ngword \"{}\". you should fix to \"{}\".".format(filename, ngword, correct))
            found_error = True
    return not found_error

if __name__ == '__main__':
    found_error = False
    for p in sorted(list(glob.glob("**/*.md", recursive=True))):
        if p.startswith("start_editing/"):
            continue

        with open(p) as f:
            text = f.read()

        if not check_ngword(text, p):
            found_error = True

    if found_error:
        sys.exit(1)
