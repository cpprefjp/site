# operator=
* format[meta header]
* std[meta namespace]
* format_error[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
format_error& operator=(const format_error&) noexcept;           // (1) C++20
constexpr format_error& operator=(const format_error&) noexcept; // (1) C++26
```

## 概要
`format_error`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
