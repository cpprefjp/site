#codecvt_utf8_utf16
* codecvt[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Elem, unsigned long Maxcode = 0x10ffff,
            codecvt_mode Mode = (codecvt_mode)0>
  class codecvt_utf8_utf16 : public codecvt<Elem, char, mbstate_t> {
    // 未規定...
  };
}
```
* codecvt_mode[link /reference/codecvt/codecvt_mode.md]
* codecvt[link /reference/locale/codecvt.md]

##概要
UTF-8とUTF-16との変換を行うファセットクラス。`char`列と`Elem`列との間で、以下のようにエンコーディングの変換を行う機能を有する。

- `char`: UTF-8エンコーディングのマルチバイト文字列。
- `Elem`: UTF-16エンコーディングの文字列。

UTF-8文字列におけるBOMの有無を[`codecvt_mode`](codecvt_mode.md)で指定できる。

##例
```cpp
#include <iostream>
#include <string>
#include <codecvt>
#include <cassert>

int main()
{
  std::wstring_convert<std::codecvt_utf8_utf16<char16_t>, char16_t> converter;

  // UTF-16からUTF-8に変換
  std::u16string u16str = u"\U0001F359";
  std::string u8str = converter.to_bytes(u16str);

  assert(u8str.size() == 4);
  assert(u8str[0] == '\xf0');
  assert(u8str[1] == '\x9f');
  assert(u8str[2] == '\x8d');
  assert(u8str[3] == '\x99');
  // UTF-8からUTF-16に変換
  std::u16string restored = converter.from_bytes(u8str);
  assert(u16str== restored);
}
```
* wstring_convert[link ../locale/wstring_convert.md]
* u16string[link ../string/basic_string.md]
* string[link ../string/basic_string.md]

###出力
上記プログラムは何も出力しない。

##バージョン

###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1

##参照
- [N2401 Code Conversion Facets for the Standard C++ Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2401.htm)

