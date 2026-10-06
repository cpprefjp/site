# ciso646
* ciso646[meta header]
* cpp20removed[meta cpp]

`<ciso646>`ヘッダは、C言語の`<iso646.h>`に対応するヘッダである。何も定義しないため、インクルードしても効果はない。

C言語の`<iso646.h>`は、`&&`に対する`and`、`||`に対する`or`のように、記号で書く演算子の別名をマクロとして定義する。C++ではこれらの別名が言語のキーワード (`and`、`and_eq`、`bitand`、`bitor`、`compl`、`not`、`not_eq`、`or`、`or_eq`、`xor`、`xor_eq`) であるため、マクロとして定義されない。


## 非推奨・削除の詳細
- C++では何も定義しないヘッダであるため、C++20で削除された。非推奨の段階を経ず、ほかのC互換ヘッダの削除とあわせて削除された
    - 演算子の別名はC++のキーワードであり、ヘッダのインクルードなしで使用できる


## 関連項目
- [`<ccomplex>`](/reference/ccomplex.md) : 同じタイミングで削除されたヘッダ
- [`<cstdbool>`](/reference/cstdbool.md) : 同じタイミングで削除されたヘッダ


## 参照
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
    - C++20で、本ヘッダが削除された
