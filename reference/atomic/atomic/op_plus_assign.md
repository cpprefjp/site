# operator+=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator+=(T operand) volatile noexcept;
T operator+=(T operand) noexcept;
```

## 概要
加算を行う


## 戻り値
以下と�価の式により、演算結果の値が返る：

```cpp
return fetch_add(operand) + operand;
```
* fetch_add[link fetch_add.md]


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型 (C++20)、ポインタに対する特殊化で定義される
- 整数型
    - 符号付き整数型に対しては、2の補数表現による演算が行われ、未定義動作はない
- 浮動小数点数型 (C++20)
    - 演算結果が、その型で表現できない値であった場合、結果は未規定値になる。ただしその操作によって未定義動作は起こらない
    - 浮動小数点数型に対する操作は[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<floating-point>`トレイトに準拠する
    - 浮動小数点数型に対するアトミック操作の浮動小数点環境は、呼び出しスレッドの浮動小数点環境とは異なる可能性がある
- ポインタ型
    - 結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない


## 例
### 整数の例 (C++11)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  x += 2;

  std::cout << x.load() << std::endl;
}
```
* x += 2;[color ff0000]
* x.load()[link load.md]

#### 出力
```
5
```

### 浮動小数点数の例 (C++20)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<float> x{3.14f};

  x += 1.25f;

  std::cout << x.load() << std::endl;
}
```
* x += 1.25f;[color ff0000]
* x.load()[link load.md]

#### 出力
```
4.39
```

### 複数スレッドから加算する例 (C++11)
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<int> x{0};

  // 複数スレッドで加算を呼んでも、
  // 最終的に全てのスレッドでの加算が処理された値になる
  std::thread t1 {[&x] {
    x += 1;
  }};
  std::thread t2 {[&x] {
    x += 2;
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* x += 1;[color ff0000]
* x += 2;[color ff0000]
* x.load()[link load.md]

#### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0020R6 Floating Point Atomic](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0020r6.html)
