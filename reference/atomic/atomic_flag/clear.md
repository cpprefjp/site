```cpp
void clear(memory_order order = memory_order_seq_cst) volatile noexcept;
void clear(memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* memory_order_seq_cst[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>フラグをクリアする</b>


##要件

`order`が以下のメモリオーダーではないこと：

- [`memory_order_acquire`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)
- [`memory_order_acq_rel`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)


##効果

`order`で指定されたメモリオーダーにしたがって、アトミックに`false`値を書き込む。



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
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  std::cout << std::boolalpha;
  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = x.test_and_set();
    std::cout << result << std::endl;
  }

  // 値をfalseにする
  x.clear();

  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = x.test_and_set();
    std::cout << result << std::endl;
  }
}
```
* clear[color ff0000]

###出力

```cpp
false
false
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


