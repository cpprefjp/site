# codecvt_utf8_utf16
* codecvt[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp26removed[meta cpp]

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

## 概要
UTF-8とUTF-16との変換を行うファセットクラス。`char`列と`Elem`列との間で、以下のようにエンコーディングの変換を行う機能を有する。

- `char`: UTF-8エンコーディングのマルチバイト文字列。
- `Elem`: UTF-16エンコーディングの文字列。

UTF-8文字列におけるBOMの有無を[`codecvt_mode`](codecvt_mode.md)で指定できる。


## 非推奨・削除の詳細
Unicodeの文字コード変換を行うこれらのクラスは、不正なコードポイントに対する安全なエラー処理の方法を提供していなかったため、セキュリティ上の欠陥があった。

仕様もあいまいであったため、不正なコードポイントに対してどのように振る舞うかも不明であった。

Unicode以外のShift_JISやBig5といった文字コードの利用が急激に減少している。標準ライブラリでの現代的なUnicodeの変換機能は非常に必要とされているが、`<codecvt>`の設計はお粗末なものだった。将来より良いものを作るために、これらの機能は非推奨・削除とする。

標準ライブラリにUnicodeの文字コード変換をする代替機能はないため、他の専門特化した文字コード変換のライブラリを使用すること。


## 例
```cpp example
#include <iostream>
#include <string>
#include <codecvt>
#include <cassert>
#include <locale>

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
  assert(u16str == restored);
}
```
* std::codecvt_utf8_utf16[color ff0000]
* std::wstring_convert[link ../locale/wstring_convert.md]
* u8str.size()[link ../string/basic_string/size.md]
* u8str[0][link ../string/basic_string/op_at.md]
* u8str[1][link ../string/basic_string/op_at.md]
* u8str[2][link ../string/basic_string/op_at.md]
* u8str[3][link ../string/basic_string/op_at.md]
* converter.to_bytes[link ../locale/wstring_convert/to_bytes.md]
* converter.from_bytes[link ../locale/wstring_convert/from_bytes.md]

### 出力
上記プログラムは何も出力しない。

## バージョン

### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.3 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]

## 参照
- [N2401 Code Conversion Facets for the Standard C++ Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2401.htm)
- [P0618R0 Deprecating `<codecvt>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0618r0.html)
- [P2871R3 Remove Deprecated Unicode Conversion Facets from C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2871r3.pdf)
