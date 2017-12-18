# codecvt_utf16
* codecvt[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

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

## 概要
UTF-16との変換を行うファセットクラス。`char`列と`Elem`列との間で、以下のようにエンコーディングの変換を行う機能を有する。

- `char`: UTF-16エンコーディングのマルチバイト文字列。
- `Elem`: UCS-2またはUCS-4 (UTF-32)。`char16_t`など2バイトの型を指定するとUCS-2、`char32_t`など4バイトの型を指定するとUCS-4として扱われる。

BOMの有無やエンディアンなどを[`codecvt_mode`](codecvt_mode.md)で指定できる。


## 非推奨の詳細
Unicodeの文字コード変換を行うこれらのクラスは、不正なコードポイントに対する安全なエラー処理の方法を提供していなかったため、セキュリティ上の欠陥があった。

仕様もあいまいであったため、不正なコードポイントに対してどのように振る舞うかも不明であった。

Unicode以外のShift_JISやBig5といった文字コードの利用が急激に減少している。標準ライブラリでの現代的なUnicodeの変換機能は非常に必要とされているが、`<codecvt>`の設計はお粗末なものだった。将来より良いものを作るために、これらの機能は非推奨とする。

標準ライブラリにUnicodeの文字コード変換をする代替機能はないため、他の専門特化した文字コード変換のライブラリを使用すること。


## 例
```cpp example
#include <codecvt>
#include <string>
#include <cassert>
#include <locale>

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
* std::codecvt_utf16[color ff0000]
* std::wstring_convert[link ../locale/wstring_convert.md]
* std::u32string[link ../string/basic_string.md]
* std::string[link ../string/basic_string.md]
* u16str.size()[link ../string/basic_string/size.md]
* u16str[0][link ../string/basic_string/op_at.md]
* u16str[1][link ../string/basic_string/op_at.md]
* u16str[2][link ../string/basic_string/op_at.md]
* u16str[3][link ../string/basic_string/op_at.md]
* converter.to_bytes[link ../locale/wstring_convert/to_bytes.md]
* converter.from_bytes[link ../locale/wstring_convert/from_bytes.md]


### 出力
上記プログラムは何も出力しない。


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017

## 参照
- [N2401 Code Conversion Facets for the Standard C++ Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2401.htm)
- [P0618R0 Deprecating `<codecvt>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0618r0.html)
