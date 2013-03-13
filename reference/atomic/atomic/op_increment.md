```cpp
T operator++() volatile noexcept;
T operator++() noexcept;

T operator++(int) volatile noexcept;
T operator++(int) noexcept;
```

##概要

<b>値をインクリメントする</b>


##戻り値

前置operator++：

`[fetch_add](https://sites.google.com/site/cpprefjp/reference/atomic/atomic/fetch_add)(1) + 1`
後置operator++：
[`fetch_add`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic/fetch_add)(1)

##例外

投げない


##備考
この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  ++x;

  std::cout << x.load() << std::endl;
}
```
* ++x[color ff0000]

###出力

```cpp
4
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


