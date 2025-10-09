# store_max
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void
  store_max(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) noexcept;                               // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を読み込まずに最大値を設定する。

この関数は、`*this`が保持する値と`operand`の大きい方を求め、その値を`this`に保持させる。

この関数は、[`fetch_max()`](fetch_max.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。この関数はロックフリーに動作することが保証されているため、並列アルゴリズムで[`par_useq`](/reference/execution/execution/execution_policy.md)ポリシーを使う場合などに有用である。


## テンプレートパラメータ制約
- (1) : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、[`std::max()`](/reference/algorithm/max.md)アルゴリズムのように`*this`が保持する値と`operand`の最大値を求めて、その値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型、ポインタに対する特殊化で定義される
- 浮動小数点数型
    - [`std::fmaximum_num()`](/reference/cmath/fmaximum_num.md)関数と同様の動作をするが、以下の点で異なる：
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
  std::atomic<int> x(2);

  x.store_max(3);

  std::cout << x.load() << std::endl;
}
```
* store_max[color ff0000]
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