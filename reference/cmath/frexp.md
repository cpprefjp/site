#frexp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float frexp(float value, int* exp);
  double frexp(double value, int* exp);
  long double frexp(long double value, int* exp);

  float frexpf(float value, int* exp);
  long double frexpl(long double value, int* exp);

  Integral frexp(Integral value, int* exp);
}
```
* Integral[italic]

##概要
`frexp`関数 (fraction and exponent)は、浮動小数点数`value`を、仮数部と 2 の累乗へ分解する。

この関数は、与えられた浮動小数点数`value`を仮数部と指数部に分解し、仮数部を戻り値で返し、指数を`exp`に書き込んで返す。


##戻り値
パラメータ`value`が浮動小数点数ではない、もしくは2の乗数が`int`の範囲外である場合、戻り値は未規定。そうでない場合、戻り値`x`は範囲`[1/2, 1)`もしくはゼロの大きさを持ち、`value`は<code>x*2<sup>exp</sup></code>と等しくなる。`value`がゼロの場合は、戻り値と`exp`に書き込む値はどちらもゼロとなる。


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  double value = 48.0;

  int exp = 0;
  double x = std::frexp(value, &exp);

  std::cout << value << " = " << x << "*2^" << exp << std::endl;
}
```
* std::frexp[color ff0000]

###出力
```
48 = 0.75*2^6
```

###備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上

