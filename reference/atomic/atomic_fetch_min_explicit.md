# atomic_fetch_min_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  T atomic_fetch_min_explicit(
      volatile atomic<T>* object,
      typename atomic<T>::value_type operand,
      memory_order order) noexcept;                // (1) C++26

  template <class T>
  T atomic_fetch_min_explicit(
      atomic<T>* object,
      typename atomic<T>::value_type operand,
      memory_order order) noexcept;                // (2) C++26
}
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]

## 概要
アトミックに最小値を取得する


## テンプレートパラメータ制約
- (1), (2) : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
`order`で指定されたメモリオーダーにしたがって、[`std::min()`](/reference/algorithm/min.md)アルゴリズムのように`*object`が保持する値と`operand`の最小値を求めて返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int ret = std::atomic_fetch_min_explicit(&x, 2, std::memory_order_seq_cst);
  std::cout << ret << std::endl;
}
```
* std::atomic_fetch_min_explicit[color ff0000]


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
- [P0493R5 Atomic minimum/maximum](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0493r5.pdf)
