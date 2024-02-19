import sys
import re
import requests

def print_help():
    print("Usage: python create_github_issue_when_not_empty.py [target file] [github token] [:owner/:repo] [current commit hash]")
    sys.exit(1)

def main():
    if len(sys.argv) != 5:
        print_help()

    file_name, token, path, commit_hash = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

    if not re.match(r".+/.+", path):
        print_help()

    title = f"Outer link check failed at {commit_hash}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }
    try:
        with open(file_name, 'r') as file:
            body = f"The commit hash was: {commit_hash}\n\n" + file.read()

        response = requests.post(
            f"https://api.github.com/repos/{path}/issues",
            json={"title": title, "body": body},
            headers=headers
        )
        response.raise_for_status()  # エラーがあれば例外を発生させる
        print("Issue created successfully!")
    except FileNotFoundError:
        print(f"Error: File '{file_name}' not found.", file=sys.stderr)
        sys.exit(2)
    except requests.RequestException as e:
        print(f"Error creating issue: {e}", file=sys.stderr)
        sys.exit(3)

if __name__ == "__main__":
    main()
