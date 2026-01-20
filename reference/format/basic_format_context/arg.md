# arg
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_context[meta class]
* cpp20[meta cpp]

```cpp
basic_format_arg<basic_format_context>
  arg(size_t id) const;                // (1) C++20
constexpr basic_format_arg<basic_format_context>
  arg(size_t id) const;                // (1) C++26
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* basic_format_context[link /reference/format/basic_format_context.md]

## 概要

`i`番目のフォーマット引数を取得する。`i`が範囲外の場合、`basic_format_arg<basic_format_context>`のデフォルト値を返す。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から`constexpr`に対応した