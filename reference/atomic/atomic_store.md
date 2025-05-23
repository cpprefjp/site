# atomic_store
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  void
    atomic_store(volatile atomic<T>* object,
                 T desired) noexcept;                              // (1) C++11
  template <class T>
  void
    atomic_store(volatile atomic<T>* object,
                 typename atomic<T>::value_type desired) noexcept; // (1) C++17

  template <class T>
  void
    atomic_store(atomic<T>* object,
                 T desired) noexcept;                              // (2) C++11
  template <class T>
  void
    atomic_store(atomic<T>* object,
                 typename atomic<T>::value_type desired) noexcept; // (2) C++17
  template <class T>
  constexpr void
    atomic_store(atomic<T>* object,
                 typename atomic<T>::value_type desired) noexcept; // (2) C++26
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
アトミックに値を書き込む


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、`object`が指す値を`desired`でアトミックに置き換える。
この関数は、戻り値のない[`atomic_exchange()`](atomic_exchange.md)と見なせる。


## 戻り値
なし


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

  // 2を書き込む
  std::atomic_store(&x, 2);

  std::cout << x.load() << std::endl;
}
```
* std::atomic_store[color ff0000]
* x.load()[link /reference/atomic/atomic/load.md]


### 出力
```
2
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
