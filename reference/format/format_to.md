# format_to

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out, class... Args>
  Out format_to(Out out, format_string<Args...> fmt, Args&&... args); // (1)

  template<class Out, class... Args>
  Out format_to(Out out, wformat_string<Args...> fmt, Args&&... args); // (2)

  template<class Out, class... Args>
  Out format_to(Out out, const locale& loc, format_string<Args...> fmt, Args&&... args); // (3)

  template<class Out, class... Args>
  Out format_to(Out out, const locale& loc, wformat_string<Args...> fmt, Args&&... args); // (4)
}
```
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を出力イテレータ`out`に出力する。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

```cpp
string buffer;
format_to(back_inserter(buffer), "The answer is {}.", 42);
```

書式文字列は定数式でなければならず、コンパイル時にチェックされる。実行時に決まるフォーマット文字列を使用したい場合、[`vformat_to`](vformat_to.md)を使用できる。

## 適格要件

* 書式文字列は定数式であり、[`string_view`](/reference/string_view/basic_string_view.md)(ワイド文字列版は[`wstring_view`](/reference/string_view/basic_string_view.md))に暗黙変換できること。
* 書式文字列にエラーがないこと。例えば、
    * 閉じていないカッコなどの構文エラーがないこと。
    * 実際に渡している引数の型が書式文字列中の置換フィールドが要求する型に合うこと。

## テンプレートパラメータ制約

`Out`は以下の制約を満たす。

* (1), (3): [`output_iterator`](/reference/iterator/output_iterator.md)`<Out, const char&>`
* (2), (4): [`output_iterator`](/reference/iterator/output_iterator.md)`<Out, const wchar_t&>`

## 事前条件

`Out`は以下のコンセプトのモデルである。

* (1), (3): [`output_iterator`](/reference/iterator/output_iterator.md)`<Out, const char&>`
* (2), (4): [`output_iterator`](/reference/iterator/output_iterator.md)`<Out, const wchar_t&>`

## 効果

以下のコードと等しい。

```cpp
// (1), (2)
return vformat_to(out, fmt.str, make_format_args(args...));
// (3), (4)
return vformat_to(out, loc, fmt.str, make_wformat_args(args...));
```
* vformat_to[link vformat_to.md]
* make_format_args[link make_format_args.md]

## 戻り値

`out + N` (ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 例外

フォーマット実行時に失敗した場合、[`format_error`](format_error.md)を投げる。

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
string format_to(Out out, format_string<Args...> fmt, const Args&... args)
{
  return vformat_to(out, fmt.str, {make_format_args>(args...)});
}

template<class Out, class... Args>
wstring format_to(Out out, wformat_string<Args...> fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, fmt.str, {make_format_args<context>(args...)});
}

template<class Out, class... Args>
string format_to(Out out, const locale& loc, format_string<Args...> fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, loc, fmt.str, {make_format_args<context>(args...)});
}

template<class Out, class... Args>
wstring format_to(Out out, const locale& loc, wformat_string<Args...> fmt, const Args&... args)
{
  using context = basic_format_context<Out, decltype(fmt)::value_type>;
  return vformat_to(out, loc, fmt.str, {make_format_args<context>(args...)});
}
```
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]
* str[italic]
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
* [P2216R3 std::format improvements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
* [［C++］ std::formatあるいは{fmt}のコンパイル時フォーマット文字列チェックの魔術 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2021/07/01/195912)
* [P2418R2 Add support for `std::generator`-like types to `std::format`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2418r2.html)

