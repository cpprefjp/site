# operator=
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
nested_exception& operator=(const nested_exception&) noexcept = default;           // (1) C++11
constexpr nested_exception& operator=(const nested_exception&) noexcept = default; // (1) C++26
```

## 概要
`nested_exception`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
