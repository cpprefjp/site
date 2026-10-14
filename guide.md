# 概念・前提知識ガイド

ここでは、リファレンスを読み解くための前提知識を解説する。


## データ構造
- [コンテナとは](guide/container.md)
- [イテレータとは](guide/iterator.md.nolink)
- [レンジとは](guide/range.md.nolink)
- [各種コンテナの特徴比較](guide/container_comparison.md.nolink)
- [データ構造とアルゴリズムの設計](guide/data_structure_and_algorithm.md.nolink)


## 並行・並列
- [スレッド同期プリミティブの概要一覧](guide/thread_sync_primitives.md.nolink)
- [実行制御ライブラリの概要](guide/execution.md.nolink)


## 入出力
- [ストリーム関連ヘッダ・クラスの関係](guide/stream_classes.md.nolink)


## 運営方針
guide階層にあるページは、以下の方針のもとに執筆している。

- リファレンスを読み解くための前提知識を提供する
    - 個別のリファレンスページでは、その機能の仕様を解説する。そこで前提となる概念、複数の機能にまたがる関係、機能の選び方をここで解説する
    - リファレンスの各ページからは、概要の下に「概念・前提知識」セクションを設けて、この階層のページへのリンクを列挙する
- 新しいページを作る際は、まずGitHub Issueで相談する
    - 無秩序に増えるとメンテナンスがむずかしくなるため、対象範囲と分類を相談してから執筆する
