# fetch_max
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T
  fetch_max(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) const noexcept;                         // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
最大値を取得する。

この関数は、`*this`が保持する値と`operand`の大きい方を返す。


## テンプレートパラメータ制約
- (1) : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、[`std::max()`](/reference/algorithm/max.md)アルゴリズムのように`*this`が保持する値と`operand`の最大値を求めて返す


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、ポインタに対する特殊化で定義される (浮動小数点数型に対しては定義されない)
- ポインタ型
    - ポインタが異なる完全型オブジェクトを指している場合、`<`演算子による比較は狭義の弱順序を確立しない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int x = 3;
  int ret = std::atomic_ref{x}.fetch_max(2);

  std::cout << ret << std::endl;
}
```
* fetch_max[color ff0000]


### 出力
```
3
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]


## 参照
- [P0493R5 Atomic minimum/maximum](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0493r5.pdf)
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
