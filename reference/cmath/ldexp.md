# ldexp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float ldexp(float x, int exp);
  double ldexp(double x, int exp);
  long double ldexp(long double x, int exp);

  double ldexp(Integral x, int exp);            // C++11 から

  float ldexpf(float x, int exp);               // C++17 から
  long double ldexpl(long double x, int exp);   // C++17 から
}
```
* Integral[italic]

## 概要
`ldexp`関数 (load exponent)は、`x`に2の`exp`乗を掛けた値を計算する。

この関数は、ビット操作をすることなく、仮数部と指数部を指定して浮動小数点の値を作り出すために使用できる。第1引数`x`に仮数部、第2引数`exp`に指数部の値をそれぞれ�定することで、それらの要素を持つ浮動小数点数が返される。

この関数と反対に、[`std::frexp()`](frexp.md)関数を使用することで、浮動小数点数を仮数部と指数部に分解できる。


## 戻り値
<code>x * 2<sup>exp</sup></code>

オーバーフ�ーエラー、アンダーフ�ーエラーが発生する可能性がある。


## 備考
- オーバーフ�ーエラー、アンダーフ�ーエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、かつ、基数が 2 の場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`radix`](../limits/numeric_limits/radix.md)`() == 2`）、[`scalbn`](scalbn.md)`(x, exp)` と�価である。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cmath>

int main()
{
  // 3.0 * (2^4)
  double result = std::ldexp(3.0, 4);
  std::cout << result << std::endl;

  // 円周率
  double pi = std::ldexp(std::acos(0.0), 1);
  std::cout << std::setprecision(8) << pi << std::endl;
}
```
* std::ldexp[color ff0000]
* std::acos[link acos.md]
* std::setprecision[link /reference/iomanip/setprecision.md]

### 出力
```
48
3.1415927
```

### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  double ldexp(double x, int exp)
  {
    return x * std::pow(2.0, exp);
  }

  float ldexp(float x, int exp)
  {
    return x * std::pow(2.0f, exp);
  }

  long double ldexp(long double x, int exp)
  {
    return x * std::pow(2.0L, exp);
  }
}
```
* std::pow[link pow.md]
