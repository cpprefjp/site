# atomic_fetch_min
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <classT>
  T atomic_fetch_min(volatile atomic<T>* object,
                     typename atomic<T>::value_type operand) noexcept; // (1) C++26

  template <classT>
  T atomic_fetch_min(atomic<T>* object,
                     typename atomic<T>::value_type operand) noexcept; // (2) C++26
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
アトミックに最小値を取得する


## テンプレートパラメータ制約
- (1), (2) : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、[`std::min()`](/reference/algorithm/min.md)アルゴリズムのように`*object`が保持する値と`operand`の最小値を求めて返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int ret = std::atomic_fetch_min(&x, 2);

  std::cout << ret << std::endl;
}
```
* std::atomic_fetch_min[color ff0000]

### 出力
```
2
```


## バージョン
### 言語
- C++26


### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]


## 参照
- [P0493R5 Atomic maximum/minimum](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0493r5.pdf)
