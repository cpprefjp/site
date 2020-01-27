# FE_INEXACT
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FE_INEXACT implementation-defined
```

## 概要
浮動小数点数の演算が不�確な結果となったことを表す浮動小数点例外の種類。

このマク�は、浮動小数点例外の状態を表すビット値である。他の浮動小数点例外マク�とAND (`&`) や OR (`|`)を使用して、複数のマク�を組み合わせて使用できる。

## 例
```cpp example
#include <iostream>
#include <cfenv>

int main()
{
  // 整数に収まらない浮動小数点数から整数への変換
  int result = 1.2f;
  if (std::fetestexcept(FE_INEXACT)) {
    std::cout << "raised inexact" << std::endl;
  }
  else {
    std::cout << "no error" << std::endl;
  }
}
```
* FE_INEXACT[color ff0000]
* std::fetestexcept[link fetestexcept.md]

### 出力例
```
raised inexact
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、�しく動作しないおそれがある。


