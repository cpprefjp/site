# make_format_args

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Context = format_context, class... Args>
  format_arg_store<Context, Args...> make_format_args(Args&&... args); // (1)

  template<class... Args>
  format_arg_store<wformat_context, Args...> make_wformat_args(Args&&... args); // (2)
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

## 戻り値

### (1)

```cpp
return {basic_format_arg<Context>(args)...}
```
* basic_format_arg[link /reference/format/basic_format_arg/op_constructor.md]

### (2)

```cpp
return make_format_args<wformat_context>(args...);
```
* wformat_context[link /reference/format/basic_format_context.md]

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
* basic_format_arg[link /reference/format/basic_format_arg/op_constructor.md]
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
* [P2418R2 Add support for `std::generator`-like types to `std::format`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2418r2.html)
