# load
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T load(memory_order order = memory_order_seq_cst) const noexcept;          // (1) C++20
value_type load(memory_order order = memory_order_seq_cst) const noexcept; // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を読み込む


## 事前条件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、値を読み込む


## 戻り値
`*this`が参照するオブジェクトをアトミックに読み込んで返す


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
    int n = x.load();
    std::cout << n << std::endl;
  }};
  t.join();
}
```
* load[color ff0000]


### 出力
```
3
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
