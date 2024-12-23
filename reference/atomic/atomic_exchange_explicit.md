# atomic_exchange_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T
    atomic_exchange_explicit(
      volatile atomic<T>* object,
      T desired,
      memory_order order) noexcept;           // (1) C++11
  template <class T>
  T
    atomic_exchange_explicit(
      volatile atomic<T>* object,
      typename atomic<T>::value_type desired,
      memory_order order) noexcept;           // (1) C++17

  template <class T>
  T
    atomic_exchange_explicit(
      atomic<T>* object,
      T desired,
      memory_order order) noexcept;           // (2) C++11
  template <class T>
  T
    atomic_exchange_explicit(
      atomic<T>* object,
      typename atomic<T>::value_type desired,
      memory_order order) noexcept;           // (2) C++17
  template <class T>
  constexpr T
    atomic_exchange_explicit(
      atomic<T>* object,
      typename atomic<T>::value_type desired,
      memory_order order) noexcept;           // (2) C++26
]
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]


## 概要
アトミックに値を入れ替える


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値を`desired`でアトミックに置き換える


## 戻り値
変更前の値が返される


## 例外
投げない


## 備考
この関数は、特殊化された[`atomic`](atomic.md)型に対して定義される。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  if (std::atomic_exchange_explicit(&x, 2, std::memory_order_acquire) == 1) {
    std::cout << "replaced 1 by 2" << std::endl;
  }
  else {
    std::cout << "replace failed" << std::endl;
  }
}
```
* std::atomic_exchange_explicit[color ff0000]


### 出力
```
replaced 1 by 2
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
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
