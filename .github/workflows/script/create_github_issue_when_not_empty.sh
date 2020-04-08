#!/bin/bash

if [ $# -ne 4 ] || [ ! -f "$1" ] || [[ "$3" != */* ]]; then
    echo "invalid argument" 1>&2
    echo "./create_github_issue_when_not_empty.sh [target file] [github token] [:owner/:repo] [current commit hash]" 1>&2
    exit 1
fi

if [ "$(wc -l < "$1")" -eq 0 ]; then
    exit 0
fi
curl --request POST \
    --url "https://api.github.com/repos/$3/issues" \
    --header "authorization: Bearer $2" \
    --header 'content-type: application/json' \
    -d @- << EOF 
{
    "title": "outer link check failed at $4",
    "body": "The commit hash was: _$4_.\n\n$(cat "$1")"
}
EOF
