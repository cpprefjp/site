import argparse
import glob
import re
import os
import urllib.request, urllib.error, urllib.parse
import urllib3
import requests
import sys
import time

urllib3.disable_warnings()

def check_url(url: str, retry: int = 5) -> (bool, str):
    try:
        url_parts = urllib.parse.urlparse(url)
        res = requests.get("://".join([url_parts.scheme, url_parts.netloc]), verify=False, timeout=60.0)
        if res.url:
            if res.url == url:
                return True, ""
            return check_url(res.url)
        else:
            return res.status_code != 404, "not found"
    except requests.exceptions.ConnectionError as e:
        if retry <= 0:
            return False, "requests.exceptions.ConnectionError : {} ".format(e)
        time.sleep(2)
        return check_url(url, retry - 1)
    except requests.exceptions.RequestException as e:
        if retry <= 0:
            return False, "requests.exceptions.RequestException : {}".format(e)
        time.sleep(2)
        return check_url(url, retry - 1)
    except Exception as e:
        return False, "unknown exception : {}".format(e)

def fix_link(link: str) -> str:
    if "http" in link or ".md" in link:
        if "http" in link and "(" in link:
            link = link + ")"
        return re.sub("#.*", "", link.strip())
    else:
        return ""

def find_all_links(text: str) -> list:
    links = []
    for m in re.finditer(r'\[(.*?)\]\((.*?)\)', text):
        link = fix_link(m.group(2))
        if link:
            links.append(link)
    for m in re.finditer(r'[\*-] (.*?)\[link (.*?)\]', text):
        link = fix_link(m.group(2))
        if link:
            links.append(link)
    return links

if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="")
    argparser.add_argument("--check-inner-link",
                           dest='check_inner_link',
                           action='store_true',
                           default=False)
    argparser.add_argument("--check-outer-link",
                           dest='check_outer_link',
                           action='store_true',
                           default=False)
    args = argparser.parse_args()

    if not args.check_inner_link and not args.check_outer_link:
        print("unchecked", file=sys.stderr)
        sys.exit(1)

    found_error = False
    current_dir = os.getcwd()
    for p in glob.glob("**/*.md", recursive=True):
        dirname = os.path.dirname(p)
        with open(p) as f:
            text = f.read()

        for link in find_all_links(text):
            rel_link = ""
            if link.startswith("/"):
                rel_link = os.path.join(current_dir, link.lstrip("/"))
            elif not link.startswith("http"):
                rel_link = os.path.join(dirname, link)

            if link.startswith("http"):
                if not args.check_outer_link:
                    continue

                exists, reason = check_url(link)
                if not exists:
                    print("{} href {} not found. {}".format(p, link, reason), file=sys.stderr)
                    found_error = True
            elif link.endswith(".nolink"):
                if not args.check_inner_link:
                    continue

                if os.path.exists(rel_link):
                    print("nolinked {} href {} found.".format(p, link), file=sys.stderr)
                    found_error = True
            else:
                if not args.check_inner_link:
                    continue

                if not os.path.exists(rel_link):
                    print("{} href {} not found.".format(p, link), file=sys.stderr)
                    found_error = True

    if found_error:
        sys.exit(1)
