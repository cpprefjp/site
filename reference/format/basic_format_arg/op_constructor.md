# コンストラクタ

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_arg[meta class]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Context>
  class basic_format_arg {
  private:
    using char_type = typename Context::char_type;                              // exposition only

    variant<monostate, bool, char_type,
            int, unsigned int, long long int, unsigned long long int,
            float, double, long double,
            const char_type*, basic_string_view<char_type>,
            const void*, handle> value;                                         // exposition only

    template<class T> explicit basic_format_arg(T& v) noexcept;                 // (2) exposition only

  public:
    basic_format_arg() noexcept; // (1)
  };
}
```
* varialt[link /reference/varialt/varialt.md]
* monostate[link /reference/varialt/monostate.md]
* basic_string_view[link /reference/string_view/basic_string_view.md]
* handle[link handle.md]
* basic_format_arg[italic]

## 概要

* (1): 空の`basic_format_arg`を構築する
* (2): (説明専用)[`make_format_args`](../make_format_args.md)の内部で使用され、引数から`basic_format_args`を構築する。

## テンプレートパラメーター制約

- (2):
    - `T`はフォーマットできる型であること

## 事前条件

- (2): もし `decay_t<T>` が `char_type*` または `const char_type*` である場合、 `static_cast<const char_type*>(v)` はヌル終端された `char_type` の配列を指すこと。

## 事後条件

- (1): `!(*this)`

## 例外

投げない。

## 効果

- (1): `value`を[`monostate`](/reference/varialt/monostate.md)で初期化する。

- (2): `TD`を`remove_const<T>`として、以下の順に`value`を初期化する。
    - `TD`が`bool`なら、`v`で初期化
    - `TD`が`char`かつ`char_type`が`wchar_t`なら、`value`を`static_cast<wchar_t>(v)`で初期化
    - `TD`が`char`かつ`char_type`が`wchar_t`なら、`value`を`static_cast<wchar_t>(static_cast<unsigned char>(v))`で初期化
    - `TD`が符号つき整数型かつ`sizeof(TD) <= sizeof(int)`なら、`value`を`static_cast<int>(v)`で初期化
    - `TD`が符号なし整数型かつ`sizeof(TD) <= sizeof(unsigned int)`なら、`value`を`static_cast<unsigned int>(v)`で初期化
    - `TD`が符号つき整数型かつ`sizeof(TD) <= sizeof(long long int)`なら、`value`を`static_cast<long long int>(v)`で初期化
    - `TD`が符号なし整数型かつ`sizeof(TD) <= sizeof(unsigned long long int)`なら、`value`を`static_cast<unsigned long long int>(v)`で初期化
    - `TD`が浮動小数点数なら、`v`で初期化
    - `TD`が`basic_string_view`または`basic_string`の特殊化で、`TD::value_type`が`char_type`と等しければ、`value`を`basic_string_view<char_type>(v.data(), v.size())`で初期化
    - `decay_t<T>`が`char_type*`または `const char_type*` なら、`value`を`static_cast<const char_type*>(v)`で初期化
    - `is_void_v<remove_pointer_t<TD>>`が`true`、または`is_null_pointer_v<TD>`が`true`なら、`value`を`static_cast<const void*>(v)`で初期化
    - それ以外なら、`value`を`handle(v)`で初期化

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
