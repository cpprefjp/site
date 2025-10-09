# store_fminimum_num
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void
  store_fminimum_num(difference_type operand,
                     memory_order order = memory_order_seq_cst
                     ) noexcept;                               // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を読み込まずに最小値を設定する。

この関数は、`*this`が保持する値と`operand`の小さい方を求め、その値を`this`に保持させる。

この関数は、[`fetch_fminimum_num()`](fetch_fminimum_num.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。


## 効果
`order`で指定されたメモリオーダーにしたがって、`*this`が保持する値と`operand`の最小値を求めて、その値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの浮動小数点数型に対する特殊化で定義される
- 浮動小数点数型
    - [`std::fminimum_num()`](/reference/cmath/fminimum_num.md)関数と同様の動作をする


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(2);

  x.store_fminimum_num(3);

  std::cout << x.load() << std::endl;
}
```
* store_fminimum_num[color ff0000]
* load()[link load.md]

### 出力
```
2
```

## バージョン
### 言語
- C++26

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 13 [mark noimpl]


## 参照
- [P3111R8 Atomic Reduction Operations](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3111r8.html)