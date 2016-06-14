#fetestexcept
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fetestexcept(int excepts);
}
```

##概要
指定された浮動小数点例外が設定されるかを判定する。

この関数は、現在発生している浮動小数点例外のうち、指定された例外の集合のみを抽出して返す。


##戻り値
ビット演算のORで複数指定された浮動小数点例外の種類`excepts`の、例外発生状態を返す。


##例
```cpp
#include <iostream>
#include <cmath>
#include <cfenv>
#include <limits>

int main()
{
    // ひとつの浮動小数点例外が発生しているかを確認する。
    // ここでは、FE_DIVBYZERO (ゼロ除算)の状態のみを取得している。
    // 指定した浮動小数点例外がひとつであれば、戻り値が0でないことが例外発生中と判断できる
    {
      float result = 1.0f / 0.0f;
      if (std::fetestexcept(FE_DIVBYZERO)) {
        // 浮動小数点数に対してゼロ除算が行われた
        std::cout << "zero divided" << std::endl;
      }
      std::feclearexcept(FE_ALL_EXCEPT);
    }
    std::cout << "=====" << std::endl;

    // 複数の浮動小数点例外が発生しているかを確認する。
    // ここでは、浮動小数点例外の全種類がビットORでつながれたFE_ALL_EXCEPTを指定している。
    // これによって、全ての浮動小数点例外の状態を取得している。
    // fetestexcept(FE_INEXACT | FE_OVERFLOW)のようにして、
    // 明示的にORで複数の浮動小数点例外を指定してもよい。
    //
    // 複数の浮動小数点例外の状態を取得した場合は、ビットANDを使用して、
    // 特定の浮動小数点例外が発生しているかを確認する。
    {
      float result = std::numeric_limits<double>::max();
      int excepts = std::fetestexcept(FE_ALL_EXCEPT);
      if (excepts & FE_INEXACT) {
        std::cout << "inexact" << std::endl;
      }
      if (excepts & FE_INVALID) {
        std::cout << "invalid" << std::endl;
      }
      if (excepts & FE_OVERFLOW) {
        std::cout << "overflow" << std::endl;
      }
      if (excepts & FE_UNDERFLOW) {
        std::cout << "underflow" << std::endl;
      }
    }
}
```
* std::fetestexcept[color ff0000]
* std::feclearexcept[link feclearexcept.md]
* FE_DIVBYZERO[link fe_divbyzero.md]
* FE_INEXACT[link fe_inexact.md]
* FE_INVALID[link fe_invalid.md]
* FE_OVERFLOW[link fe_overflow.md]
* FE_UNDERFLOW[link fe_underflow.md]
* FE_ALL_EXCEPT[link fe_all_except.md]
* std::numeric_limits<double>::max()[link /reference/limits/numeric_limits/max.md]

###出力例
```
zero divided
=====
inexact
overflow
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


