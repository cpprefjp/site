# string
* string[meta header]

`<string>`ヘッダでは、文字列に関するクラス、関数、文字特性を定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


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


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|-------------------|-----------------------------------|-------|
| `hash`            | 先行宣言(class template)          | C++11 |
| `hash<string>`    | `hash`の`string`に対する特殊化    | C++11 |
| `hash<u8string>`  | `hash`の`u8string`に対する特殊化  | C++20 |
| `hash<u16string>` | `hash`の`u16string`に対する特殊化 | C++11 |
| `hash<u32string>` | `hash`の`u32string`に対する特殊化 | C++11 |
| `hash<wstring>`   | `hash`の`wstring`に対する特殊化   | C++11 |
| `hash<pmr::string>`    | `hash`の`pmr::string`に対する特殊化    | C++17 |
| `hash<pmr::u8string>`  | `hash`の`pmr::u8string`に対する特殊化  | C++20 |
| `hash<pmr::u16string>` | `hash`の`pmr::u16string`に対する特殊化 | C++17 |
| `hash<pmr::u32string>` | `hash`の`pmr::u32string`に対する特殊化 | C++17 |
| `hash<pmr::wstring>`   | `hash`の`pmr::wstring`に対する特殊化   | C++17 |


## 関連項目
- [`<string_view>`](string_view.md)
- [`<charconv>`](charconv.md)


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
