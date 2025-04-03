# store
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void
  store(T desired,
        memory_order order = memory_order_seq_cst) const noexcept; // (1) C++20
constexpr void
  store(value_type desired,
        memory_order order = memory_order_seq_cst) const noexcept; // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を書き込む


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 事前条件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_consume`](/reference/atomic/memory_order.md) (C++26で非推奨)
- [`memory_order_acquire`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)

## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値を`desired`でアトミックに置き換える。

この関数は、戻り値のない[`exchange()`](exchange.md)と見なせる。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  int value = 3;
  std::atomic_ref<int> x{value};

  std::thread t{[&x]{
    // アトミックに値を書き込む
    x.store(2);
  }};
  t.join();

  std::cout << value << std::endl;
}
```
* store[color ff0000]

### 出力
```
2
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
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
- [P3475R2 Defang and deprecate memory_order::consume](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3475r2.pdf)
