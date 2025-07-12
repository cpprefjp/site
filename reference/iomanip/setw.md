# setw
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified setw(int n);
}
```
* unspecified[italic]

## 概要
フィールドの幅を設定する。


## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と等価の効果を持つ：

```cpp
void f(std::ios_base& str, int n) {
  str.width(n);
}
```
* std::ios_base[link /reference/ios/ios_base.md]
* width[link /reference/ios/ios_base/width.md]

このマニピュレータは、入力ストリームと出力ストリームのどちらに対しても適用できる。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <iomanip>
#include <string>

int main()
{
  int i = 123;
  std::cout << std::setw(5) << i << std::endl;
  std::cout << i << std::endl;

  std::istringstream iss("abcdef");

  std::string s;
  iss >> std::setw(3) >> s;
  std::cout << s << std::endl;
}
```
* std::setw[color ff0000]


## 出力例
```
  123
123
abc
```
