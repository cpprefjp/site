# fexcept_t
* cfenv[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using fexcept_t = unspecified;
}
```
* unspecified[italic]

## 概要
実装が持つ浮動小数点例外の状態フラグを表す型。


## 例
```cpp example
// 標準C++の浮動小数点例外を、
// Visual C++での浮動小数点例外の形式に変換する
#include <iostream>
#include <cfenv>

int main()
{
  float a = 1.0f;
  float b = 0.0f;
  float result = a / b;

  std::fexcept_t excepts = 0;
  std::fegetexceptflag(&excepts, FE_ALL_EXCEPT);

  if (excepts & _SW_ZERODIVIDE)
  {
    std::cout << "zero divided" << std::endl;
  }
}
```
* fexcept_t[color ff0000]
* std::fegetexceptflag[link fegetexceptflag.md]
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
