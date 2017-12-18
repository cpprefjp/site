# operator&=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator&=(T operand) volatile noexcept;
T operator&=(T operand) noexcept;
```

## 概要
AND演算を行う


## 戻り値
[`fetch_and`](/reference/atomic/atomic/fetch_and.md)`(operand) & operand`


## 例外
投げない


## 備考
この関数は、`atomic`クラスの整数型に対する特殊化で定義される。


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <bitset>

int main()
{
  int a = 0x0b;
  int b = 0x0e;

  std::atomic<int> x(a);

  x &= b;

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* x &= b;[color ff0000]
* x.load()[link load.md]
* to_string()[link /reference/bitset/to_string.md]

### 出力
```
1011
1110
1010
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照


