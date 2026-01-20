# get

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_args[meta class]
* cpp20[meta cpp]

```cpp
basic_format_arg<Context>
  get(std::size_t i) const noexcept; // (1) C++20
constexpr basic_format_arg<Context>
  get(std::size_t i) const noexcept; // (1) C++26
```
* basic_format_arg[link /reference/format/basic_format_arg.md]

## 概要

`i`番目のフォーマット引数を得る。`i`が範囲外の場合、`basic_format_arg<Context>`のデフォルト値を返す。

## 例外

投げない。

## 実装例

```cpp
namespace std {
  template<class Context>
  class basic_format_args {
    std::size_t size_;
    const basic_format_arg<Context>* data_;

  public:
    basic_format_arg<Context> get(std::size_t i) const noexcept
    {
      return i < size_ ? data_[i] : basic_format_arg<Context>();
    }
  };
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から`constexpr`に対応した