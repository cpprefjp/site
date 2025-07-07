# FE_DIVBYZERO
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FE_DIVBYZERO implementation-defined
```

## 概要
浮動小数点数に対してゼロで除算されたことを表す浮動小数点例外の種類。

「DIVBYZERO」は「divide-by-zero (ゼロによる除算)」の略称である。

このマクロは、浮動小数点例外の状態を表すビット値である。他の浮動小数点例外マクロとAND (`&`) や OR (`|`)を使用して、複数のマクロを組み合わせて使用できる。

## 例
```cpp example
#include <iostream>
#include <cfenv>

int main()
{
  float result = 1.0f / 0.0f;
  if (std::fetestexcept(FE_DIVBYZERO)) {
    // 浮動小数点数に対してゼロ除算が行われた
    std::cout << "zero divided" << std::endl;
  }
  else {
    std::cout << "no error" << std::endl;
  }
  std::feclearexcept(FE_ALL_EXCEPT);
}
```
* FE_DIVBYZERO[color ff0000]
* FE_ALL_EXCEPT[link fe_all_except.md]

### 出力例
```
zero divided
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified], 2015 [mark verified]
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、正しく動作しないおそれがある。


