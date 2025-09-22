# fetch_fminimum_num
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T
  fetch_fminimum_num(difference_type operand,
                     memory_order order = memory_order_seq_cst
                     ) const noexcept;                         // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
最小値を設定・取得する。

この関数は、`*this`が保持する値と`operand`の小さい方を求め、その値を`this`に保持させた上でその値を返す。


## 効果
`order`で指定されたメモリオーダーにしたがって、`*this`が保持する値と`operand`の最小値を求めて、その値を`this`に保持させ、その値を返す


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
  std::atomic<int> x(3);

  int ret = x.fetch_fminimum_num(2);

  std::cout << ret << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_fminimum_num[color ff0000]
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
- [P3008R6 Atomic floating-point min/max](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3008r6.html)