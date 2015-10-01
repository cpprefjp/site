#load
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T load(memory_order order = memory_order_seq_cst) const volatile noexcept;
T load(memory_order order = memory_order_seq_cst) const noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

##概要
値を読み込む


##要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


##効果
`order`で指定されたメモリオーダーにしたがって、値を読み込む


##戻り値
アトミックに読み込まれた値


##例外
投げない


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  std::cout << x.load() << std::endl;
}
```
* load[color ff0000]


###出力
```
1
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


