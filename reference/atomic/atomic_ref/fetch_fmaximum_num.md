# fetch_fmaximum_num
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T
  fetch_fmaximum_num(difference_type operand,
                     memory_order order = memory_order_seq_cst
                     ) const noexcept;                         // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
最大値を設定・取得する。

この関数は、現在の値と`operand`の大きい方を求め、その値で現在の値を置き換え、その値を返す。


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値と`operand`の最大値を求めて、その値で現在の値を置き換え、その値を返す


## 例外
投げない


## 備考
- この関数は、`atomic_ref`クラスの浮動小数点数型で定義される
- 浮動小数点数型
    - [`std::fmaximum_num()`](/reference/cmath/fmaximum_num.md)関数と同様の動作をする


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int x = 2;
  int ret = std::atomic_ref{x}.fetch_fmaximum_num(3);

  std::cout << ret << std::endl;
  std::cout << x << std::endl;
}
```
* fetch_fmaximum_num[color ff0000]


### 出力
```
3
3
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]


## 参照
- [P0493R5 Atomic minimum/maximum](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0493r5.pdf)
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
- [P3008R6 Atomic floating-point min/max](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3008r6.html)