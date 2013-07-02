#string
`<string>`ヘッダでは、文字列に関するクラス、関数、文字特性を定義する。

##文字特性

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------------------------|-------|
| [`char_traits`](./string/char_traits.md) | 文字特性(class template) | |


##文字列クラス

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------------------------|-------|
| [`basic_string`](./string/basic_string.md) | 汎用文字型の文字列(class template) | |
| [`string`](./string/basic_string.md)       | マルチバイト文字列(typedef) | |
| [`wstring`](./string/basic_string.md)      | ワイド文字列(typedef) | |
| [`u16string`](./string/basic_string.md)    | UTF-16文字列(typedef) | C++11 |
| [`u32string`](./string/basic_string.md)    | UTF-32文字列(typedef) | C++11 |


##数値との変換

| 名前 | 説明 | 対応バージョン |
|-----------------|-------------------------------------------------|-------|
| `stoi`       | 文字列から`int`型への変換(function)                | C++11 |
| `stol`       | 文字列から`long`型への変換(function)               | C++11 |
| `soul`       | 文字列から`unsigned long`型への変換(function)      | C++11 |
| `stoll`      | 文字列から`long long`型への変換(function)          | C++11 |
| `stoull`     | 文字列から`unsigned long long`型への変換(function) | C++11 |
| `stof`       | 文字列から`float`型への変換(function)              | C++11 |
| `stod`       | 文字列から`double`型への変換(function)             | C++11 |
| `stold`      | 文字列から`long double`型への変換(function)        | C++11 |
| `to_string`  | 数値から`string`への変換(function)                 | C++11 |
| `to_wstring` | 数値から`wstring`への変換(function)                | C++11 |


##ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|-------------------|-----------------------------------|-------|
| `hash`            | 先行宣言(class template)          | C++11 |
| `hash<string>`    | `hash`の`string`に対する特殊化    | C++11 |
| `hash<u16string>` | `hash`の`u16string`に対する特殊化 | C++11 |
| `hash<u32string>` | `hash`の`u32string`に対する特殊化 | C++11 |
| `hash<wstring>`   | `hash`の`wstring`に対する特殊化   | C++11 |


