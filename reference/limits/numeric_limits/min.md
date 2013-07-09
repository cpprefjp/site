#min
```cpp
// C++03
static T min() throw();

// C++11
static constexpr T min() noexcept;
```

##概要
型ごとの値の最小値を取得する


##戻り値
指定された型の最小値

浮動小数点型については正の正規化数のうち最小のものを返す。


##備考
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
| `int8_t`                                               | `INT8_MIN` |
| `int16_t`                                              | `INT16_MIN` |
| `int32_t`                                              | `INT32_MIN` |
| `int64_t`                                              | `INT64_MIN` |
| [`int_fast8_t`](/reference/cstdint/int_fast8_t.md)     | [`INT_FAST8_MIN`](/reference/cstdint/int_fast8_min.md) |
| [`int_fast16_t`](/reference/cstdint/int_fast16_t.md)   | [`INT_FAST16_MIN`](/reference/cstdint/int_fast16_min.md) |
| [`int_fast32_t`](/reference/cstdint/int_fast32_t.md)   | [`INT_FAST32_MIN`](/reference/cstdint/int_fast32_min.md) |
| [`int_fast64_t`](/reference/cstdint/int_fast64_t.md)   | [`INT_FAST64_MIN`](/reference/cstdint/int_fast64_min.md) |
| [`int_least8_t`](/reference/cstdint/int_least8_t.md)   | [`INT_LEAST8_MIN`](/reference/cstdint/int_least8_min.md) |
| [`int_least16_t`](/reference/cstdint/int_least32_t.md) | [`INT_LEAST16_MIN`](/reference/cstdint/int_least16_min.md) |
| [`int_least32_t`](/reference/cstdint/int_least32_t.md) | [`INT_LEAST32_MIN`](/reference/cstdint/int_least32_min.md) |
| [`int_least64_t`](/reference/cstdint/int_least64_t.md) | [`INT_LEAST64_MIN`](/reference/cstdint/int_least64_min.md) |
| [`intmax_t`](/reference/cstdint/intmax_t.md)           | [`INTMAX_MIN`](/reference/cstdint/intmax_min.md) |
| `intptr_t`                                             | `INTPTR_MIN` |
| [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)         | [`PTRDIFF_MIN`](/reference/cstdint/ptrdiff_min.md) |
| `sig_atomic_t`                                         | `SIG_ATOMIC_MIN` |
| `wchar_t`                                              | `WCHAR_MIN` |
| `wint_t`                                               | `WINT_MIN` |
| `float`                                                | [`FLT_MIN`](/reference/cfloat/flt_min.md) |
| `double`                                               | [`DBL_MIN`](/reference/cfloat/dbl_min.md) |
| `long double`                                          | [`LDBL_MIN`](/reference/cfloat/ldbl_min.md) |


##例
```cpp
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
* min[color ff0000]

###出力例
```
-2147483648
2.22507e-308
```


