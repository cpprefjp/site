#load
```cpp
T load(memory_order order = memory_order_seq_cst) const volatile noexcept;
T load(memory_order order = memory_order_seq_cst) const noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]
* memory_order order[link /reference/atomic/memory_order.md]

##概要

<b>値を読み込む</b>


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

```cpp
1
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


