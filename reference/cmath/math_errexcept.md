#MATH_ERREXCEPT
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define MATH_ERREXCEPT 2
```

##概要
`MATH_ERREXCEPT`は、[`<cmath>`](../cmath.md)内で浮動小数点例外が発生したかを表す整数定数マクロである。

この定数と[`math_errhandling`](math_errhandling.md)でビットANDをとった結果がゼロでないか比較することにより、浮動小数点例外が発生したか否かを判定できる。


##例
```cpp
#include <iostream>
#include <cmath>
#include <cfenv>

int main()
{
  std::feclearexcept(FE_ALL_EXCEPT);
  std::log(0.0);

  if (math_errhandling & MATH_ERREXCEPT) {
    int excepts = std::fetestexcept(FE_ALL_EXCEPT);
    if (excepts & FE_INVALID) {
      std::cout << "FE_INVALID" << std::endl;
    }
    if (excepts & FE_DIVBYZERO) {
      std::cout << "FE_DIVBYZERO" << std::endl;
    }
    if (excepts & FE_OVERFLOW) {
      std::cout << "FE_OVERFLOW" << std::endl;
    }
    if (excepts & FE_UNDERFLOW) {
      std::cout << "FE_UNDERFLOW" << std::endl;
    }
    if (excepts & FE_INEXACT) {
      std::cout << "FE_INEXACT" << std::endl;
    }
  }
  else {
    std::cout << "no exception" << std::endl;
  }
}
```
* MATH_ERREXCEPT[color ff0000]
* std::log[link log.md]
* math_errhandling[link math_errhandling.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_INVALID[link ../cfenv/fe_invalid.md]
* FE_OVERFLOW[link ../cfenv/fe_overflow.md]
* FE_UNDERFLOW[link ../cfenv/fe_underflow.md]
* FE_DIVBYZERO[link ../cfenv/fe_divbyzero.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]

###出力例
```
FE_DIVBYZERO
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
