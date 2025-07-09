#!/bin/bash

# site_generator 直下でこのスクリプトを実行すること

set -ex

# dist を生成
pushd kunai
  npm install
  npm run build
popd

# dist の中身を cpprefjp の static ディレクトリに反映
pushd cpprefjp/static/static
  ln -s ../../../kunai/dist kunai
popd

# crsearch.json ファイルを生成
pushd crsearch.json
  ln -s ../cpprefjp/site site
  pip3 install -r docker/requirements.txt
  python3 run.py
popd

# crsearch.json を cpprefjp の static ディレクトリに反映
mkdir -p cpprefjp/static/static/crsearch
pushd cpprefjp/static/static/crsearch
  ln -s ../../../../crsearch.json/crsearch.json crsearch.json
  ln -s ../../../../crsearch.json/crsearch.js crsearch.js
popd

# サイトの生成
pip3 install -r docker/requirements.txt
python3 run.py settings.cpprefjp --concurrency=`nproc`

if (($# == 0)); then
  # 生成されたサイトの中身を push
  pushd cpprefjp/cpprefjp.github.io
    # push するために ssh のリモートを追加する
    git remote add origin2 git@github.com:cpprefjp/cpprefjp.github.io.git

    git add ./ --all
    git config --global user.email "shigemasa7watanabe+cpprefjp@gmail.com"
    git config --global user.name "cpprefjp-autoupdate"
    git commit -a -m "update automatically"
    git push origin2 master
  popd

elif [[ $1 == --pull ]]; then
  if (($# < 2)); then
    printf '%s\n' \
      'build.sh: 引数の数が足りません。' \
      'usage: build.sh --pull PR' \
      '引数' \
      '  PR        プルリクエスト番号' \
      '' \
      '環境変数' \
      '  base_git_url:    プルリクエスト先(基底)の fetch URL' \
      '  base_git_ref:    プルリクエスト先(基底)のブランチ名参照' \
      '  commit_base      プルリクエストの基底コミット' \
      '  commit_head      プルリクエストの先端コミット' \
      '  preview_base_url プレビューの基底URL' \
      '  preview_repo_url 基底リポジトリの URL (https://github.com/cpprefjp/site 等)' \
      '  preview_ubranch  URLエンコードされたブランチ名' \
      '' \
      >&2
    exit 2
  fi

  target_directory=cpprefjp/gh-pages/gen/pull/$2
  rm -rf "$target_directory"
  mkdir -p "$target_directory"
  cp -r cpprefjp/cpprefjp.github.io/* "$target_directory"/

  # 変更ファイル一覧のページを作成する
  (
    cd cpprefjp/site
    pr=$2
    time=$(TZ=Asia/Tokyo date +'%F %T %Z')

    # 基底ブランチに新しいコミットがある場合のため、基底リポジトリから取り寄せる
    if [[ $base_git_url && $base_git_ref ]]; then
      # 手動でトリガーした時は github.event.pull_request.base が空のことがある?
      # なので非空の時にのみ実行
      git remote add base "$base_git_url"
      git fetch base "$base_git_ref"
    fi

    content=$(
      git diff --name-status --diff-filter=dr "$commit_base" "$commit_head" |
        sed -n '
          # normalize the line format
          s/^[[:space:]]*\([^[:space:]]\{1,\}\)[[:space:]]\{1,\}/\1 /

          # exclude filenames containing special characters that may break Markdown
          /[][`()]/d

          # exclude README.md
          /^[^[:space:]]* README\.md$/d

          # generate list items
          s|^A \(.*\)\.md$|- \&#x1f4dd; [`\1`]('"$preview_base_url"'/\1.html) \&#x2728;|p
          s|^[^[:space:]]* \(.*\)\.md$|- \&#x1f4dd; [`\1`]('"$preview_base_url"'/\1.html)|p
        '
    )
    nitem=$(wc -l <<< "$content")
    [[ $content ]] || content='- (内容変更された `.md` ファイルはありません)'

    echo "# PR [\#$pr]($preview_repo_url/pull/$pr) プレビュー"
    echo "- &#x231a; 更新時刻: $time"
    echo "- &#x1f50d; [プレビュー (HTML)]($preview_base_url)"
    echo "- &#x1f4c8; [プレビュー生成記録]($preview_repo_url/actions?query=event%3Apull_request_target+branch%3A$preview_ubranch)"
    echo "- **&#x2AEF;** ソースの変更: [\`${commit_base::7}..${commit_head::7}\`]($preview_repo_url/compare/$commit_base..$commit_head)"
    echo
    echo "## 変更記事一覧 (${nitem}件)"
    echo
    echo "$content"

  ) > "$target_directory"/PREVIEW.md

else
  printf '%s\n' "build.sh: コマンドライン引数が認識できません: $1" >&2
  exit 2

fi
