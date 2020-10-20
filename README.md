site
====

![detect forbidden characters](https://github.com/cpprefjp/site/workflows/detect%20forbidden%20characters/badge.svg?branch=master) ![inner link check](https://github.com/cpprefjp/site/workflows/inner%20link%20check/badge.svg?branch=master) ![outer link check](https://github.com/cpprefjp/site/workflows/outer%20link%20check/badge.svg?branch=master) ![build](https://github.com/cpprefjp/site/workflows/build/badge.svg)

このリポジトリは、C++リファレンスサイト[cpprefjp](https://cpprefjp.github.io/)のMarkdownソースです。

このリポジトリにあるMarkdownファイルを編集することで、cpprefjpサイトに自動的に反映されます。


cpprefjpへのコントリビュート方法や各ファイル編集方法については、以下のドキュメントを参照してください。

* [cpprefjpへのコントリビュート方法](CONTRIBUTING.md)
* [cpprefjpを編集するには](/editors_doc/start_editing.md)


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

