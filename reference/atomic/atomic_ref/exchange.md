# exchange
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T
  exchange(T desired,
           memory_order order = memory_order_seq_cst) const noexcept; // (1) C++20
value_type
  exchange(value_type desired,
           memory_order order = memory_order_seq_cst) const noexcept; // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を入れ替える


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 効果
`order`で指定されたメモリオーダーにしたがって、`*this`が参照する値を`desired`でアトミックに置き換える


## 戻り値
この関数の呼び出し前に`*this`が参照していた値が、アトミックに返される


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 1;
  std::atomic_ref<int> x{value};

  if (x.exchange(2) == 1) {
    std::cout << "replaced 1 by 2" << std::endl;
  }
}
```
* exchange[color ff0000]


### 出力
```
replaced 1 by 2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
