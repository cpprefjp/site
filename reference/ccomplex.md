# ccomplex
* ccomplex[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

`<ccomplex>`ヘッダは、C言語の複素数ライブラリ`<complex.h>`をC++で使用するためのヘッダ。ただし、C++には標準で`<complex>`ヘッダが存在しているため、このヘッダは実際には`<complex>`ヘッダをインクルードするだけのラッパーである。

## 非推奨・削除の詳細

もともとC99互換のためにC++11で追加されたが、`<complex>`ヘッダが存在するため無用であり、C++17で非推奨となり、C++20で削除された。

代替機能として、`<complex>`ヘッダを使用すること。

## バージョン
### 言語
- C++11

## 関連項目

- [`<complex>`](/reference/complex.md)
