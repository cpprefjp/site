#store
```cpp
void store(T desired, memory_order order = memory_order_seq_cst) volatile noexcept;
void store(T desired, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

##概要
値を書き込む


##要件
`order`が以下のメモリオーダーではないこと：
- [`memory_order_consume`](/reference/atomic/memory_order.md)
- [`memory_order_acquire`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)

##効果
`order`で指定されたメモリオーダーにしたがって、現在の値を`desired`でアトミックに置き換える。
この関数は、戻り値のない[`exchange()`](./exchange.md)と見なせる。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x.store(2);

  std::cout << x.load() << std::endl;
}
```
* store[color ff0000]

###出力
```
2
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


