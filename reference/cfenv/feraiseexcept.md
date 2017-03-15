# feraiseexcept
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int feraiseexcept(int excepts);
}
```

## 概要
パラメータ`excepts`で指定された浮動小数点例外を発生させる。


## 効果
パラメータ`excepts`で指定された浮動小数点例外を発生させる。`excepts`には、ビットORを使用して複数の浮動小数点例外を指定できる。この効果は、算術演算によって発生する浮動小数点例外と同様。発生する例外の順序は未規定。

[`FE_OVERFLOW`](fe_overflow.md)もしくは[`FE_UNDERFLOW`](fe_underflow.md)が指定されたときに、追加で[`FE_INEXACT`](fe_inexact.md)も発生させるかは実装定義。


## 戻り値
- `excepts`が`0`であった場合、この関数は`0`を返す
- 指定された全ての浮動小数点例外を正しく発生させられた場合、この関数は`0`を返す
- それ以外の場合、この関数は`0`以外を返す


## 例
```cpp
#include <iostream>
#include <cfenv>

int main()
{
  // FE_INVALIDとFE_OVERFLOWの、2つの浮動小数点例外を発生させる
  std::feraiseexcept(FE_INVALID | FE_OVERFLOW);

  // 浮動小数点例外の状態を確認
  int excepts = std::fetestexcept(FE_ALL_EXCEPT);
  if (excepts & FE_DIVBYZERO) {
    std::cout << "divide-by-zero" << std::endl;
  }
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
```
* std::feraiseexcept[color ff0000]
* std::fetestexcept[link fetestexcept.md]
* FE_ALL_EXCEPT[link fe_all_except.md]
* FE_DIVBYZERO[link fe_divbyzero.md]
* FE_INEXACT[link fe_inexact.md]
* FE_INVALID[link fe_invalid.md]
* FE_OVERFLOW[link fe_overflow.md]
* FE_UNDERFLOW[link fe_underflow.md]

### 出力例
```
inexact
invalid
overflow
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0, 14.0
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、正しく動作しないおそれがある。


