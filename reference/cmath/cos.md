#cos
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float cos(float x);

  double cos(double x);

  long double cos(long double x);

  double cos(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の余弦（コサイン）を求める。


##戻り値
引数 `x` の余弦を返す(`x`の単位はラジアン)。


##備考
- $$ f(x) = \cos x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `1` となる。
	- `x = ±∞` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。


##例
###基本的な使い方
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.141592653589793;
  std::cout << std::fixed;
  std::cout << "cos(0.0)  = " << std::cos(0.0) << std::endl;
  std::cout << "cos(pi/6) = " << std::cos(pi/6) << std::endl;
  std::cout << "cos(pi/4) = " << std::cos(pi/4) << std::endl;
  std::cout << "cos(pi/3) = " << std::cos(pi/3) << std::endl;
  std::cout << "cos(pi/2) = " << std::cos(pi/2) << std::endl;
  std::cout << "cos(pi)   = " << std::cos(pi) << std::endl;
}
```
* <cmath>[link ../cmath.md]
* std::cos[color ff0000]
* std::fixed[link ../ios/fixed.md]

####出力例
```
cos(0.0)  = 1.000000
cos(pi/6) = 0.866025
cos(pi/4) = 0.707107
cos(pi/3) = 0.500000
cos(pi/2) = 0.000000
cos(pi)   = -1.000000
```

###値の遷移
```cpp
#include <fstream>
#include <cmath>

int main()
{
  static const double pi = 3.141592653589793;
  std::ofstream file("cos.tsv");
  for (double x = -3.0*pi; x <= 3.0*pi; x += 0.1) {
      file << x << "\t" << std::cos(x) << "\n";
  }
}
```

この例で得られた値の遷移は、以下の図のようになる：

![](https://raw.githubusercontent.com/cpprefjp/image/master/reference/cmath/cos/cos.png)

この値の遷移は、[`sin()`](sin.md)関数の[正弦波, サインカーブ](https://ja.wikipedia.org/wiki/%E6%AD%A3%E5%BC%A6%E6%B3%A2)をπ/2 (90°)だけずらしたものとなっている。引数が0のときに結果が1になるため、値の遷移として使用する場合には、[`sin()`](sin.md)関数よりも`cos()`関数の方が使いやすい場合がある。


##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \cos x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n)!} x^{2n} \quad \mathrm{for~all} \; x $$
