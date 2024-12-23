# atomic_load_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T
    atomic_load_explicit(
      const volatile atomic<T>* object,
      memory_order order) noexcept;     // (1) C++11

  template <class T>
  T
    atomic_load_explicit(
      const atomic<T>* object,
      memory_order order) noexcept;     // (2) C++11
  template <class T>
  constexpr T
    atomic_load_explicit(
      const atomic<T>* object,
      memory_order order) noexcept;     // (2) C++26
}
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]

## 概要
アトミックに値を読み込む


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](memory_order.md)
- [`memory_order_acq_rel`](memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、アトミックに値を読み込む


## 戻り値
アトミックに読み込まれた値


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
  std::atomic<int> x(3);

  // 値を読み込む
  int result = std::atomic_load_explicit(&x, std::memory_order_acquire);

  std::cout << result << std::endl;
}
```
* std::atomic_load_explicit[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
