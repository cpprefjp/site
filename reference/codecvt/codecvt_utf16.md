#codecvt_utf16
* codecvt[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Elem, unsigned long Maxcode = 0x10ffff,
            codecvt_mode Mode = (codecvt_mode)0>
  class codecvt_utf16 : public codecvt<Elem, char, mbstate_t> {
    // 未規定...
  };
}
```
* codecvt_mode[link /reference/codecvt/codecvt_mode.md]
* codecvt[link /reference/locale/codecvt.md]

##概要
UTF-16との変換を行うファセットクラス。`char`列と`Elem`列との間で、以下のようにエンコーディングの変換を行う機能を有する。

- `char`: UTF-16エンコーディングのマルチバイト文字列。
- `Elem`: UCS-2またはUCS-4 (UTF-32)。`char16_t`など2バイトの型を指定するとUCS-2、`char32_t`など4バイトの型を指定するとUCS-4として扱われる。

BOMの有無やエンディアンなどを[`codecvt_mode`](codecvt_mode.md)で指定できる。

##例
```cpp
#include <codecvt>
#include <string>
#include <cassert>

int main()
{
  std::wstring_convert<std::codecvt_utf16<char32_t>, char32_t> converter;

  // UCS-4/UTF-32からUTF-16に変換
  std::u32string u32str = U"\U0001F359";
  std::string u16str = converter.to_bytes(u32str);

  assert(u16str.size() == 4);
  assert(u16str[0] == '\xd8');
  assert(u16str[1] == '\x3c');
  assert(u16str[2] == '\xdf');
  assert(u16str[3] == '\x59');

  // UTF-16からUCS-4/UTF-32に変換
  std::u32string restored = converter.from_bytes(u16str);
  assert(u32str == restored);
}
```
* wstring_convert[link ../locale/wstring_convert.md]
* u32string[link ../string/basic_string.md]
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

