#cstdint
`<cstdint>`ヘッダでは、ビット数が規定された整数型の`typedef`、およびマクロを提供する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<stdint.h>`ヘッダと同じである。

##符号あり整数型

| | |
|-----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| 型 | 説明 |
| `int8_t` | 8ビット幅の符号あり整数(実装するかどうかは処理系定義) |
| `int16_t` | 16ビット幅の符号あり整数(実装するかどうかは処理系定義) |
| `int32_t` | 32ビット幅の符号あり整数(実装するかどうかは処理系定義) |
| `int64_t` | 64ビット幅の符号あり整数(実装するかどうかは処理系定義) |
| [`int_fast8_t`](./cstdint/int_fast8_t.md) | 少なくても8ビット幅を持ち、演算が高速な符号あり整数 |
| [`int_fast16_t`](./cstdint/int_fast16_t.md) | 少なくても16ビット幅を持ち、演算が高速な符号あり整数 |
| [`int_fast32_t`](./cstdint/int_fast32_t.md) | 少なくても32ビット幅を持ち、演算が高速な符号あり整数 |
| [`int_fast64_t`](./cstdint/int_fast64_t.md) | 少なくても64ビット幅を持ち、演算が高速な符号あり整数 |
| [`int_least8_t`](./cstdint/int_least8_t.md) | 少なくても8ビット幅を持つ、最小の符号あり整数 |
| [`int_least16_t`](./cstdint/int_least16_t.md) | 少なくても16ビット幅を持つ、最小の符号あり整数 |
| [`int_least32_t`](./cstdint/int_least32_t.md) | 少なくても32ビット幅を持つ、最小の符号あり整数 |
| [`int_least64_t`](./cstdint/int_least64_t.md) | 少なくても64ビット幅を持つ、最小の符号あり整数 |
| [`intmax_t`](./cstdint/intmax_t.md) | 最も大きい符号あり整数型 |
| `intptr_t` | ポインタサイズの符号あり整数型(実装するかどうかは処理系定義) |

##符号なし整数型

| | |
|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| 型 | 説明 |
| `uint8_t` | 8ビット幅の符号なし整数(実装するかどうかは処理系定義) |
| `uint16_t` | 16ビット幅の符号なし整数(実装するかどうかは処理系定義) |
| `uint32_t` | 32ビット幅の符号なし整数(実装するかどうかは処理系定義) |
| `uint64_t` | 64ビット幅の符号なし整数(実装するかどうかは処理系定義) |
| [`uint_fast8_t`](./cstdint/uint_fast8_t.md) | 少なくても8ビット幅を持ち、演算が高速な符号なし整数 |
| [`uint_fast16_t`](./cstdint/uint_fast16_t.md) | 少なくても16ビット幅を持ち、演算が高速な符号なし整数 |
| [`uint_fast32_t`](./cstdint/uint_fast32_t.md) | 少なくても32ビット幅を持ち、演算が高速な符号なし整数 |
| [`uint_fast64_t`](./cstdint/uint_fast64_t.md) | 少なくても64ビット幅を持ち、演算が高速な符号なし整数 |
| [`uint_least8_t`](./cstdint/uint_least8_t.md) | 少なくても8ビット幅を持つ、最小の符号なし整数 |
| [`uint_least16_t`](./cstdint/uint_least16_t.md) | 少なくても16ビット幅を持つ、最小の符号なし整数 |
| [`uint_least32_t`](./cstdint/uint_least32_t.md) | 少なくても32ビット幅を持つ、最小の符号なし整数 |
| [`uint_least64_t`](./cstdint/uint_least64_t.md) | 少なくても64ビット幅を持つ、最小の符号なし整数 |
| [`uintmax_t`](./cstdint/uintmax_t.md) | 最も大きい符号なし整数型 |
| `uintptr_t` | ポインタサイズの符号なし整数型(実装するかどうかは処理系定義) |


以下のマクロは、整数型の限界値を表す。これらのマクロは、`__STDC_LIMIT_MACROS`マクロが定義されている場合のみ定義される。
##符号あり整数型用の限界値マクロ

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| マクロ | 説明 |
| `INT8_MIN` | `int8_t`の最小値 |
| `INT8_MAX` | `int8_t`の最大値 |
| `INT16_MIN` | `int16_t`の最小値 |
| `INT16_MAX` | `int16_t`の最大値 |
| `INT32_MIN` | `int32_t`の最小値 |
| `INT32_MAX` | `int32_t`の最大値 |
| `INT64_MIN` | `int64_t`の最小値 |
| `INT64_MAX` | `int64_t`の最大値 |
| [`INT_FAST8_MIN`](./cstdint/int_fast8_min.md) | `int_fast8_t`の最小値 |
| [`INT_FAST8_MAX`](./cstdint/int_fast8_max.md) | `int_fast8_t`の最大値 |
| [`INT_FAST16_MIN`](./cstdint/int_fast16_min.md) | `int_fast16_t`の最小値 |
| [`INT_FAST16_MAX`](./cstdint/int_fast16_max.md) | `int_fast16_t`の最大値 |
| [`INT_FAST32_MIN`](./cstdint/int_fast32_min.md) | `int_fast32_t`の最小値 |
| [`INT_FAST32_MAX`](./cstdint/int_fast32_max.md) | `int_fast32_t`の最大値 |
| [`INT_FAST64_MIN`](./cstdint/int_fast64_min.md) | `int_fast64_t`の最小値 |
| [`INT_FAST64_MAX`](./cstdint/int_fast64_max.md) | `int_fast64_t`の最大値 |
| [`INT_LEAST8_MIN`](./cstdint/int_least8_min.md) | `int_least8_t`の最小値 |
| [`INT_LEAST8_MAX`](./cstdint/int_least8_max.md) | `int_least8_t`の最大値 |
| [`INT_LEAST16_MIN`](./cstdint/int_least16_min.md) | `int_least16_t`の最小値 |
| [`INT_LEAST16_MAX`](./cstdint/int_least16_max.md) | `int_least16_t`の最大値 |
| [`INT_LEAST32_MIN`](./cstdint/int_least32_min.md) | `int_least32_t`の最小値 |
| [`INT_LEAST32_MAX`](./cstdint/int_least32_max.md) | `int_least32_t`の最大値 |
| [`INT_LEAST64_MIN`](./cstdint/int_least64_min.md) | `int_least64_t`の最小値 |
| [`INT_LEAST64_MAX`](./cstdint/int_least64_max.md) | `int_least64_t`の最大値 |
| [`INT_MAX_MIN`](./cstdint/intmax_min.md) | `int_max_t`の最小値 |
| [`INT_MAX_MAX`](./cstdint/intmax_max.md) | `int_max_t`の最大値 |
| `INT_PTR_MIN` | `intptr_t`の最小値 |
| `INT_PTR_MAX` | `intptr_t`の最大値 |
| [`PTRDIFF_MIN`](./cstdint/ptrdiff_min.md) | [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)の最小値 |
| [`PTRDIFF_MAX`](./cstdint/ptrdiff_max.md) | [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)の最大値 |
| `SIG_ATOMIC_MIN` | `sig_atomic_t`の最小値 |
| `SIG_ATOMIC_MAX` | `sig_atomic_t`の最大値 |
| `WCHAR_MIN` | `wchar_t`の最小値 |
| `WCHAR_MAX` | `wchar_t`の最大値 |
| `WINT_MIN` | `wint_t`の最小値 |
| `WINT_MAX` | `wint_t`の最大値 |

##符号なし整数型用の限界値マクロ

| | |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| マクロ | 説明 |
| `UINT8_MIN` | `uint8_t`の最小値 |
| `UINT8_MAX` | `uint8_t`の最大値 |
| `UINT16_MIN` | `uint16_t`の最小値 |
| `UINT16_MAX` | `uint16_t`の最大値 |
| `UINT32_MIN` | `uint32_t`の最小値 |
| `UINT32_MAX` | `uint32_t`の最大値 |
| `UINT64_MIN` | `uint64_t`の最小値 |
| `UINT64_MAX` | `uint64_t`の最大値 |
| `UINT_FAST8_MIN` | `uint_fast8_t`の最小値 |
| [`UINT_FAST8_MAX`](./cstdint/uint_fast8_max.md) | `uint_fast8_t`の最大値 |
| `UINT_FAST16_MIN` | `uint_fast16_t`の最小値 |
| [`UINT_FAST16_MAX`](./cstdint/uint_fast16_max.md) | `uint_fast16_t`の最大値 |
| `UINT_FAST32_MIN` | `uint_fast32_t`の最小値 |
| [`UINT_FAST32_MAX`](./cstdint/uint_fast32_max.md) | `uint_fast32_t`の最大値 |
| `UINT_FAST64_MIN` | `uint_fast64_t`の最小値 |
| [`UINT_FAST64_MAX`](./cstdint/uint_fast64_max.md) | `uint_fast64_t`の最大値 |
| `UINT_LEAST8_MIN` | `uint_least8_t`の最小値 |
| [`UINT_LEAST8_MAX`](./cstdint/uint_least8_max.md) | `uint_least8_t`の最大値 |
| `UINT_LEAST16_MIN` | `uint_least16_t`の最小値 |
| [`UINT_LEAST16_MAX`](./cstdint/uint_least16_max.md) | `uint_least16_t`の最大値 |
| `UINT_LEAST32_MIN` | `uint_least32_t`の最小値 |
| [`UINT_LEAST32_MAX`](./cstdint/uint_least32_max.md) | `uint_least32_t`の最大値 |
| `UINT_LEAST64_MIN` | `uint_least64_t`の最小値 |
| [`UINT_LEAST64_MAX`](./cstdint/uint_least64_max.md) | `uint_least64_t`の最大値 |
| `UINT_MAX_MIN` | `uint_max_t`の最小値 |
| [`UINT_MAX_MAX`](./cstdint/uintmax_max.md) | `uint_max_t`の最大値 |
| `UINT_PTR_MIN` | `uintptr_t`の最小値 |
| `UINT_PTR_MAX` | `uintptr_t`の最大値 |
| `SIZE_MAX` | [`size_t`](/reference/cstddef/size_t.md)の最大値 |

以下のマクロは、各整数型の定数値を表す関数マクロである。例：) `int8_t x = INT8_C(1);`これらのマクロは、`__STDC_CONSTANT_MACROS`マクロが定義されている場合のみ定義される。符号あり整数型用の定数値マクロ

| | |
|------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| マクロ | 説明 |
| `INT8_C(n)` | 8ビット幅を持つ、符号あり整数型の定数値 |
| `INT16_C(n)` | 16ビット幅を持つ、符号あり整数型の定数値 |
| `INT32_C(n)` | 32ビット幅を持つ、符号あり整数型の定数値 |
| `INT64_C(n)` | 64ビット幅を持つ、符号あり整数型の定数値 |
| `INTMAX_C(n)` | 最も大きい符号あり整数型の定数値 |
符号なし整数型用の定数値マクロ

| | |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| マクロ | 説明 |
| `UINT8_C(n)` | 8ビット幅を持つ、符号なし整数型の定数値 |
| `UINT16_C(n)` | 16ビット幅を持つ、符号なし整数型の定数値 |
| `UINT32_C(n)` | 32ビット幅を持つ、符号なし整数型の定数値 |
| `UINT64_C(n)` | 64ビット幅を持つ、符号なし整数型の定数値 |
| `UINTMAX_C(n)` | 最も大きい符号なし整数型の定数値 |


##バージョン
###言語
- C++11

