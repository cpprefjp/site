# 複合文の末尾へのラベルを許可 [P2324R2]
* cpp23[meta cpp]

<-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要
C言語 (C23) との互換性のため、C言語で新しく許可された複合文の末尾 (関数末尾など`{}`ブロックの末尾) へのgotoラベルを許可する。

関数末尾の例：

```cpp
void foo(void)
{
first:  // C23:OK C++:OK
  int x;
second: // C:OK C++:OK
  x = 1;
last:   // C23:OK C++23:OK
}
```


## この機能が必要になった背景・経緯
CではN2508の提案により、宣言の前など、複合文のあらゆる箇所にgotoラベルを置けるようになり、C++との互換性が改善した。C++では宣言は文として扱われるため宣言の前には以前からgotoラベルを置くことができた。ただし、C++では複合文の末尾にはgotoラベルを置けないため新しい非互換が生じた。

C++23でこの機能を導入することにより、gotoラベルを置ける場所についての非互換がなくなる。


## 参照
- [P2324R2 Labels at the end of compound statements (C compatibility)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2324r2.pdf)
- [C2X Proposal: WG14 N2508 Free Positioning of Labels Inside Compound Statements (updates N2496)](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2508.pdf)