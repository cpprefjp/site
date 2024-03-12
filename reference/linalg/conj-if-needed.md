# conj-if-needed
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

## 概要
`conj-if-needed`は、[`std::complex`](/reference/complex/complex.md)などの複素数型に対して複素共役を求める、説明専用の関数オブジェクトである。

型`T`の式`E`に対して、式`conj-if-needed(E)`は次と等価である。

- `T`が算術型かつ式`conj(E)`が下記宣言を含むコンテキストにおいてオーバーロード解決を行った結果が妥当であるとき、`conj(E)`
    ```cpp
    template<class T> T conj(const T&) = delete; 
    ```

-  そうでなければ、`E`


## 備考
オーバーロード解決により選択された関数が入力値の複素共役(complex conjugate)を返さないとき、プログラムは不適格となる。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
