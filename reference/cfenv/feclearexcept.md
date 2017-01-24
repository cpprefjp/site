#feclearexcept
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int feclearexcept(int excepts);
}
```

##概要
パラメータ`excepts`で指定された浮動小数点例外をクリアする。


##戻り値
- `excepts`が`0`であった場合、この関数は`0`を返す
- 指定された全ての浮動小数点例外を正しくクリアできた場合、この関数は`0`を返す
- それ以外の場合、この関数は`0`以外を返す


##例
```cpp
#include <cassert>
#include <cfenv>

int main()
{
  // 以下の式でFE_DIVBYZERO浮動小数点例外が発生したと想定する
  float result = 1.0f / 0.0f;

  // FE_ALL_EXCEPTを指定することによって、
  // 発生した全ての浮動小数点例外をクリアする。
  //
  // 個別にクリアする場合は、feclearexcept(FE_DIVBYZERO)のように指定する。
  // 複数同時にクリアする場合は、feclearexcept(FE_DIVBYZERO | FE_INVALID)のように
  // ORでつなげて指定する。
  int clear_result = std::feclearexcept(FE_ALL_EXCEPT);

  assert(clear_result == 0);
  assert(std::fetestexcept(FE_DIVBYZERO) == 0);
}
```
* std::feclearexcept[color ff0000]
* std::fetestexcept[link fetestexcept.md]
* FE_DIVBYZERO[link fe_divbyzero.md]
* FE_INVALID[link fe_invalid.md]
* FE_ALL_EXCEPT[link fe_all_except.md]

###出力
```
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


