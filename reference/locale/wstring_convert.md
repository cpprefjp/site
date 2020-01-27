# wstring_convert
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

```cpp
namespace std {
  template <class Codecvt, class Elem = wchar_t,
            class Wide_alloc = std::allocator<Elem>,
            class Byte_alloc = std::allocator<char> >
  class wstring_convert;
}
```
* allocator[link /reference/memory/allocator.md]

## 概要
`wstring_convert`は、ワイド文�列とバイト文�列を相互変換するクラスである。

バイト文�列とは、ひとつの文�を表すのに可変長のバイト数を必要とする、UTF-8やShift_JISのような文�コードの文�列である。

ワイド文�列とは、ひとつの文�を表すのに固定長のバイト数を必要とする、UTF-16やUTF-32のような文�コードの文�列である。

このクラスの[`from_bytes()`](wstring_convert/from_bytes.md)メンバ関数を使用することによってバイト文�列からワイド文�列への変換ができ、[`to_bytes()`](wstring_convert/to_bytes.md)メンバ関数を使用することによってワイド文�列からバイト文�列への変換ができる。


テンプレートパラメータは、以下を意味する：

- `Codecvt` : コード変換を行うクラス。[`<codecvt>`](/reference/codecvt.md)ヘッダでいくつかの変換器が定義されている。
- `Elem` : ワイド文�列の内部表現で使用する文�型。
- `Wide_alloc` : ワイド文�列のア�ケータ。
- `Byte_alloc` : バイト文�列のア�ケータ。


テンプレートパラメータの�定例：

| 目的 | バイト文�列型 | ワイド文�列 | パラメータ |
|------|------------|-------|-------|
| UTF-8とUTF-16の変換 | [`std::string`][std-string] | [`std::u16string`][std-string] | `std::wstring_convert<`[`std::codecvt_utf8_utf16`][utf8-16]`<char16_t>, char16_t>` |
| UTF-8とUTF-32の変換 | [`std::string`][std-string] | [`std::u32string`][std-string] | `std::wstring_convert<`[`std::codecvt_utf8`][utf8]`<char32_t>, char32_t>` |

[std-string]: /reference/string/basic_string.md
[utf8-16]: /reference/codecvt/codecvt_utf8_utf16.md
[utf8]: /reference/codecvt/codecvt_utf8.md


## 非推奨の詳細
Unicodeの文�コード変換を行うこれらのクラスは、不�なコードポイントに対する安全なエラー処理の方法を提供していなかったため、セ�ュリティ上の欠陥があった。

仕様もあいまいであったため、不�なコードポイントに対してどのように振る舞うかも不明であった。

Unicode以外のShift_JISやBig5といった文�コードの利用が急激に減少している。標準ライブラリでの現代的なUnicodeの変換機能は非常に必要とされているが、[`<codecvt>`](/reference/codecvt.md)とそれに関連する機能の�計はお粗末なものだった。将来より良いものを作るために、これらの機能は非推奨とする。

標準ライブラリにUnicodeの文�コード変換をする代替機能はないため、他の専門特化した文�コード変換のライブラリを使用すること。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------|-------|
| [`(constructor)`](wstring_convert/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](wstring_convert/op_destructor.md)   | デストラクタ | C++11 |
| [`operator=`](wstring_convert/op_assign.md)      | 代入演算� | C++11 |
| [`from_bytes`](wstring_convert/from_bytes.md)    | バイト文�列からワイド文�列に変換する | C++11 |
| [`to_bytes`](wstring_convert/to_bytes.md)        | ワイド文�列からバイト文�列に変換する | C++11 |
| [`converted`](wstring_convert/converted.md)      | 変換した要素数を取得する | C++11 |
| [`state`](wstring_convert/state.md)              | 変換の状態を取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|---------------------------------------|-------|
| `byte_string` | バイト列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<char,` [`char_traits`](/reference/string/char_traits.md)`<char>, Byte_alloc>` | C++11 |
| `wide_string` | ワイド文�列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<Elem,` [`char_traits`](/reference/string/char_traits.md)`<Elem>, Wide_alloc>` | C++11 |
| `state_type` | ストリームのマルチバイト文�の変換の状態を表す型 `Codecvt::state_type` | C++11 |
| `int_type` | 文�に対応する値を表す数値型 `wide_string::traits_type::int_type` | C++11 |


## 例
```cpp example
#include <iostream>
#include <string>
#include <locale>
#include <codecvt>

int main()
{
  // UTF-8とUTF-32の相互変換を行うコンバーター
  std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> converter;

  // UTF-8からUTF-32に変換
  std::string u8str = u8"あいうえお";
  std::u32string u32str = converter.from_bytes(u8str);

  // コードポイント数を取得
  std::size_t codepoint_count = u32str.size();
  std::cout << codepoint_count << std::endl;
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* from_bytes[link wstring_convert/from_bytes.md]
* size()[link /reference/string/basic_string/size.md]

### 出力
```
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 参照
- [N2007 Proposed Library Additions for Code Conversion](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2007.html)
- [P0618R0 Deprecating `<codecvt>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0618r0.html)
