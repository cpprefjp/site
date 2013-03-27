#operator-=
```cpp
T operator-=(T operand) volatile noexcept;
T operator-=(T operand) noexcept;
```

##概要

<b>加算を行う</b>



##戻り値

[`fetch_sub`](/reference/atomic/atomic/fetch_sub.md)(operand) - operand



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

  x -= 2;

  std::cout << x.load() << std::endl;
}
```
* x -= 2[color ff0000]

###出力

```cpp
1
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


