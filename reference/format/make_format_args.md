# make_format_args

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Context = format_context, class... Args>
  format_arg_store<Context, Args...> make_format_args(const Args&... args); // (1)

  template<class... Args>
  format_arg_store<wformat_context, Args...> make_wformat_args(const Args&... args); // (2)
}
```
* format_arg_store[italic]
* wformat_context[link /reference/format/basic_format_context.md]

## 概要
可変長引数の型を消去して、[`basic_format_arg`](basic_format_arg.md)の列に変換する。
戻り値の型 _`format_arg_store`_ は便宜上次の通り定義されるが、その型名は規格に含まれない。

```cpp
namespace std {
  template<class Context, class... Args>
  struct format_arg_store { // exposition only
    array<basic_format_arg<Context>, sizeof...(Args)> args;
  };
}
```
* format_arg_store[italic]
* basic_format_arg[link /reference/format/basic_format_arg.md]
* array[link /reference/array/array.md]

[`basic_format_args`](basic_format_args.md)は`format_arg_store`から構築できる。
`make_format_args`の結果はただちに`basic_format_args`へ変換するのが意図された使い方である。

```cpp
template<class... Args>
string format(string_view fmt, const Args&... args)
{
  return vformat(fmt, {make_format_args(args...)}); // format_arg_store から format_args へ暗黙変換
}
```

## 事前条件
すべての引数の型`Ti`について`Context::formatter_type<Ti>`が`Formatter`要件を満たすこと。

## 効果

(2)は次と�しい。

```cpp
return make_format_args<wformat_context>(args...);
```
* wformat_context[link /reference/format/basic_format_context.md]

(1)は次と�しい。

```cpp
return {basic_format_arg<Context>(args)...}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]

ただし、便宜上、[`basic_format_arg`](/reference/format/basic_format_arg.md)は次のprivateメンバを持つとする。
(これらのprivateメンバは規格に含まれない)

```cpp
namespace std {
  template<class Context>
  class basic_format_arg {
  public:
    class handle;

  private:
    using charT = typename Context::char_type;

    variant<monostate, bool, charT,
            int, unsigned int, long long int, unsigned long long int,
            float, double, long double,
            const charT*, basic_string_view<charT>,
            const void*, handle> value;

    template<typename T> explicit basic_format_arg(const T& v) noexcept; // (a)
    explicit basic_format_arg(float n) noexcept;                         // (b)
    explicit basic_format_arg(double n) noexcept;                        // (c)
    explicit basic_format_arg(long double n) noexcept;                   // (d)
    explicit basic_format_arg(const charT* s);                           // (e)

    template<class traits>
      explicit basic_format_arg(
        basic_string_view<charT, traits> s) noexcept;                    // (f)

    template<class traits, class Allocator>
      explicit basic_format_arg(
        const basic_string<charT, traits, Allocator>& s) noexcept;       // (g)

    explicit basic_format_arg(nullptr_t) noexcept;                       // (h)

    template<class T>
      explicit basic_format_arg(const T* p) noexcept;                    // (i)

    template<class Ctx, class... Args>
      friend format_arg_store<Ctx, Args...>
        make_format_args(const Args&... args);
  };
}
```
* variant[link /reference/variant/variant.md]
* monostate[link /reference/variant/monostate.md]
* handle[link /reference/format/basic_format_arg/handle.md]
* basic_string[link /reference/string/basic_string.md]
* basic_string_view[link /reference/string_view/basic_string_view.md]
* basic_format_arg[link /reference/format/basic_format_arg.md]

ここで、それぞれの効果は次と�しい。

* (a):
    * `T`が`bool`または`charT`なら、`value`を`v`で初期化
    * または、`T`が`char`かつ`charT`が`wchar_t`なら、`value`を`static_cast<wchar_t>(v)`で初期化
    * または、`T`が符号つき整数型かつ`sizeof(T) <= sizeof(int)`なら、`value`を`static_cast<int>(v)`で初期化
    * または、`T`が符号なし整数型かつ`sizeof(T) <= sizeof(unsigned int)`なら、`value`を`static_cast<unsigned int>(v)`で初期化
    * または、`T`が符号つき整数型かつ`sizeof(T) <= sizeof(long long int)`なら、`value`を`static_cast<long long int>(v)`で初期化
    * または、`T`が符号なし整数型かつ`sizeof(T) <= sizeof(unsigned long long int)`なら、`value`を`static_cast<unsigned long long int>(v)`で初期化
    * または、`value`を`handle(v)`で初期化
* (b),(c),(d): `value`を`n`で初期化
* (e): `value`を`s`で初期化 (`s`は有効なC文�列であること)
* (f): `value`を`s`で初期化
* (g): `value`を`basic_string_view<charT>(s.data(), s.size())`で初期化
* (h): `value`を`static_cast<const void*>(nullptr)`で初期化
* (i): `value`を`p`で初期化 (`is_void_v<T>`が`true`であること)

## 戻り値
`{basic_format_arg<Context>(args)...}`

## 実装例
```cpp
namespace std {
  template<class Context = format_context, class... Args>
  format_arg_store<Context, Args...> make_format_args(const Args&... args)
  {
    return {basic_format_arg<Context>(args)...}
  }

  template<class... Args>
  format_arg_store<wformat_context, Args...> make_wformat_args(const Args&... args)
  {
    return make_format_args<wformat_context>(args...);
  }
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* wformat_context[link /reference/format/basic_format_context.md]

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
