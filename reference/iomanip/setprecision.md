# setprecision
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified setprecision(int n);
}
```
* unspecified[italic]

## 概要
浮動小数点数を出力する精度を設定する。


## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と等価の効果を持つ：

```cpp
void f(std::ios_base& str, int n) {
  str.precision(n);
}
```
* std::ios_base[link /reference/ios/ios_base.md]
* precision[link /reference/ios/ios_base/precision.md]

このマニピュレータは、入力ストリームと出力ストリームのどちらに対しても適用できる。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <limits>

int main()
{
  constexpr int d = std::numeric_limits<float>::max_digits10;
  std::cout << d << std::endl;

  float f = 3.145900F;
  std::cout << std::setprecision(d) << std::scientific << f << std::endl;
}
```
* std::setprecision[color ff0000]
* max_digits10[link /reference/limits/numeric_limits/max_digits10.md]
* std::scientific[link /reference/ios/scientific.md]

## 出力例
```
9
3.145900011e+00
```

## 小数点以下の出力桁数を指定する例
```cpp example
#include <iostream>
#include <iomanip>
#include <limits>

int main()
{
  float f = 3.145900F;

  // デフォルトは整数部も含めた桁数指定
  std::cout << std::setprecision(3) << f << std::endl;
  // std::fixedを同時に使用することで小数点以下の桁数指定になる
  std::cout << std::fixed << std::setprecision(3) << f << std::endl;
}
```
* std::setprecision[color ff0000]
* std::fixed[link /reference/ios/fixed.md]

## 出力例
```
3.15
3.146
```
