# abs-if-needed
* [meta exposition-only]
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

## 概要
`abs-if-needed`は、必要に応じて絶対値を計算する、説明専用の関数オブジェクトである。

型`T`の式`E`に対して、式`abs-if-needed(E)`は次と等価である。

1. もし`T`が符号なし整数なら、`E`

2. そうでない場合、もし`T`が算術型なら、`std::abs(E)`

3. そうでない場合、式`abs(E)`が下記宣言を含むコンテキストにおいてオーバーロード解決を行った結果が妥当であるとき、`abs(E)`
    ```cpp
    template<class T>
    T abs(const T&) = delete; 
    ```


## 備考
オーバーロード解決により選択された関数が入力値の絶対値を返さないとき、プログラムは不適格となる。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
