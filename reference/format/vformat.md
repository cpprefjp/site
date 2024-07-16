# vformat

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  string vformat(string_view fmt, format_args args); // (1)

  wstring vformat(wstring_view fmt, wformat_args args); // (2)

  string vformat(const locale& loc, string_view fmt, format_args args); // (3)

  wstring vformat(const locale& loc, wstring_view fmt, wformat_args args); // (4)
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* format_args[link /reference/format/basic_format_args.md]
* wformat_args[link /reference/format/basic_format_args.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を文字列オブジェクトで返す。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

[`format`](format.md)のフォーマット引数を型消去したバージョンであり、内部的に使用される。文字列をフォーマットする目的で直接利用する必要はない。
ただし、[`format`](format.md)のような関数を自作する場合は、`vformat`を使って実装すると便利である。

## 戻り値

`args`の文字列表現を保持する文字列

## 例外

フォーマット実行時に失敗した場合、[`format_error`](format_error.md)を投げる。

## 実装例

```cpp
string vformat(string_view fmt, format_args args) {
  string str;
  vformat_to(back_inserter(str), fmt.str, args);
  return str;
}

string vformat(wstring_view fmt, wformat_args args) {
  wstring str;
  vformat_to(back_inserter(str), fmt.str, args);
  return str;
}

string vformat(const locale& loc, string_view fmt, format_args args) {
  string str;
  vformat_to(loc, back_inserter(str), fmt.str, args);
  return str;
}

string vformat(const locale& loc, wstring_view fmt, wformat_args args) {
  wstring str;
  vformat_to(loc, back_inserter(str), fmt.str, args);
  return str;
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* format_args[link /reference/format/basic_format_args.md]
* wformat_args[link /reference/format/basic_format_args.md]
* locale[link /reference/locale/locale.md]
* vformat_to[link vformat.md]
* back_inserter[link /reference/iterator/back_inserter.md]

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
