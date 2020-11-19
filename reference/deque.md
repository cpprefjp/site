# deque
* deque[meta header]

`deque`（通常、"デック"のように発音する）は<b>d</b>ouble-<b>e</b>nded <b>q</b>ueue （二重終端キュー）の頭文字をとったものである。double-ended queue はシーケンスコンテナの一種である。要素は厳密な線形シーケンスに従って並べられる。

`deque` はライブラリによってさまざまな方法で実装されるかもしれないが、全ての場合においてランダムアクセスイテレータを介して個々の要素へアクセス可能であり、ストレージは（必要に応じて拡大または縮小して）自動的に処理される。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`deque`](deque/deque.md) | 二重終端キュー(class template) | |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
