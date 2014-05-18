#operator|= (C++11)
```cpp
T operator|=(T operand) volatile noexcept;
T operator|=(T operand) noexcept;
```

##概要
OR演算を行う


##戻り値
[`fetch_or`](./fetch_or.md)`(operand) | operand`


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

  x |= b;

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* x |= b[color ff0000]

###出力
```
1011
1110
1111
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


