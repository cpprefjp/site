# climits
* climits[meta header]

`<climits>`ヘッダでは、整数型に関するマクロが定義されている。これは、C言語の標準ライブラリ`<limits.h>`と同じである。

本ヘッダはフリースタンディング環境でも提供される。

## 最小値

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|------------------------|-------|
| [`SCHAR_MIN`](climits/schar_min.md) | `signed char` の最小値 | |
| [`CHAR_MIN`](climits/char_min.md)   | `char` の最小値        | |
| [`SHRT_MIN`](climits/shrt_min.md)   | `short` の最小値       | |
| [`INT_MIN`](climits/int_min.md)     | `int` の最小値         | |
| [`LONG_MIN`](climits/long_min.md)   | `long` の最小値        | |
| [`LLONG_MIN`](climits/llong_min.md) | `long long` の最小値   | C++11 |


## 最大値

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|-----------------------------|-------|
| [`UCHAR_MAX`](climits/uchar_max.md)   | `unsigned char` の最大値  | |
| [`SCHAR_MAX`](climits/schar_max.md)   | `signed char` の最大値    | |
| [`CHAR_MAX`](climits/char_max.md)     | `char` の最大値           | |
| [`USHRT_MAX`](climits/ushrt_max.md)   | `unsigned short` の最大値 | |
| [`SHRT_MAX`](climits/shrt_max.md)     | `short` の最大値          | |
| [`UINT_MAX`](climits/uint_max.md)     | `unsigned` の最大値       | |
| [`INT_MAX`](climits/int_max.md)       | `int` の最大値            | |
| [`ULONG_MAX`](climits/ulong_max.md)   | `unsigned long` の最大値  | |
| [`LONG_MAX`](climits/long_max.md)     | `long` の最大値           | |
| [`ULLONG_MAX`](climits/ullong_max.md) | `unsigned long long` の最大値 | C++11 |
| [`LLONG_MAX`](climits/llong_max.md)   | `long long` の最大値 | C++11 |


## 幅

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|------------------------------------|-------|
| [`BOOL_WIDTH`](climits/bool_width.md)     | `bool` の幅 (値ビット数)              | C++26 |
| [`CHAR_WIDTH`](climits/char_width.md)     | `char` の幅 (値ビット数)             | C++26 |
| [`SCHAR_WIDTH`](climits/schar_width.md)   | `signed char` の幅 (値ビット数)      | C++26 |
| [`UCHAR_WIDTH`](climits/uchar_width.md)   | `unsigned char` の幅 (値ビット数)    | C++26 |
| [`SHRT_WIDTH`](climits/shrt_width.md)     | `short` の幅 (値ビット数)            | C++26 |
| [`USHRT_WIDTH`](climits/ushrt_width.md)   | `unsigned short` の幅 (値ビット数)   | C++26 |
| [`INT_WIDTH`](climits/int_width.md)       | `int` の幅 (値ビット数)              | C++26 |
| [`UINT_WIDTH`](climits/uint_width.md)     | `unsigned int` の幅 (値ビット数)     | C++26 |
| [`LONG_WIDTH`](climits/long_width.md)     | `long` の幅 (値ビット数)             | C++26 |
| [`ULONG_WIDTH`](climits/ulong_width.md)   | `unsigned long` の幅 (値ビット数)    | C++26 |
| [`LLONG_WIDTH`](climits/llong_width.md)   | `long long` の幅 (値ビット数)        | C++26 |
| [`ULLONG_WIDTH`](climits/ullong_width.md) | `unsigned long long` の幅 (値ビット数) | C++26 |


## その他

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------|-------|
| [`CHAR_BIT`](climits/char_bit.md)     | 1バイトのビット数          | |
| [`MB_LEN_MAX`](climits/mb_len_max.md) | マルチバイト文字のバイト数 | |

なお、ビット精度整数型の最大幅を表す`BITINT_MAXWIDTH`は、C++では定義されない。


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、各整数型の幅を表すマクロが追加された
