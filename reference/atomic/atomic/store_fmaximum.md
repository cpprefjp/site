# store_fmaximum
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void
  store_fmaximum(difference_type operand,
                 memory_order order = memory_order_seq_cst
                 ) volatile noexcept;                      // (1) C++26

constexpr void
  store_fmaximum(difference_type operand,
                 memory_order order = memory_order_seq_cst
                 ) noexcept;                               // (2) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を読み込まずに最大値を設定する。

この関数は、`*this`が保持する値と`operand`の大きい方を求め、その値を`this`に保持させる。

この関数は、[`fetch_fmaximum()`](fetch_fmaximum.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。


## テンプレートパラメータ制約
- `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) : `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
- `order`は、以下のいずれかであること
    - [`memory_order_relaxed`](/reference/atomic/memory_order.md)
    - [`memory_order_release`](/reference/atomic/memory_order.md)
    - [`memory_order_seq_cst`](/reference/atomic/memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、`*this`が保持する値と`operand`の最大値を求めて、その値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの浮動小数点数型に対する特殊化で定義される
- 浮動小数点数型
    - [`std::fmaximum()`](/reference/cmath/fmaximum.md)関数と同様の動作をする


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(2);

  x.store_fmaximum(3);

  std::cout << x.load() << std::endl;
}
```
* store_fmaximum[color ff0000]
* load()[link load.md]

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