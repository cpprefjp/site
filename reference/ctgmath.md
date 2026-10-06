# ctgmath
* ctgmath[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

`<ctgmath>`ヘッダは、[`<complex>`](/reference/complex.md)と[`<cmath>`](/reference/cmath.md)をインクルードするだけのヘッダである。名前はC言語の型総称数学関数のヘッダ`<tgmath.h>`に対応しているが、C言語の型総称マクロは提供しない。

C言語の`<tgmath.h>`は、引数の型に応じて`sqrtf()`・`sqrt()`・`sqrtl()`・`csqrt()`などを呼び分ける`sqrt`のようなマクロ (型総称マクロ) を定義する。C++では同じことが[`<complex>`](/reference/complex.md)と[`<cmath>`](/reference/cmath.md)のオーバーロードによって実現されているため、型総称マクロに相当する機能は必要ない。


## 非推奨・削除の詳細
- C99互換のためにC++11で追加されたが、ほかのヘッダをインクルードするだけでC言語の型総称マクロを提供しないため、C++17で非推奨となり、C++20で削除された
    - 代替機能として、[`<complex>`](/reference/complex.md)と[`<cmath>`](/reference/cmath.md)を直接インクルードすること
- C++11では、本ヘッダは[`<ccomplex>`](/reference/ccomplex.md)と[`<cmath>`](/reference/cmath.md)をインクルードすると規定されていた。C++17で、[`<ccomplex>`](/reference/ccomplex.md)が非推奨となったことにあわせて、[`<complex>`](/reference/complex.md)をインクルードするよう変更された


## バージョン
### 言語
- C++11


## 関連項目
- [`<complex>`](/reference/complex.md)
- [`<cmath>`](/reference/cmath.md)
- [`<ccomplex>`](/reference/ccomplex.md) : 同じ経緯で非推奨・削除されたヘッダ


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、本ヘッダが非推奨となった。あわせて、インクルードするヘッダが[`<ccomplex>`](/reference/ccomplex.md)から[`<complex>`](/reference/complex.md)へ変更された
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
    - C++20で、本ヘッダが削除された
