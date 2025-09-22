# fetch_min
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T
  fetch_min(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) const noexcept;                         // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
最小値を設定・取得する。

この関数は、現在の値と`operand`の大きい方を求めて、その値で現在の値を置き換え、その値を返す。


## テンプレートパラメータ制約
- (1) : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、[`std::min()`](/reference/algorithm/min.md)アルゴリズムのように現在の値と`operand`の最小値を求めて、その値で現在の値を置き換え、その値を返す


## 例外
投げない


## 備考
- この関数は、`atomic_ref`クラスの整数型、浮動小数点数型、ポインタに対する特殊化で定義される
- 浮動小数点数型
    - [`std::fminimum_num()`](/reference/cmath/fminimum_num.md)関数と同様の動作をするが、以下の点で異なる：
        - 両方のパラメータが`NaN`である場合、現在の値は未規定のNaN値に置き換えられる
        - 一方のパラメータだけが`NaN`である場合、現在の値はもう一方のパラメータ、または未規定のNaN値に置き換えられるが、どちらに置き換えられるかは未規定
        - パラメータが異なる符号のゼロである場合、現在の値がどちらに置き換えられるかは未規定
            - 処理系への推奨としては、負のゼロを正のゼロより小さいものとして扱うべきである
- ポインタ型
    - ポインタが異なる完全型オブジェクトを指している場合、`<`演算子による比較は狭義の弱順序を確立しない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int x = 3;
  int ret = std::atomic_ref{x}.fetch_min(2);

  std::cout << ret << std::endl;
}
```
* fetch_min[color ff0000]


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
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
