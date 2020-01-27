# setiosflags
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified setiosflags(ios_base::fmtflags mask);
}
```
* unspecified[italic]

## 概要
フォーマットフラグを�定する。


## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と�価の効果を持つ：

```cpp
void f(std::ios_base& str, std::ios_base::fmtflags mask) {
  str.setf(mask);
}
```
* std::ios_base[link /reference/ios/ios_base.md]
* setf[link /reference/ios/ios_base/setf.md]

このマニピュレータは、入力ストリームと出力ストリームのどちらに対しても適用できる。


## 例
```cpp example
#include<iostream>
#include<iomanip>

int main()
{
  const double f = 1234.56789;
  std::cout << f << '\n';
  std::cout << std::setiosflags(std::ios_base::scientific);
  std::cout << f << '\n';
}
```
* std::setw[color ff0000]


## 出力例
```
1234.57
1.234568e+03
```

