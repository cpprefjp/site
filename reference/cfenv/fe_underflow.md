#FE_UNDERFLOW
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define implementation-defined FE_UNDERFLOW
```

##概要
浮動小数点数の演算でアンダーフローが発生したことを表す浮動小数点例外の種類。

このマクロは、浮動小数点例外の状態を表すビット値である。他の浮動小数点例外マクロとAND (`&`) や OR (`|`)を使用して、複数のマクロを組み合わせて使用できる。

##例
```cpp
#include <iostream>
#include <cfenv>

int main()
{
  float x = 1e-30f;
  float y = x * x;

  if (std::fetestexcept(FE_UNDERFLOW)) {
    std::cout << "raised underflow" << std::endl;
  }
  else {
    std::cout << "no error" << std::endl;
  }
}
```
* FE_UNDERFLOW[color ff0000]
* std::fetestexcept[link fetestexcept.md]

###出力例
```
raised underflow
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0, 14.0
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、正しく動作しないおそれがある。


