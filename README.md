site
====

[![check](https://github.com/cpprefjp/site/workflows/check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/check.yml)
[![outer link check](https://github.com/cpprefjp/site/workflows/outer%20link%20check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/outer_link_check.yml)
[![build](https://github.com/cpprefjp/site/workflows/build/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/build.yml)

このリポジトリは、C++リファレンスサイト[cpprefjp](https://cpprefjp.github.io/)のMarkdownソースです。

このリポジトリにあるMarkdownファイルを編集することで、cpprefjpサイトに自動的に反映されます。


cpprefjpへのコントリビュート方法や各ファイル編集方法については、以下のドキュメントを参照してください。

* [cpprefjpを編集するには](start_editing.md)
* [編集方針](edit_policy.md)


cpprefjpは、以下のコアメンバが運営を行っています。
* [Akira Takahashi](https://github.com/faithandbrave/)
* [Usagi Ito](https://github.com/usagi)
* [melpon](https://github.com/melpon)


cpprefjpでは、C++の最新バージョンに随時対応しています。


## ローカルでの各種チェックを実行するスクリプト
Python 3系をインストールした状態で、以下を実行します：

```
pip3 install requests
python3 .github/workflows/script/check.py
```

これで、Pull RequestでのCI実行と同等のチェックがローカルで実行されます。

(外部リンクチェックだけは実行に時間がかかるので、ここでは実行されません。CIでも週に一回しか実行されません。)
