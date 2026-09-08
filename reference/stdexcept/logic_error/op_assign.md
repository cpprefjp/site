# operator=
* stdexcept[meta header]
* std[meta namespace]
* logic_error[meta class]
* function[meta id-type]
* cpp98[meta cpp]

```cpp
logic_error& operator=(const logic_error&) noexcept;           // (1) C++98
constexpr logic_error& operator=(const logic_error&) noexcept; // (1) C++26
```

## 概要
`logic_error`オブジェクトを代入する。

- (1) : コピー代入。この代入演算子は暗黙的に定義される


## 戻り値
`*this`


## 備考
- 代入後、[`what()`](/reference/exception/exception/what.md)が返す文字列は、代入元のオブジェクトのものと同じになる


## 例外
投げない


## 関連項目
- [`std::exception`](/reference/exception/exception.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
