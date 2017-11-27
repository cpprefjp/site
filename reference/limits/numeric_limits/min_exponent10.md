# min_exponent10
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const int min_exponent10;

// C++11
static constexpr int min_exponent10;
```

## 概要
浮動小数点数型において、型`T`の指数下限値を得る。  
基数10を`min_exponent`の値で累乗した値が、型`T`で表現可能な正規化された値となる最小の負の値。  
浮動小数点数型以外は0になる。  

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ                                            |
|---------------|-----------------------------------------------------------|
| `float`       | [`FLT_MIN_10_EXP`](/reference/cfloat/flt_min_10_exp.md)   |
| `double`      | [`DBL_MIN_10_EXP`](/reference/cfloat/dbl_min_10_exp.md)   |
| `long double` | [`LDBL_MIN_10_EXP`](/reference/cfloat/ldbl_min_10_exp.md) |


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr int f = std::numeric_limits<float>::min_exponent10;
  constexpr int d = std::numeric_limits<double>::min_exponent10;

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* min_exponent10[color ff0000]

### 出力
```
float : -37
double : -307
```

## 参照
* [takagi.in - 標準C++辞典 - `<cfloat>`ヘッダ](http://takagi.in/modules/bwiki/index.php?%A1%E3cfloat%A1%E4%A5%D8%A5%C3%A5%C0)
* [`numeric_limits::min_exponent`](min_exponent.md)
* [`numeric_limits::max_exponent`](max_exponent.md)
* [`numeric_limits::max_exponent10`](max_exponent10.md)

