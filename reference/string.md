# string
* string[meta header]

`<string>`ヘッダでは、文字列に関するクラス、関数、文字特性を定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


## フリースタンディング
このヘッダの一部の機能が、フリースタンディング処理系でも使用できる。どの機能が使用できるかは各機能のページを参照。

## 文字特性

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------------------------|-------|
| [`char_traits`](string/char_traits.md) | 文字特性(class template) | |


## 文字列クラス

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------------------------|-------|
| [`basic_string`](string/basic_string.md) | 汎用文字型の文字列(class template) | |
| [`string`](string/basic_string.md)       | マルチバイト文字列(type-alias) | |
| [`wstring`](string/basic_string.md)      | ワイド文字列(type-alias) | |
| [`u8string`](string/basic_string.md)    | UTF-8文字列(type-alias) | C++20 |
| [`u16string`](string/basic_string.md)    | UTF-16文字列(type-alias) | C++11 |
| [`u32string`](string/basic_string.md)    | UTF-32文字列(type-alias) | C++11 |
| [`pmr::basic_string`](string/basic_string.md) | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる汎用文字型の文字列(type-alias) | C++17 |
| [`pmr::string`](string/basic_string.md)       | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いるマルチバイト文字列(type-alias) | C++17 |
| [`pmr::wstring`](string/basic_string.md)      | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いるワイド文字列(type-alias) | C++17 |
| [`pmr::u8string`](string/basic_string.md)    | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いるUTF-8文字列(type-alias) | C++20 |
| [`pmr::u16string`](string/basic_string.md)    | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いるUTF-16文字列(type-alias) | C++17 |
| [`pmr::u32string`](string/basic_string.md)    | [多相アロケータ](/reference/memory_resource/polymorphic_allocator.md)を用いるUTF-32文字列(type-alias) | C++17 |


## 数値との変換

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|----------------------------------------------------|-------|
| [`stoi`](string/stoi.md)             | 文字列から`int`型への変換(function)                | C++11 |
| [`stol`](string/stol.md)             | 文字列から`long`型への変換(function)               | C++11 |
| [`stoul`](string/stoul.md)           | 文字列から`unsigned long`型への変換(function)      | C++11 |
| [`stoll`](string/stoll.md)           | 文字列から`long long`型への変換(function)          | C++11 |
| [`stoull`](string/stoull.md)         | 文字列から`unsigned long long`型への変換(function) | C++11 |
| [`stof`](string/stof.md)             | 文字列から`float`型への変換(function)              | C++11 |
| [`stod`](string/stod.md)             | 文字列から`double`型への変換(function)             | C++11 |
| [`stold`](string/stold.md)           | 文字列から`long double`型への変換(function)        | C++11 |
| [`to_string`](string/to_string.md)   | 数値から`string`への変換(function)                 | C++11 |
| [`to_wstring`](string/to_wstring.md) | 数値から`wstring`への変換(function)                | C++11 |


## 関連項目
- [`<string_view>`](string_view.md)
- [`<charconv>`](charconv.md)


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、文字特性やC言語ライブラリの文字・文字列関数など、このヘッダの機能がフリースタンディング処理系に対応した
