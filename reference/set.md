# set
* set[meta header]

`<set>`ヘッダは、集合を表す連想コンテナ、`set`と`multiset`を定義する。  
`set`はキーの重複を許可しないが、`multiset`はキーの重複を許可する。  

連想コンテナは特にそれらキーによる要素アクセスが効率的になるよう設計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。 
内部的には、`set` 内の要素は、コンテナの構築時に設定された[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。 

`set`と`multiset`は一般的に、二分木として実装される。従って、連想コンテナである `set`や`multiset` の主な特性は以下の通りである。

- ユニークな要素のキー：互いに等しい二つのキーを持つ要素が `set` に格納されることは無い。複数の等しいキーを許す同様の連想コンテナは `multiset` である。
- 要素の値はキーと値の`pair`型である。
- 要素は常に[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従う。
- 挿入操作はイテレータや要素の参照に影響を与えない。

このコンテナクラスは、双方向イテレータをサポートする。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|---------------------------------|--------------------------------------------|-------|
| [`set`](set/set.md)           | キーの重複を許可しない集合(class template) |  |
| [`multiset`](set/multiset.md) | キーの重複を許可する集合(class template)   |  |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
