# 数学互換記法の文字を識別子として許可 [P3658R1]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、識別子に使用できる文字が、UnicodeのXID_Startプロパティ（先頭文字）とXID_Continueプロパティ（後続文字）を持つ文字に制限された（P1949R7。C++20以前への欠陥報告として遡及適用）。これによって識別子の正規化や検証が可能になった一方、C++11から使用できていた`∇f`・`x²`・`x₂`・`∂Ω`のような数学記法の識別子が使えなくなった。

C++29では、Unicodeの新しい勧告（UTS #55 Unicode Source Code Handlingが汎用プログラミング言語へ採用を勧告する、UAX #31の数学互換記法プロファイル）に従って、識別子の先頭文字としてID_Compat_Math_Startプロパティを持つ文字、後続文字としてID_Compat_Math_Continueプロパティを持つ文字が追加で許可される。

```cpp
double ∇f = 1.5;  // C++23では不適格だった数学記法の識別子が、ふたたび使用できる
int x² = 4;
double C∞ = 0.0;  // C++11でも使用できなかった識別子が使えるようになる例もある
```

この変更はC++23以前への欠陥報告 (DR) として採用されており、たとえばClangは2022年（Clang 16）からこの文字集合を拡張として受け入れている。

なお、絵文字は引き続き識別子には使用できない。


## 仕様
- `identifier-start`（識別子の先頭に使える文字）に、Unicodeプロパティ ID_Compat_Math_Start を持つ文字が追加される。`∇` (U+2207)・`∂` (U+2202)・`∞` (U+221E) などの数学記号がこれにあたる
- `identifier-continue`（識別子の2文字目以降に使える文字）に、Unicodeプロパティ ID_Compat_Math_Continue を持つ文字が追加される。ID_Compat_Math_Startの文字に加えて、`²`や`₂`のような上付き・下付きの数字などがこれにあたる


## 例
```cpp example
#include <iostream>

int main()
{
  double ∇f = 1.5;   // U+2207 NABLA: ID_Compat_Math_Start
  int x² = 4;         // U+00B2 SUPERSCRIPT TWO: ID_Compat_Math_Continue
  double ∂Ω = 0.5;   // U+2202 PARTIAL DIFFERENTIAL: ID_Compat_Math_Start
  std::cout << ∇f * x² * ∂Ω << std::endl;
}
```

### 出力
```
3
```


## この機能が必要になった背景・経緯
C++11で導入された当初の識別子の定義は、Unicodeのほぼ全コード空間を許容するものだった。C++23のP1949R7は、Unicodeの当時の勧告に従って識別子をXID_Start／XID_Continueに制限し、これによって正規化の要求やセキュリティ診断が可能になったが、実際のコードで使われていた数学記法の識別子が使えなくなるという非互換を生んだ。

Unicodeテクニカル委員会は、C++などが約10年にわたってほぼ全コード空間を識別子に許してきた使用実態を調査し、既定の識別子定義から漏れていた数学記法の文字群を特定した。その結果がID_Compat_Math_Start／ID_Compat_Math_Continueプロパティと、汎用プログラミング言語へその採用を勧告するUTS #55である。科学計算の分野では、これらの文字によって識別子の可読性と判別しやすさが向上する。

XID_Start／XID_Continue自体にこれらの文字を追加しなかったのは、これらのプロパティがマークアップ言語の識別子やユーザー名など、プログラミング言語以外でも広く使われており、影響が大きすぎるためである。

なお、なりすまし（見た目が紛らわしい文字の悪用）への対策は字句規則の役割ではなく、UTS #39／UTS #55にもとづく処理系の診断に委ねられている。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++23 汎用的なソースコードのエンコーディングとしてUTF-8をサポート](/lang/cpp23/support_for_utf8_as_a_portable_source_file_encoding.md)
- [C++26 基本文字集合に`@`、`$`、`` ` ``を追加](/lang/cpp26/add_atsign_dollar_graveaccent_to_the_basic_character_set.md)


## 参照
- [P3658R1 Adjust identifier following new Unicode recommendations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3658r1.pdf)
- [P1949R7 C++ Identifier Syntax using Unicode Standard Annex 31](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1949r7.html)
    - C++23で、識別子をXID_Start／XID_Continueプロパティを持つ文字に制限した提案（C++20以前へ遡及適用）
- [UTS #55: Unicode Source Code Handling](https://www.unicode.org/reports/tr55/)
- [UAX #31: Unicode Identifiers and Syntax](https://www.unicode.org/reports/tr31/)
