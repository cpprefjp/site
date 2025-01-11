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
  if [[ ! $2 ]]; then
    printf '%s\n' "build.sh: プルリクエスト番号が指定されていません" >&2
    exit 2
  fi

  target_directory=cpprefjp/gh-pages/gen/pull/$2
  rm -rf "$target_directory"
  mkdir -p "$target_directory"
  cp -r cpprefjp/cpprefjp.github.io/* "$target_directory"/

else
  printf '%s\n' "build.sh: コマンドライン引数が認識できません: $1" >&2
  exit 2
  
fi
