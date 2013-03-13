```cpp
T operator&=(T operand) volatile noexcept;
T operator&=(T operand) noexcept;
```

##概要

<b>AND演算を行う</b>


##戻り値

[`fetch_and`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic/fetch_and)(operand) & operand



##例外

投げない


##備考

この関数は、`atomic`クラスの整数型に対する特殊化で定義される。



##例

```cpp
#include <iostream>
#include <atomic>
#include <bitset>

int main()
{
  int a = 0x0b;
  int b = 0x0e;

  std::atomic<int> x(a);

  x &= b;

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* x &= b[color ff0000]

###出力

```cpp
1011
1110
1010
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


