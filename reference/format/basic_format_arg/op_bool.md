# operator bool
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* basic_format_arg[meta class]
* cpp20[meta cpp]

```cpp
explicit operator bool() const noexcept;           // (1) C++20
constexpr explicit operator bool() const noexcept; // (1) C++26
```

## 概要
`bool`型への変換演算子。


## 戻り値
空でない場合に`true`を返す


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から`constexpr`に対応した