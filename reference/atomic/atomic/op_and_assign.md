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
以下と�価の式により、演算結果の値が返る：

```cpp
return fetch_and(operand) & operand;
```
* fetch_and[link fetch_and.md]


## 例外
投げない


## 備考
この関数は、`atomic`クラスの整数型に対する特殊化で定義される。


## 例
### 基本的な使い方
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
* to_string()[link /reference/bitset/bitset/to_string.md]

#### 出力
```
1011
1110
1010
```

### 複数スレッドからビット複合演算を行う例 (C++14)
```cpp example
#include <iostream>
#include <atomic>
#include <thread>
#include <bitset>

int main()
{
  std::atomic<int> x{0b1111};

  // 複数スレッドでビット複合演算を呼んでも、
  // 最終的に全てのスレッドでのビット複合演算が処理された値になる
  std::thread t1 {[&x] {
    x &= 0b0111;
  }};
  std::thread t2 {[&x] {
    x &= 0b0101;
  }};

  t1.join();
  t2.join();

  int value = x.load();
  std::cout << std::bitset<4>(value).to_string() << std::endl;
}
```
* x &= 0b0111;[color ff0000]
* x &= 0b0101;[color ff0000]
* x.load()[link load.md]
* to_string()[link /reference/bitset/bitset/to_string.md]

#### 出力
```
0101
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
