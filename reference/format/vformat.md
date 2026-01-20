# vformat

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  string
    vformat(string_view fmt,
            format_args args);  // (1) C++20
  constexpr string
    vformat(string_view fmt,
            format_args args);  // (1) C++26

  wstring
    vformat(wstring_view fmt,
            wformat_args args); // (2) C++20
  constexpr wstring
    vformat(wstring_view fmt,
            wformat_args args); // (2) C++26

  string
    vformat(const locale& loc,
            string_view fmt,
            format_args args);  // (3) C++20

  wstring
    vformat(const locale& loc,
            wstring_view fmt,
            wformat_args args); // (4) C++20
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
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

[`std::format()`](format.md)関数のフォーマット引数を実行時文字列にしたバージョンであり、[`std::format()`](format.md)関数の内部で使用される。

[`std::format()`](format.md)のような関数を自作する場合にこの関数を使って実装すると便利であるほか、実行時文字列でフォーマット引数を構築したい場合にも利用できる。

C++26以降は、実行時文字列のフォーマット引数を使用したい場合は、[`std::runtime_format()`](runtime_format.md)関数を使用できる。


## 戻り値

`args`の文字列表現を保持する文字列

## 例外

フォーマット実行時に失敗した場合、[`format_error`](format_error.md)を投げる。

## 例
```cpp example
#include <iostream>
#include <format>

int main() {
  std::string fmt = "0x{:x} 0b{:04b}";
  std::string s = std::vformat(fmt, std::make_format_args(10, 6));
  std::cout << s << std::endl;
}
```
* std::vformat[color ff0000]
* std::make_format_args[link make_format_args.md]

### 出力
```
0xa 0b0110
```


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
* wstring_view[link /reference/string_view/basic_string_view.md]
* format_args[link /reference/format/basic_format_args.md]
* wformat_args[link /reference/format/basic_format_args.md]
* locale[link /reference/locale/locale.md]
* vformat_to[link vformat_to.md]
* back_inserter[link /reference/iterator/back_inserter.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 17
- [GCC](/implementation.md#gcc): 13
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から非ロケール版が`constexpr`に対応した
