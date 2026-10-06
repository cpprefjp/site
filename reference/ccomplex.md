# ccomplex
* ccomplex[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

`<ccomplex>`ヘッダは、[`<complex>`](/reference/complex.md)ヘッダをインクルードするだけのヘッダである。名前はC言語の複素数ライブラリ`<complex.h>`に対応しているが、C言語の複素数ライブラリの内容は提供しない。


## 非推奨・削除の詳細
- このヘッダはC99互換のためにC++11で追加されたが、[`<complex>`](/reference/complex.md)をインクルードするだけでC言語の複素数ライブラリの内容を提供しないため、C++17で非推奨となり、C++20で削除された
    - 代替機能として、[`<complex>`](/reference/complex.md)ヘッダを使用すること


## バージョン
### 言語
- C++11


## 関連項目
- [`<complex>`](/reference/complex.md)
- [`<ctgmath>`](/reference/ctgmath.md) : 同じ経緯で非推奨・削除されたヘッダ。C++11では、本ヘッダと[`<cmath>`](/reference/cmath.md)をインクルードすると規定されていた


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、本ヘッダが非推奨となった。あわせて[`<ctgmath>`](/reference/ctgmath.md)の規定が、本ヘッダではなく[`<complex>`](/reference/complex.md)をインクルードするよう変更された
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
    - C++20で、本ヘッダが削除された
