#UINTPTR_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINTPTR_MAX implementation-defined
```

##概要
[`uintptr_t`](uintptr_t.md) の最大値。

ビット数16をNとして、このマクロの値は2<sup>N</sup> - 1以上となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::uintptr_t max_value = UINTPTR_MAX;
  std::cout << static_cast<unsigned long long>(max_value) << std::endl;
}
```
* std::uintptr_t[link uintptr_t.md]

###出力例
```
18446744073709551615
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

