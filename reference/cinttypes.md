# cinttypes
* cinttypes[meta header]
* cpp11[meta cpp]

`<cinttypes>`ヘッダでは、[`<cstdint>`](cstdint.md)の固定幅整数型を[`<cstdio>`](cstdio.md)の`printf`系・`scanf`系関数で入出力するための書式指定マクロと、最大幅整数型に対する数値変換関数を提供する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<inttypes.h>`ヘッダと同じである。

このヘッダは[`<cstdint>`](cstdint.md)をインクルードする。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `imaxdiv_t` | `imaxdiv`関数の戻り値型 | C++11 |


## 関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `imaxabs`   | `intmax_t`の絶対値を取得する | C++11 |
| `imaxdiv`   | `intmax_t`の除算と剰余算を行う | C++11 |
| `strtoimax` | 文字列を`intmax_t`に変換する | C++11 |
| `strtoumax` | 文字列を`uintmax_t`に変換する | C++11 |
| `wcstoimax` | ワイド文字列を`intmax_t`に変換する | C++11 |
| `wcstoumax` | ワイド文字列を`uintmax_t`に変換する | C++11 |
| `abs`       | `intmax_t`の絶対値を取得する (`imaxabs`のオーバーロード、処理系定義) | C++11 |
| `div`       | `intmax_t`の除算と剰余算を行う (`imaxdiv`のオーバーロード、処理系定義) | C++11 |


## 出力用の書式指定マクロ

`printf`系関数で固定幅整数型を出力するための変換指定子を表すマクロ。`PRI`に続けて変換 (`d`/`i`/`o`/`u`/`x`/`X`/`b`/`B`) と型の種別を組み合わせる。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `PRId`*N*, `PRIi`*N*, `PRIo`*N*, `PRIu`*N*, `PRIx`*N*, `PRIX`*N* | `intN_t` / `uintN_t`用 | C++11 |
| [`PRIb`*N*, `PRIB`*N*](cinttypes/prib.md) | `intN_t` / `uintN_t`用 (2進数) | C++26 |
| `PRIdLEAST`*N* 等, `PRIdFAST`*N* 等 | `int_leastN_t` / `int_fastN_t`系用 (2進数の`b`/`B`はC++26) | C++11 |
| `PRIdMAX` 等, `PRIdPTR` 等 | `intmax_t` / `intptr_t`系用 (2進数の`b`/`B`はC++26) | C++11 |


## 入力用の書式指定マクロ

`scanf`系関数で固定幅整数型を入力するための変換指定子を表すマクロ。`SCN`に続けて変換 (`d`/`i`/`o`/`u`/`x`/`b`) と型の種別を組み合わせる。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `SCNd`*N*, `SCNi`*N*, `SCNo`*N*, `SCNu`*N*, `SCNx`*N* | `intN_t` / `uintN_t`用 | C++11 |
| [`SCNb`*N*](cinttypes/scnb.md) | `intN_t` / `uintN_t`用 (2進数) | C++26 |
| `SCNdLEAST`*N* 等, `SCNdFAST`*N* 等 | `int_leastN_t` / `int_fastN_t`系用 (2進数の`b`はC++26) | C++11 |
| `SCNdMAX` 等, `SCNdPTR` 等 | `intmax_t` / `intptr_t`系用 (2進数の`b`はC++26) | C++11 |


## バージョン情報マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `__STDC_VERSION_INTTYPES_H__` | `<cinttypes>`が提供するC標準ライブラリ機能のバージョン (`202311L`) | C++26 |


## バージョン
### 言語
- C++11


## 関連項目
- [`<cstdint>`](cstdint.md)
- [`<cstdio>`](cstdio.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、2進数用の書式指定マクロ (`PRIb`*N*・`PRIB`*N*・`SCNb`*N*等) と`__STDC_VERSION_INTTYPES_H__`が追加された
