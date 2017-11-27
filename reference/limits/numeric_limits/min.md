# min
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
static T min() throw();            // C++03
static constexpr T min() noexcept; // C++11
```

## 概要
型ごとの値の最小値を取得する。


## 戻り値
指定された型の最小値

浮動小数点型については正の正規化数のうち最小のものを返す。負の最小値が必要な場合は、[`lowest()`](lowest.md)を使用すること


## 備考
`is_specialized == false`の場合は`T()`が返される。

対応するマクロを次の表に挙げる。

| 型                                                     | 対応するマクロ |
|--------------------------------------------------------|------------------------------------------------|
| `signed char`                                          | [`SCHAR_MIN`](/reference/climits/schar_min.md) |
| `char`                                                 | [`CHAR_MIN`](/reference/climits/char_min.md) |
| `short`                                                | [`SHRT_MIN`](/reference/climits/shrt_min.md) |
| `int`                                                  | [`INT_MIN`](/reference/climits/int_min.md) |
| `long`                                                 | [`LONG_MIN`](/reference/climits/long_min.md) |
| `long long`                                            | [`LLONG_MIN`](/reference/climits/llong_min.md) |
| [`int8_t`](/reference/cstdint/int8_t.md)               | [`INT8_MIN`](/reference/cstdint/int8_min.md) |
| [`int16_t`](/reference/cstdint/int16_t.md)             | [`INT16_MIN`](/reference/cstdint/int16_min.md) |
| [`int32_t`](/reference/cstdint/int32_t.md)             | [`INT32_MIN`](/reference/cstdint/int32_min.md) |
| [`int64_t`](/reference/cstdint/int64_t.md)             | [`INT64_MIN`](/reference/cstdint/int64_min.md) |
| [`int_fast8_t`](/reference/cstdint/int_fast8_t.md)     | [`INT_FAST8_MIN`](/reference/cstdint/int_fast8_min.md) |
| [`int_fast16_t`](/reference/cstdint/int_fast16_t.md)   | [`INT_FAST16_MIN`](/reference/cstdint/int_fast16_min.md) |
| [`int_fast32_t`](/reference/cstdint/int_fast32_t.md)   | [`INT_FAST32_MIN`](/reference/cstdint/int_fast32_min.md) |
| [`int_fast64_t`](/reference/cstdint/int_fast64_t.md)   | [`INT_FAST64_MIN`](/reference/cstdint/int_fast64_min.md) |
| [`int_least8_t`](/reference/cstdint/int_least8_t.md)   | [`INT_LEAST8_MIN`](/reference/cstdint/int_least8_min.md) |
| [`int_least16_t`](/reference/cstdint/int_least32_t.md) | [`INT_LEAST16_MIN`](/reference/cstdint/int_least16_min.md) |
| [`int_least32_t`](/reference/cstdint/int_least32_t.md) | [`INT_LEAST32_MIN`](/reference/cstdint/int_least32_min.md) |
| [`int_least64_t`](/reference/cstdint/int_least64_t.md) | [`INT_LEAST64_MIN`](/reference/cstdint/int_least64_min.md) |
| [`intmax_t`](/reference/cstdint/intmax_t.md)           | [`INTMAX_MIN`](/reference/cstdint/intmax_min.md) |
| [`intptr_t`](/reference/cstdint/intptr_t.md)           | [`INTPTR_MIN`](/reference/cstdint/intptr_min.md) |
| [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)         | [`PTRDIFF_MIN`](/reference/cstdint/ptrdiff_min.md) |
| `sig_atomic_t`                                         | [`SIG_ATOMIC_MIN`](/reference/cstdint/sig_atomic_min.md) |
| `wchar_t`                                              | [`WCHAR_MIN`](/reference/cstdint/wchar_min.md) |
| `wint_t`                                               | [`WINT_MIN`](/reference/cstdint/wint_min.md) |
| `float`                                                | [`FLT_MIN`](/reference/cfloat/flt_min.md) |
| `double`                                               | [`DBL_MIN`](/reference/cfloat/dbl_min.md) |
| `long double`                                          | [`LDBL_MIN`](/reference/cfloat/ldbl_min.md) |


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr int i = std::numeric_limits<int>::min();
  constexpr double d = std::numeric_limits<double>::min();

  std::cout << i << std::endl;
  std::cout << d << std::endl;
}
```
* min()[color ff0000]

### 出力例
```
-2147483648
2.22507e-308
```


## 関連項目
- [`std::numeric_limits::lowest()`](lowest.md)
- [`std::numeric_limits::max()`](max.md)
