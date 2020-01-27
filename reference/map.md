# map
* map[meta header]

`map`と`multimap`はユニークな要素を格納する連想コンテナの一種であり、�ーとそれに対応する値を格納する。 
`map`は�ーの重複を許さず、`multimap`は�ーの重複を許す。
連想コンテナは特にそれら�ーによる要素アクセスが効率的になるようよう�計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。 
内部的には、`map` 内の要素は、コンテナの構築時に�定された[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。 

`map`と`multimap`は一般的に、二分木として実装される。従って、連想コンテナである `map`や`multimap` の主な特性は以下の通りである。

- ユニークな要素の�ー：互いに�しい二つの�ーを持つ要素が `map` に格納されることは無い。複数の�しい�ーを許す同様の連想コンテナは `multimap` である。
- 要素の値は�ーと値のpair型である。
- 要素は常に[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従う。
- 挿入操作はイテレータや要素の参照に影響を与えない。

このコンテナクラスは、双方向イテレータをサポートする。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)


| 名前 | 説明 | 対応バージョン |
|---------------------------------|--------------------------------------------------|-------|
| [`map`](map/map.md)           | �ーの重複を許さない連想コンテナ(class template) |  |
| [`multimap`](map/multimap.md) | �ーの重複を許す連想コンテナ(class template)     |  |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
