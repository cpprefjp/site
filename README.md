site
====

[![detect forbidden characters](https://github.com/cpprefjp/site/workflows/detect%20forbidden%20characters/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/detect_forbidden_characters.yml)
[![inner link check](https://github.com/cpprefjp/site/workflows/inner%20link%20check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/inner_link_check.yml)
[![code qualify check](https://github.com/cpprefjp/site/workflows/code%20qualify%20check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/code_qualify_check.yml)
[![ngword check](https://github.com/cpprefjp/site/workflows/ngword%20check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/ngword_check.yml)
[![meta header check](https://github.com/cpprefjp/site/workflows/meta%20header%20check/badge.svg)](https://github.com/cpprefjp/site/actions/workflows/meta_header_check.yml)
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


## 各種ツールの使用方法
### 内部リンクのチェック
Python 3系をインストールした状態で、以下を実行する：

```
pip3 install requests
python3 .github/workflows/script/link_check.py --check-inner-link
```

