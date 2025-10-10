# atomic_store_max
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  void
    atomic_store_max(volatile atomic<T>* object,
                     typename atomic<T>::value_type operand) noexcept; // (1) C++26

  template <class T>
  constexpr void
    atomic_store_max(atomic<T>* object,
                     typename atomic<T>::value_type operand) noexcept; // (2) C++26
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
値を読み込まずにアトミックに最大値を設定する。

この関数は、[`atomic_fetch_max()`](atomic_fetch_max.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。


## テンプレートパラメータ制約
- (1), (2) : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) : `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
- `order`は、以下のいずれかであること
    - [`memory_order_relaxed`](/reference/atomic/memory_order.md)
    - [`memory_order_release`](/reference/atomic/memory_order.md)
    - [`memory_order_seq_cst`](/reference/atomic/memory_order.md)


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、[`std::max()`](/reference/algorithm/max.md)アルゴリズムのように`*object`が保持する値と`operand`の最大値を求めて、その値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  std::atomic_store_max(&x, 2);

  std::cout << x.load() << std::endl;
}
```
* std::atomic_store_max[color ff0000]
* x.load()[link /reference/atomic/atomic/load.md]

### 出力
```
3
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 13 [mark noimpl]


## 参照
- [P3111R8 Atomic Reduction Operations](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3111r8.html)