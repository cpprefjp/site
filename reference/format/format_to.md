# format_to

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out, class... Args>
  Out format_to(Out out, string_view fmt, const Args&... args); // (1)

  template<class Out, class... Args>
  Out format_to(Out out, wstring_view fmt, const Args&... args); // (2)

  template<class Out, class... Args>
  Out format_to(Out out, const locale& loc, string_view fmt, const Args&... args); // (3)

  template<class Out, class... Args>
  Out format_to(Out out, const locale& loc, wstring_view fmt, const Args&... args); // (4)
}
```
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を出力イテレーター`out`に出力する。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

```cpp
string buffer;
format_to(back_inserter(buffer), "The answer is {}.", 42);
```

## テンプレートパラメータ制約

`Out`は以下の制約を満たす。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 事前条件

`out`は以下の制約を満たす型の有効なオブジェクトである。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 効果

以下のコードと等しい。

```cpp
using context = basic_format_context<Out, decltype(fmt)::value_type>;
// (1), (2)
return vformat_to(out, fmt, {make_format_args<context>(args...)});
// (3), (4)
return vformat_to(out, loc, fmt, {make_format_args<context>(args...)});
```
* basic_format_context[link basic_format_context.md]
* vformat_to[link vformat_to.md]
* make_format_args[link make_format_args.md]

## 戻り値

`out + N` (ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 例外

書式文字列が正しくなかったり、フォーマット実行時に失敗したりした場合、[`format_error`](format_error.md)を投げる。

## 備考

マルチバイト文字列、ワイド文字列の区別は、可変長引数部分で受け取れる文字列の型にも適用される。

## 例
```cpp example
#include <iostream>
#include <string>
#include <format>

int main()
{
  std::string buffer;
  std::format_to(std::back_inserter(buffer), "The answer is {}.", 42);
  std::cout << buffer << std::endl;
}
```

### 出力
```
The answer is 42.
```

## 実装例
```cpp
template<class Out, class... Args>
string format_to(Out out, string_view fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, fmt, {make_format_args<context>(args...)});
}

template<class Out, class... Args>
wstring format_to(Out out, wstring_view fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, fmt, {make_format_args<context>(args...)});
}

template<class Out, class... Args>
string format_to(Out out, const locale& loc, string_view fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, loc, fmt, {make_format_args<context>(args...)});
}

template<class Out, class... Args>
wstring format_to(Out out, const locale& loc, wstring_view fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, loc, fmt, {make_format_args<context>(args...)});
}
```
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* basic_format_context[link basic_format_context.md]
* vformat_to[link vformat.md]
* make_format_args[link make_format_args.md]
* locale[link /reference/locale/locale.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
