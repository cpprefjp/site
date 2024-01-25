# 名前付きユニバーサルキャラクタ名
* cpp23[meta cpp]

## 概要
これまで、Unicodeのユニバーサルキャラクタ名を指定するためには、`u8"\u0100"`のように`\u`または`\U`に続いてコードポイントを記述していた。

しかしこれではコード上でなんの文字を表しているのかわかりにくいため、文字の名前を指定できるようにする。

構文としては`u8"\N{LATIN CAPITAL LETTER A WITH MACRON}"`のように、`\N{…}`の波カッコで囲まれた中に、ユニバーサルキャラクタ名を入力する。

使用可能な文字はUnicode規格ISO/IEC 10646で定義される。

名前のマッチングは[UAX44-LM2](https://www.unicode.org/reports/tr44/tr44-24.html#UAX44-LM2)を参照しており、これによって

- 大文字・小文字を区別しない
- ハイフンの省略
- アンダースコアをハイフンに置換

するなど、柔軟な指定ができるようになっている。例として、以下の名前はすべて`U+200B` (ZERO WIDTH SPACE、ゼロ幅スペース) を表すものとして使用できる：

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

## 関連項目
- [C++11 `char16_t`と`char32_t`](/lang/cpp11/char16_32.md)

## 参照
- [P2173R1 Attributes on Lambda-Expressions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2173r1.pdf)
- [Unicode Character “Ā” (U+0100)](https://www.compart.com/en/unicode/U+0100)
- [Unicode Character “◌̀” (U+0300)](https://www.compart.com/en/unicode/U+0300)
