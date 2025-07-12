# operator=
* new[meta header]
* std[meta namespace]
* bad_array_new_length[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bad_array_new_length& operator=(const bad_array_new_length&) noexcept;           // (1) C++11
constexpr bad_array_new_length& operator=(const bad_array_new_length&) noexcept; // (1) C++26
```

## 概要
`bad_array_new_length`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
