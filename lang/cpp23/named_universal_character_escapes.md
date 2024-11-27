# 名前付きユニバーサルキャラクタ名 [P2071R2]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
これまで、Unicodeのユニバーサルキャラクタ名を指定するためには、`u8"\u0100"`のように`\u`または`\U`に続いてコードポイントを記述していた。

しかしこれではコード上でなんの文字を表しているのかわかりにくいため、文字の名前を指定できるようにする。

構文としては`u8"\N{LATIN CAPITAL LETTER A WITH MACRON}"`のように、`\N{…}`の波カッコで囲まれた中に、ユニバーサルキャラクタ名を入力する。

使用可能な文字はUnicode規格ISO/IEC 10646で定義され、それと厳密に一致しなければならない（大文字と小文字の違いやスペースの有無・数などが厳密にチェックされる）。

このユニコード名のマッチングを規定する[UAX44-LM2](https://www.unicode.org/reports/tr44/tr44-24.html#UAX44-LM2)では、以下の名前はすべて`U+200B` (ZERO WIDTH SPACE、ゼロ幅スペース) を表すものとしてマッチングされるが、C++の名前付きユニバーサルキャラクタ名では一番最初の`ZERO WIDTH SPACE`のみが正しい名前として受け入れられる。

```
ZERO WIDTH SPACE
ZERO-WIDTH SPACE
zero-width space
ZERO width S P_A_C E
```

## 例
```cpp example
#include <iostream>

int main()
{
  // ユニバーサルキャラクタ名をコードポイントで指定
  const char8_t* str1 = u8"\u0100\u0300";
  std::cout << reinterpret_cast<const char*>(str1) << std::endl;

  // ユニバーサルキャラクタ名を名前で指定
  // 上記のコードポイント指定と等価
  const char8_t* str2 = u8"\N{LATIN CAPITAL LETTER A WITH MACRON}\N{COMBINING GRAVE ACCENT}";
  std::cout << reinterpret_cast<const char*>(str2) << std::endl;
}
```

### 出力
```
Ā̀
Ā̀
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `char16_t`と`char32_t`](/lang/cpp11/char16_32.md)

## 参照
- [P2071R2 Named universal character escapes](https://www.open-std.org/JTC1/SC22/WG21/docs/papers/2022/p2071r2.html)
- [Unicode Character “Ā” (U+0100)](https://www.compart.com/en/unicode/U+0100)
- [Unicode Character “◌̀” (U+0300)](https://www.compart.com/en/unicode/U+0300)
