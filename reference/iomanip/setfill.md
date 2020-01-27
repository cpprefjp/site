# setfill
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified setfill(char_type c);
}
```
* unspecified[italic]

## 概要
埋め文�を�定する。

## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と�価の効果を持つ：

```cpp
template<class charT, class traits>
void f(std::basic_ios<charT, traits>& str, charT c) {
  str.fill(c);
}
```
* std::basic_ios[link /reference/ios/basic_ios.md]
* fill[link /reference/ios/basic_ios/fill.md]

このマニピュレータは、出力ストリームにしか適用できない。

## 例
```cpp example
#include <iostream>
#include <iomanip>

int main()
{
  int i = 123;
  std::cout << std::setw(5)                      << i << std::endl;
  std::cout << std::setw(5) << std::setfill('0') << i << std::endl;
}
```
* std::setfill[color ff0000]
* std::setw[link /reference/iomanip/setw.md]

## 出力例
```
  123
00123
```

