# operator-=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator-=(T operand) volatile noexcept; // (1) C++11
T operator-=(T operand) noexcept;          // (2) C++11
```

## 概要
減算を行う


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 戻り値
以下と等価の式により、演算結果の値が返る：

```cpp
return fetch_sub(operand) - operand;
```
* fetch_sub[link fetch_sub.md]


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

  x -= 2;

  std::cout << x.load() << std::endl;
}
```
* x -= 2;[color ff0000]
* x.load()[link load.md]

#### 出力
```
1
```

### 浮動小数点数の例 (C++20)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<float> x{3.14f};

  x -= 1.25f;

  std::cout << x.load() << std::endl;
}
```
* x -= 1.25f;[color ff0000]
* x.load()[link load.md]

#### 出力
```
1.89
```

### 複数スレッドから減算する例 (C++11)
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<int> x{10};

  // 複数スレッドで減算を呼んでも、
  // 最終的に全てのスレッドでの減算が処理された値になる
  std::thread t1 {[&x] {
    x -= 1;
  }};
  std::thread t2 {[&x] {
    x -= 2;
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* x -= 1;[color ff0000]
* x -= 2;[color ff0000]
* x.load()[link load.md]

#### 出力
```
7
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0020R6 Floating Point Atomic](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0020r6.html)
    - C++20での、浮動小数点数版の追加
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
