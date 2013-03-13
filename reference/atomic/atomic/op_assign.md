```cpp
atomic& operator=(const atomic&) = delete;
atomic& operator=(const atomic&) volatile = delete;

T operator=(T desired) volatile noexcept;
T operator=(T desired) noexcept;
```

##概要

<b>値を書き込む</b>


##効果

[`store`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic/store)(desired)

##戻り値

`desired`

##例外

投げない


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x = 2;

  std::cout << x.load() << std::endl;
}
```
* x = 2[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): ??
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


