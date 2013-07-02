#climits
`<climits>`ヘッダでは、整数型に関するマクロが定義されている。これは、C言語の標準ライブラリ`<limits.h>`と同じである。


##最小値

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|------------------------|-------|
| [`SCHAR_MIN`](./climits/schar_min.md) | `signed char` の最小値 | |
| [`CHAR_MIN`](./climits/char_min.md)   | `char` の最小値        | |
| [`SHRT_MIN`](./climits/shrt_min.md)   | `short` の最小値       | |
| [`INT_MIN`](./climits/int_min.md)     | `int` の最小値         | |
| [`LONG_MIN`](./climits/long_min.md)   | `long` の最小値        | |
| [`LLONG_MIN`](./climits/llong_min.md) | `long long` の最小値   | C++11 |


##最大値

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|-----------------------------|-------|
| [`UCHAR_MAX`](./climits/uchar_max.md)   | `unsigned char` の最大値  | |
| [`SCHAR_MAX`](./climits/schar_max.md)   | `signed char` の最大値    | |
| [`CHAR_MAX`](./climits/char_max.md)     | `char` の最大値           | |
| [`USHRT_MAX`](./climits/ushrt_max.md)   | `unsigned short` の最大値 | |
| [`SHRT_MAX`](./climits/shrt_max.md)     | `short` の最大値          | |
| [`UINT_MAX`](./climits/uint_max.md)     | `unsigned` の最大値       | |
| [`INT_MAX`](./climits/int_max.md)       | `int` の最大値            | |
| [`ULONG_MAX`](./climits/ulong_max.md)   | `unsigned long` の最大値  | |
| [`LONG_MAX`](./climits/long_max.md)     | `long` の最大値           | |
| [`ULLONG_MAX`](./climits/ullong_max.md) | `unsigned long long` の最大値 | C++11 |
| [`LLONG_MAX`](./climits/llong_max.md)   | `long long` の最大値 | C++11 |


##その他

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------|-------|
| [`CHAR_BIT`](./climits/char_bit.md)     | 1バイトのビット数          | |
| [`MB_LEN_MAX`](./climits/mb_len_max.md) | マルチバイト文字のバイト数 | |

