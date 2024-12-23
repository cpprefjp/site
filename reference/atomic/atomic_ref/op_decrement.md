# operator--
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
value_type
  operator--() const noexcept;    // (1) C++20
constexpr value_type
  operator--() const noexcept;    // (1) C++26

value_type
  operator--(int) const noexcept; // (2) C++20
constexpr value_type
  operator--(int) const noexcept; // (2) C++26
```

## 概要
値をデクリメントする。

- (1) : 前置デクリメント
- (2) : 後置デクリメント


## テンプレートパラメータ制約
- ポインタに対する特殊化
    - C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 戻り値
以下と等価：

- (1) : [`fetch_sub`](fetch_sub.md)`(1) - 1`
- (2) : [`fetch_sub`](fetch_sub.md)`(1)`


## 例外
投げない


## 備考
この関数は、`atomic_ref`クラスの整数型およびポインタに対する特殊化で定義される。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 3;
  std::atomic_ref<int> x{value};

  --x;

  std::cout << value << std::endl;
}
```
* --x;[color ff0000]

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
  int value = 10;

  // 複数スレッドでデクリメントを呼んでも、
  // 最終的に全てのスレッドでのデクリメントが処理された値になる
  std::thread t1 {[&value] {
    --std::atomic_ref{value};
  }};
  std::thread t2 {[&value] {
    --std::atomic_ref{value};
  }};

  t1.join();
  t2.join();

  std::cout << value << std::endl;
}
```

#### 出力
```
8
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 戻り値の型を`T`から`value_type`に変更
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
