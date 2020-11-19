# forward_list
* forward_list[meta header]
* cpp11[meta cpp]

`<forward_list>`ヘッダでは、単方向リンクリストの実装である`forward_list`コンテナを提供する。

`forward_list`は、標準ライブラリではシーケンスコンテナの一種として定義されるが、いくつかの点でシーケンスコンテナの要件を満たさない

`forward_list`は、C言語で単方向リンクリストを実装する場合と比べ、空間的にもパフォーマンス的にもゼロオーバーヘッドであるよう設計されている。  
また、`forward_list`はリンクリストの性質上、挿入・削除のような破壊的操作を行なってもイテレータは無効にならない。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`forward_list`](forward_list/forward_list.md) | 単方向リンクリスト(class template) | C++11 |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
