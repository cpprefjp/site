# setbase
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unspecified setbase(int base);
}
```
* unspecified[italic]

## 概要
基数を�定する。ただし、`ios_base::oct`, `ios_base::dec`, `ios_base::hex`のいずれにも対応しない値が来た場合、フォーマットフラグはリセットされる。

## 効果
このマニピュレータをストリームオブジェクトに適用することにより、以下の関数と�価の効果を持つ：

```cpp
void f(std::ios_base& str, int base) {
  str.setf(base == 8  ? std::ios_base::oct :
           base == 10 ? std::ios_base::dec :
           base == 16 ? std::ios_base::hex :
           std::ios_base::fmtflags(0), std::ios_base::basefield);
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
  unsigned int i = 0xDEADBEEF;
  std::cout << std::setbase(16) << i << std::endl;
  std::cout << std::setbase(10) << i << std::endl;
  std::cout << std::setbase(8)  << i << std::endl;
  std::cout << std::setbase(2)  << i << std::endl;
}
```
* std::setbase[color ff0000]

## 出力例
```
deadbeef
3735928559
33653337357
3735928559
```


