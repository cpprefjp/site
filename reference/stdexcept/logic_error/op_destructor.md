# デストラクタ
* stdexcept[meta header]
* std[meta namespace]
* logic_error[meta class]
* function[meta id-type]

```cpp
virtual ~logic_error();           // (1) C++98
constexpr virtual ~logic_error(); // (1) C++26
```

## 概要
`logic_error`オブジェクトを破棄する。

このデストラクタは暗黙的に定義され、基底クラス[`std::exception`](/reference/exception/exception.md)の仮想デストラクタをオーバーライドする。


## 例外
投げない


## 関連項目
- [`std::exception`](/reference/exception/exception.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
