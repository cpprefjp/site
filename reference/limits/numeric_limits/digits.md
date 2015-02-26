#digits
* limits[meta header]

```cpp
// C++03
static const int digits;

// C++11
static constexpr int digits;
```

##概要
基数 **[`radix`](./radix.md)** において表現できる桁数を示す。整数型であれば、符号ビット以外のビット数である。

浮動小数点数の場合、仮数部の桁数である。


##備考
`is_specialized == false`の場合は`0`

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ                                      |
|---------------|-----------------------------------------------------|
| `float`       | [`FLT_MANT_DIG`](/reference/cfloat/flt_mant_dig.md) |
| `double`      | [`DBL_MANT_DIG`](/reference/cfloat/dbl_mant_dig.md) |
| `long double` | [`LDBL_MANT_DIG`](/reference/cfloat/ldbl_dig.md)    |


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int i = std::numeric_limits<int>::digits;
  constexpr int d = std::numeric_limits<double>::digits;

  std::cout << i << std::endl;
  std::cout << d << std::endl;
}
```
* digits[color ff0000]

###出力例
```
31
53
```


