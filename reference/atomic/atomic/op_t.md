```cpp
operator T() const volatile noexcept;
operator T() const noexcept;
```

##概要

<b>型Tへの暗黙の型変換</b>


##戻り値

[`load`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic/load)()

##例外

投げない


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  int value = x;
  std::cout << value << std::endl;
}
```
* x[color ff0000]

###出力

```cpp
1
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


