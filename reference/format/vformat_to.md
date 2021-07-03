# vformat_to

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out>
  Out vformat_to(Out out, string_view fmt, format_args args); // (1)

  template<class Out>
  Out vformat_to(Out out, wstring_view fmt, wformat_args args); // (2)

  template<class Out>
  Out vformat_to(Out out, const locale& loc, string_view fmt, format_args args); // (3)

  template<class Out>
  Out vformat_to(Out out, const locale& loc, wstring_view fmt, wformat_args args); // (4)
}
```
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* format_args[link /reference/format/basic_format_args.md]
* wformat_args[link /reference/format/basic_format_args.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を出力イテレーター`out`に出力する。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

[`format_to`](format_to.md)のフォーマット引数を型消去したバージョンであり、内部的に使用される。文字列をフォーマットする目的で直接利用する必要はない。
ただし、[`format_to`](format_to.md)のような関数を自作する場合は、`vformat_to`を使って実装すると便利である。

## テンプレートパラメータ制約

`Out`は以下の制約を満たす。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 事前条件

`out`は以下の制約を満たす型の有効なオブジェクトである。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 効果

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を出力イテレーター`out`の`[out, out + N)`の範囲に出力する。ロケール`loc`が指定された場合は、ロケール依存のフォーマットにおいて使用される。
(ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 戻り値

`out + N` (ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 例外

書式文字列が正しくなかったり、フォーマット実行時に失敗したりした場合、[`format_error`](format_error.md)を投げる。

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
