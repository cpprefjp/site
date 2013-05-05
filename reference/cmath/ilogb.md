#ilogb
```cpp
namespace std {
  int ilogb(float);
  int ilogb(double);
  int ilogb(long double);
}
```

##概要
`ilogb(x)` は浮動小数点数 `x` の指数部を `int` として返す。
`x` が 0 のときは [`FP_ILOGB0`](/reference/cmath/fp_ilogb0.md) を、無限大のときは [`INT_MAX`](/reference/climits/int_max.md) を、`NaN`のときは [`FP_ILOGBNAN`](/reference/cmath/fp_ilogbnan.md) を返す。
