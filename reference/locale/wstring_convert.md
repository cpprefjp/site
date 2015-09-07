#wstring_convert (C++11)
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Codecvt, class Elem = wchar_t,
            class Wide_alloc = std::allocator<Elem>,
            class Byte_alloc = std::allocator<char> >
  class wstring_convert;
}
```
* allocator[link /reference/memory/allocator.md]

##概要
(ここに、クラスの概要を記載する)


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------|-------|
| `(constructor)` | コンストラクタ | C++11 |
| `(destructor)`  | デストラクタ | C++11 |
| `from_bytes`    | バイト列からワイド文字列への変換 | C++11 |
| `to_bytes`      | ワイド文字列からバイト列への変換 | C++11 |
| `converted`     | 変換した数を取得する | C++11 |
| `state`         | 変換の状態を取得する | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|---------------------------------------|-------|
| `byte_string` | バイト列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<char, `[`char_traits`](/reference/string/char_traits.md)`<char>, Byte_alloc>` | C++11 |
| `wide_string` | ワイド文字列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<Elem, `[`char_traits`](/reference/string/char_traits.md)`<Elem>, Wide_alloc>` | C++11 |
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 `Codecvt::state_type` | C++11 |
| `int_type` | 文字に対応する値を表す数値型 `wide_string::traits_type::int_type` | C++11 |


##例
```cpp
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
* std::string[link /reference/codecvt/string/basic_string.md]
* std::u32string[link /reference/codecvt/string/basic_string.md]
* from_bytes[link ./wstring_convert/from_bytes.md.nolink]
* std::size_t[link /reference/cstddef/size_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC, C++11 mode](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


##参照
- [N2007 Proposed Library Additions for Code Conversion](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2007.html)

