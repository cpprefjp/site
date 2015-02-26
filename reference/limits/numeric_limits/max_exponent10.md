#max_exponent10
* limits[meta header]
* std[meta namespace]

```cpp
// C++03
static const int max_exponent10;

// C++11
static constexpr int max_exponent10;
```

##概要
浮動小数点数型において、型`T`の指数下限値を得る。  
基数10を`max_exponent`の値で累乗した値が、型`T`で表現可能な正規化された値となる最大の正の値。  
浮動小数点数型以外は0になる。  

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ                                            |
|---------------|-----------------------------------------------------------|
| `float`       | [`FLT_MAX_10_EXP`](/reference/cfloat/flt_max_10_exp.md)   |
| `double`      | [`DBL_MAX_10_EXP`](/reference/cfloat/dbl_max_10_exp.md)   |
| `long double` | [`LDBL_MAX_10_EXP`](/reference/cfloat/ldbl_max_10_exp.md) |


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int f = std::numeric_limits<float>::max_exponent10;
  constexpr int d = std::numeric_limits<double>::max_exponent10;

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* max_exponent10[color ff0000]

###出力例
```
float : 38
double : 308
```

##参照
* [takagi.in - 標準C++辞典 - `<cfloat>`ヘッダ](http://takagi.in/modules/bwiki/index.php?%A1%E3cfloat%A1%E4%A5%D8%A5%C3%A5%C0)
* [`numeric_limits::min_exponent`](./min_exponent.md)
* [`numeric_limits::min_exponent10`](./min_exponent10.md)
* [`numeric_limits::max_exponent`](./max_exponent.md)

