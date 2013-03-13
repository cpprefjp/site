```cpp
namespace std {

  template <class T>
  T atomic_load(const volatile atomic<T>* object) noexcept;

  template <class T>
  T atomic_load(const atomic<T>* object) noexcept;

}
```
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]

##概要

<b>アトミックに値を読み込む</b>


##効果

[memory_order_seq_cst](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)のメモリオーダーにしたがって、アトミックに値を読み込む



##戻り値

アトミックに読み込まれた値



##例外

投げない


##備考

この関数は、特殊化された[`atomic`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic)型に対して定義される。



##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  // 値を読み込む
  int result = std::atomic_load(&x);

  std::cout << result << std::endl;
}
```
* atomic_load[color ff0000]

###出力

```cpp
3
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


