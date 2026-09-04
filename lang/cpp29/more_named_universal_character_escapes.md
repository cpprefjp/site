# 名前付きユニバーサルキャラクタ名で使用できる別名を拡張 [P3733R1]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
[C++23の名前付きユニバーサルキャラクタ名](/lang/cpp23/named_universal_character_escapes.md)では、`u8"\N{NO-BREAK SPACE}"`のように文字の名前を`\N{…}`で指定できる。名前としては、Unicodeの文字名に加えて、その別名 (alias) のうちcontrol（制御文字の名前。`NULL`など）・correction（公開された名前の誤りを訂正する名前）・alternate（広く使われている別名。`BYTE ORDER MARK`など）の3分類のみが許可されていた。

C++29では、この分類の制限が撤廃され、残りの2分類を含むすべての別名を使用できるようになる。

- abbreviation : よく使われる略称。`NBSP` (NO-BREAK SPACE)、`ZWJ` (ZERO WIDTH JOINER)、`SHY` (SOFT HYPHEN) など354個
- figment : 文書化されたものの標準としては採用されなかった名前。`HIGH OCTET PRESET` (U+0081) など3個

```cpp
// C++23: 正式な文字名で指定する必要があった
u8"network\N{NO-BREAK SPACE}timeout";

// C++29: 略称も指定できる
u8"network\N{NBSP}timeout";
```

この変更はC++23に対する欠陥報告 (DR) として扱うことが推奨されており、コンパイラはC++23モードでも略称などを受け入れる場合がある。


## 仕様
- 名前付きユニバーサルキャラクタ名の*n-char-sequence*は、Unicode標準の文字名、もしくはその文字名の別名と一致する場合に対応する文字を表す。一致しない場合、プログラムは不適格となる
    - C++26までは、別名のうちcontrol・correction・alternate分類のもののみが許可されていた。C++29では分類の制限がなくなる
- 機能テストマクロ`__cpp_named_character_escapes`の値が`202606L`に更新される


## 例
```cpp example
#include <iostream>

int main()
{
  // 略称の別名を使用できる。以下の2つの文字列は等価である
  const char8_t* str1 = u8"network\N{NO-BREAK SPACE}timeout";
  const char8_t* str2 = u8"network\N{NBSP}timeout";
  std::cout << reinterpret_cast<const char*>(str1) << std::endl;
  std::cout << reinterpret_cast<const char*>(str2) << std::endl;

  // 複数のコードポイントの合成による絵文字も短く書ける
  const char8_t* emoji = u8"\N{WOMAN}\N{ZWJ}\N{WOMAN}\N{ZWJ}\N{GIRL}";
  std::cout << reinterpret_cast<const char*>(emoji) << std::endl;
}
```

### 出力
```
network timeout
network timeout
👩‍👩‍👧
```

1〜2行目の空白はU+00A0 (NO-BREAK SPACE) である。


## この機能が必要になった背景・経緯
C++23で名前付きユニバーサルキャラクタ名が導入された当時、C++はUnicodeの規定としてISO/IEC 10646を参照しており、そこにはfigment分類の別名が含まれず、abbreviation分類も一部しか含まれていなかったため、これらの分類は許可されなかった。

その後、C++23の策定中にC++が参照する規格がUnicode標準そのものへ変更されたことで（P2736R2）、この制限の根拠はなくなっていた。同じ`\N{…}`構文を持つPythonやPerlはすべての分類の別名を許可しており、C++だけが恣意的に制限された状態だったため、C++29ですべての分類が許可された。

また、Unicode標準は別名自体の不変性は保証するが、別名の分類には安定性の保証がない。分類による制限をなくすことで、この不安定な性質への依存もなくなった。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++23 名前付きユニバーサルキャラクタ名](/lang/cpp23/named_universal_character_escapes.md)


## 参照
- [P3733R1 More named universal character escapes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3733r1.html)
- [P2736R2 Referencing The Unicode Standard](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2736r2.pdf)
    - C++23で、C++が参照するUnicodeの規格がISO/IEC 10646からUnicode標準へ変更された
- [NameAliases.txt - Unicode Character Database](https://www.unicode.org/Public/UCD/latest/ucd/NameAliases.txt)
    - すべての別名と分類の一覧
