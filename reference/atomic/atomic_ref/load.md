# load
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T load(memory_order order = memory_order_seq_cst) const noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を�み込む


## 要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、値を�み込む


## 戻り値
`*this`が参照するオブジェクトをアトミックに�み込んで返す


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
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??
