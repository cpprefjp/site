```cpp
T exchange(T desired, memory_order order = memory_order_seq_cst) volatile noexcept;
T exchange(T desired, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* memory_order_seq_cst[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>値を入れ替える</b>


##効果

`order`で指定されたメモリオーダーにしたがって、現在の値を`desired`でアトミックに置き換える


##戻り値

変更前の値が返される


##例外

投げない


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  if (x.exchange(2) == 1) {
    std::cout << "replaced 1 by 2" << std::endl;
  }
  else {
    std::cout << "replace failed" << std::endl;
  }
}
```
* exchange[color ff0000]

###出力

```cpp
replaced 1 by 2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


