# resetiosflags
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified resetiosflags(ios_base::fmtflags mask);
}
```
* unspecified[italic]

## 概要
フォーマットフラグを設定されていない状態にする。


## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と等価の効果を持つ：

```cpp
void f(std::ios_base& str, std::ios_base::fmtflags mask) {
  str.setf(std::ios_base::fmtflags(0), mask);
}
```
* std::ios_base[link /reference/ios/ios_base.md]
* setf[link /reference/ios/ios_base/setf.md]

このマニピュレータは、入力ストリームと出力ストリームのどちらに対しても適用できる。


## 例
```cpp example
#include <iostream>
#include <iomanip>

int main()
{
  const double f = 1234.56789;
  std::cout << std::scientific << f << '\n';
  std::cout << f << '\n';
  std::cout << std::resetiosflags(std::ios_base::floatfield);
  std::cout << f << '\n';
}
```
* std::resetiosflags[color ff0000]


## 出力例
```
1.234568e+03
1.234568e+03
1234.57
```

