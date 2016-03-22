#max
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
// C++03
static T max() throw();

// C++11
static constexpr T max() noexcept;
```

##概要
型`T`の値の最大値を取得する


##戻り値
指定された型の有限値のうち最大のもの。  
浮動小数点数の場合、無限大やNaNではない。


##例外
投げない


##備考
`is_specialized == false`の場合は`T()`が返される。  
C++03バージョンは`constexpr`ではないため、非定数式となる。  

対応するマクロを次の表に挙げる。

| 型 | 対応するマクロ |
|----------------------------------------------------------|------------------------------------------------|
| `unsigned char`                                          | [`UCHAR_MAX`](/reference/climits/uchar_max.md) |
| `signed char`                                            | [`SCHAR_MAX`](/reference/climits/schar_max.md) |
| `char`                                                   | [`CHAR_MAX`](/reference/climits/char_max.md) |
| `unsigned short`                                         | [`USHRT_MAX`](/reference/climits/ushrt_max.md) |
| `short`                                                  | [`SHRT_MAX`](/reference/climits/shrt_max.md) |
| `unsigned`                                               | [`UINT_MAX`](/reference/climits/uint_max.md) |
| `int`                                                    | [`INT_MAX`](/reference/climits/int_max.md) |
| `unsigned long`                                          | [`ULONG_MAX`](/reference/climits/ulong_max.md) |
| `long`                                                   | [`LONG_MAX`](/reference/climits/long_max.md) |
| `unsigned long long`                                     | [`ULLONG_MAX`](/reference/climits/ullong_max.md) |
| `long long`                                              | [`LLONG_MAX`](/reference/climits/llong_max.md) |
| [`uint8_t`](/reference/cstdint/uint8_t.md)               | [`UINT8_MAX`](/reference/cstdint/uint8_max.md) |
| [`int8_t`](/reference/cstdint/int8_t.md)                 | [`INT8_MAX`](/reference/cstdint/int8_max.md) |
| [`uint16_t`](/reference/cstdint/uint16_t.md)             | [`UINT16_MAX`](/reference/cstdint/uint16_max.md) |
| [`int16_t`](/reference/cstdint/int16_t.md)               | [`INT16_MAX`](/reference/cstdint/int16_max.md) |
| [`uint32_t`](/reference/cstdint/uint32_t.md)             | [`UINT32_MAX`](/reference/cstdint/uint32_max.md) |
| [`int32_t`](/reference/cstdint/int32_t.md)               | [`INT32_MAX`](/reference/cstdint/int32_max.md) |
| [`uint64_t`](/reference/cstdint/uint64_t.md)             | [`UINT64_MAX`](/reference/cstdint/uint64_max.md) |
| [`int64_t`](/reference/cstdint/int64_t.md)               | [`INT64_MAX`](/reference/cstdint/int64_max.md) |
| [`uint_fast8_t`](/reference/cstdint/uint_fast8_t.md)     | [`UINT_FAST8_MAX`](/reference/cstdint/uint_fast8_max.md) |
| [`int_fast8_t`](/reference/cstdint/int_fast8_t.md)       | [`INT_FAST8_MAX`](/reference/cstdint/int_fast8_max.md) |
| [`uint_fast16_t`](/reference/cstdint/uint_fast16_t.md)   | [`UINT_FAST16_MAX`](/reference/cstdint/uint_fast16_max.md) |
| [`int_fast16_t`](/reference/cstdint/int_fast16_t.md)     | [`INT_FAST16_MAX`](/reference/cstdint/int_fast16_max.md) |
| [`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)   | [`UINT_FAST32_MAX`](/reference/cstdint/uint_fast32_max.md) |
| [`int_fast32_t`](/reference/cstdint/int_fast32_t.md)     | [`INT_FAST32_MAX`](/reference/cstdint/int_fast32_max.md) |
| [`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)   | [`UINT_FAST64_MAX`](/reference/cstdint/uint_fast64_max.md) |
| [`int_fast64_t`](/reference/cstdint/int_fast64_t.md)     | [`INT_FAST64_MAX`](/reference/cstdint/int_fast64_max.md) |
| [`uint_least8_t`](/reference/cstdint/uint_least8_t.md)   | [`UINT_LEAST8_MAX`](/reference/cstdint/uint_least8_max.md) |
| [`int_least8_t`](/reference/cstdint/int_least8_t.md)     | [`INT_LEAST8_MAX`](/reference/cstdint/int_least8_max.md) |
| [`uint_least16_t`](/reference/cstdint/uint_least16_t.md) | [`UINT_LEAST16_MAX`](/reference/cstdint/uint_least16_max.md) |
| [`int_least16_t`](/reference/cstdint/int_least16_t.md)   | [`INT_LEAST16_MAX`](/reference/cstdint/int_least16_max.md) |
| [`uint_least32_t`](/reference/cstdint/uint_least32_t.md) | [`UINT_LEAST32_MAX`](/reference/cstdint/uint_least32_max.md) |
| [`int_least32_t`](/reference/cstdint/int_least32_t.md)   | [`INT_LEAST32_MAX`](/reference/cstdint/int_least32_max.md) |
| [`uint_least64_t`](/reference/cstdint/uint_least64_t.md) | [`UINT_LEAST64_MAX`](/reference/cstdint/uint_least64_max.md) |
| [`int_least64_t`](/reference/cstdint/int_least64_t.md)   | [`INT_LEAST64_MAX`](/reference/cstdint/int_least64_max.md) |
| [`uintmax_t`](/reference/cstdint/uintmax_t.md)           | [`UINTMAX_MAX`](/reference/cstdint/uintmax_max.md) |
| [`intmax_t`](/reference/cstdint/intmax_t.md)             | [`INTMAX_MAX`](/reference/cstdint/intmax_max.md) |
| [`uintptr_t`](/reference/cstdint/uintptr_t.md)           | [`UINTPTR_MAX`](/reference/cstdint/uintptr_max.md) |
| [`intptr_t`](/reference/cstdint/intptr_t.md)             | [`INTPTR_MAX`](/reference/cstdint/intptr_max.md) |
| [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)           | [`PTRDIFF_MAX`](/reference/cstdint/ptrdiff_max.md) |
| `sig_atomic_t`                                           | `SIG_ATOMIC_MAX` |
| `wchar_t`                                                | [`WCHAR_MAX`](/reference/cstdint/wchar_max.md) |
| `wint_t`                                                 | [`WINT_MAX`](/reference/cstdint/wchar_max.md) |
| [`size_t`](/reference/cstddef/size_t.md)                 | [`SIZE_MAX`](/reference/cstdint/size_max.md) |
| `float`                                                  | [`FLT_MAX`](/reference/cfloat/flt_max.md) |
| `double`                                                 | [`DBL_MAX`](/reference/cfloat/dbl_max.md) |
| `long double`                                            | [`LDBL_MAX`](/reference/cfloat/ldbl_max.md) |


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int i = std::numeric_limits<int>::max();
  constexpr double d = std::numeric_limits<double>::max();

  std::cout << i << std::endl;
  std::cout << d << std::endl;
}
```
* max[color ff0000]

###出力例
```
2147483647
1.79769e+308
```


