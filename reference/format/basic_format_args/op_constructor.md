# コンストラクタ

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_args[meta class]
* cpp20[meta cpp]

```cpp
basic_format_args() noexcept; // (1) C++20

template<class... Args>
basic_format_args(
  const format_arg_store<Context, Args...>& store) noexcept; // (2) C++20
template<class... Args>
constexpr
basic_format_args(
  const format_arg_store<Context, Args...>& store) noexcept; // (2) C++26
```
* basic_format_args[link /reference/format/basic_format_args.md]
* format_arg_store[italic]

## 概要

* (1): 空の`basic_format_args`を構築する
* (2): [`make_format_args`](../make_format_args.md)の戻り値から浅いコピーで`basic_format_args`を構築する。

ただし、 _`format_arg_store`_ は`make_format_args`の戻り値と同じ型であることを示す便宜上の名前であり、規格には含まれない。

## 例外

投げない。

## 実装例

```cpp
namespace std {
  template<class Context>
  class basic_format_args {
    size_t size_;
    const basic_format_arg<Context>* data_;

  public:
    basic_format_args() noexcept
      :size_(0)
    {}

    template<class... Args>
    basic_format_args(const format_arg_store<Context, Args...>& store) noexcept
      :size_(sizeof...(Args))
      ,data_(store.args.data())
    {}
  };
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* basic_format_args[link /reference/format/basic_format_args.md]

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