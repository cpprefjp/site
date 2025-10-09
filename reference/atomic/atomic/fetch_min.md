# fetch_min
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T
  fetch_min(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) noexcept;                              // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
最小値を設定・取得する。

この関数は、`*this`が保持する値と`operand`の小さい方を求め、その値を`this`に保持させた上でその値を返す。


## テンプレートパラメータ制約
- (1) : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、[`std::min()`](/reference/algorithm/min.md)アルゴリズムのように`*this`が保持する値と`operand`の最小値を求めて、その値を`this`に保持させ、その値を返す


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型、ポインタに対する特殊化で定義される
- 浮動小数点数型
    - [`std::fminimum_num()`](/reference/cmath/fminimum_num.md)関数と同様の動作をするが、以下の点で異なる：
        - 両方のパラメータが`NaN`である場合、`this`が指す値は未規定のNaN値に置き換えられる
        - 一方のパラメータだけが`NaN`である場合、`this`が指す値はもう一方のパラメータ、または未規定のNaN値に置き換えられるが、どちらに置き換えられるかは未規定
        - パラメータが異なる符号のゼロである場合、`this`が指す値がどちらに置き換えられるかは未規定
            - 処理系への推奨としては、負のゼロを正のゼロより小さいものとして扱うべきである
- ポインタ型
    - ポインタが異なる完全型オブジェクトを指している場合、`<`演算子による比較は狭義の弱順序を確立しない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int ret = x.fetch_min(2);

  std::cout << ret << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_min[color ff0000]
* load()[link load.md]

### 出力
```
2
2
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