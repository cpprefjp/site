# array
* array[meta header]
* cpp11[meta cpp]

`array`は固定長のオブジェクトを保持するシーケンスコンテナで、各要素は連続して格納される。従来のCスタイルの配列のパフォーマンスを保ったまま、シーケンスのサイズの取得、要素の代入のサポートなど、標準コンテナの恩恵を受ける事ができる。また、境界チェック（範囲外の要素にアクセスしようとしていないかのチェック）付きの要素アクセスもサポートしている。

`array`は、デフォルトコンストラクタで構築された`array`オブジェクトが空でない点と、`swap()`の計算量が定数時間でない点を除いて、コンテナとリバーシブルコンテナの全ての要件を満たす。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`array`](array/array.md) | 固定長配列(class template) | C++11 |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
