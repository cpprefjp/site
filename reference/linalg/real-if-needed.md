# real-if-needed
* [meta exposition-only]
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

## 概要
`real-if-needed`は、必要に応じて複素数の実部を返す、説明専用の関数オブジェクトである。

型`T`の式`E`に対して、式`real-if-needed(E)`は次と等価である。

1. `T`が算術型でなく、式`real(E)`が下記宣言を含むコンテキストにおいてオーバーロード解決を行った結果が妥当であるとき、`real(E)`
    ```cpp
    template<class T>
    T real(const T&) = delete; 
    ```

2. そうでない場合、`E`


## 備考
オーバーロード解決により選択された関数が入力された複素数の実部を返さないとき、プログラムは不適格となる。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
