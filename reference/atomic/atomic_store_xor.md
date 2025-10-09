# atomic_store_xor
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  void
    atomic_store_xor(
      volatile atomic<T>* object,
      typename atomic<T>::difference_type operand) noexcept; // (1) C++26

  template <class T>
  constexpr void
    atomic_store_xor(
      atomic<T>* object,
      typename atomic<T>::difference_type operand) noexcept; // (2) C++26
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
値を読み込まずにアトミックに値をXORする。

この関数は、[`atomic_fetch_xor()`](atomic_fetch_xor.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。


## テンプレートパラメータ制約
- 型`T`が整数型であること
- (1) :
    - `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
- `order`は、以下のいずれかであること
    - [`memory_order_relaxed`](/reference/atomic/memory_order.md)
    - [`memory_order_release`](/reference/atomic/memory_order.md)
    - [`memory_order_seq_cst`](/reference/atomic/memory_order.md)


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、現在の値に`operand`をXORした値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 備考
- 符号付き整数型に対しては、符号なし整数型に変換されたかのようにしたあと演算が行われ、結果は符号付き整数型になる。未定義動作はない


## 例
```cpp example
#include <print>
#include <atomic>

int main()
{
  std::atomic<int> x(0b1001);

  std::atomic_store_xor(&x, 0b0101);

  std::println("0b{:04b}", x.load());
}
```
* std::atomic_store_xor[color ff0000]
* x.load()[link /reference/atomic/atomic/load.md]

### 出力
```
0b1100
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