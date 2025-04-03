# コンストラクタ
* new[meta header]
* std[meta namespace]
* bad_array_new_length[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bad_array_new_length() noexcept;           // (1) C++11
constexpr bad_array_new_length() noexcept; // (1) C++26

bad_array_new_length(const bad_array_new_length&) noexcept;           // (2) C++11
constexpr bad_array_new_length(const bad_array_new_length&) noexcept; // (2) C++26
```

## 概要
`bad_array_new_length`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

