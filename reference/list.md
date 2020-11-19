# list
* list[meta header]

`<list>`ヘッダでは、双方向リンクリストの実装である `list` コンテナを提供する。

任意の位置への挿入や削除を定数時間で行う事が出来るが、高速なランダムアクセスは出来ず、常にシーケンシャルアクセスを行う必要がある。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`list`](list/list.md) | 双方向リンクリスト(class template) | |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
