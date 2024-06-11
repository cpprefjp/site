# operator--
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator--() volatile noexcept;             // (1) C++11
value_type operator--() volatile noexcept;    // (1) C++20

T operator--() noexcept;                      // (2) C++11
value_type operator--() noexcept;             // (2) C++20

T operator--(int) volatile noexcept;          // (3) C++11
value_type operator--(int) volatile noexcept; // (3) C++20

T operator--(int) noexcept;                   // (4) C++11
value_type operator--(int) noexcept;          // (4) C++20
```

## 概要
値をデクリメントする。

- (1) : `volatile`オブジェクトに対する前置デクリメント
- (2) : 非`volatile`オブジェクトに対する前置デクリメント
- (3) : `volatile`オブジェクトに対する後置デクリメント
- (4) : 非`volatile`オブジェクトに対する後置デクリメント


## テンプレートパラメータ制約
- (1), (3) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 戻り値
以下と等価：

- (1), (2) : [`fetch_sub`](fetch_sub.md)`(1) - 1`
- (3), (4) : [`fetch_sub`](fetch_sub.md)`(1)`


## 例外
投げない


## 備考
この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  --x;

  std::cout << x.load() << std::endl;
}
```
* --x;[color ff0000]
* x.load()[link load.md]

#### 出力
```
2
```

### 複数スレッドからデクリメントする例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<int> x{10};

  // 複数スレッドでデクリメントを呼んでも、
  // 最終的に全てのスレッドでのデクリメントが処理された値になる
  std::thread t1 {[&x] {
    --x;
  }};
  std::thread t2 {[&x] {
    --x;
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* --x;[color ff0000]
* x.load()[link load.md]

#### 出力
```
8
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 戻り値の型を`T`から`value_type`に変更
