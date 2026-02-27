# check_dynamic_spec_string
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_parse_context[meta class]
* cpp26[meta cpp]

```cpp
constexpr void check_dynamic_spec_string(size_t id) noexcept;
```

## 概要
動的な幅・精度の引数の型が文字列型かコンパイル時に検証する。

## 効果
以下と等価：

```cpp
check_dynamic_spec<const char_type*, basic_string_view<char_type>>(id);
```
* check_dynamic_spec[link check_dynamic_spec.md]
* basic_string_view[link /reference/string_view/basic_string_view.md]

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P2757R3 Type-checking format args](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2757r3.html)
