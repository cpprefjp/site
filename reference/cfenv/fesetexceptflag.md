# fesetexceptflag
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fesetexceptflag(const fexcept_t *flagp, int excepts);
}
```
* fexcept_t[link fexcept_t.md]

## 概要
浮動小数点例外を発生させずに、浮動小数点例外の状態を�定する。


## 効果
`flagp`が指す浮動小数点例外の状態のうち、`excepts`で指定された種類の浮動小数点例外のみを、現在の浮動小数点例外の状態として�定する。

この関数は、浮動小数点例外を発生させない。


## 戻り値
- `excepts`が`0`であった場合、この関数は`0`を返す
- 指定された浮動小数点例外を�しく�定できた場合、この関数は`0`を返す
- それ以外の場合、この関数は`0`以外を返す


## 例
```cpp example
#include <cassert>
#include <cfenv>

int main()
{
  // ゼ�割りを発生させる
  float result = 1.0f / 0.0f;

  // 現在の浮動小数点例外の状態を取得
  std::fexcept_t excepts = 0;
  std::fegetexceptflag(&excepts, FE_ALL_EXCEPT);

  int div_by_zero_state = std::fetestexcept(FE_DIVBYZERO);

  // 浮動小数点例外の状態を変更する
  std::feclearexcept(FE_ALL_EXCEPT);
  assert(std::fetestexcept(FE_DIVBYZERO) == 0);

  // 保持しておいた浮動小数点例外の状態のうち、
  // ゼ�除算の状態のみを復旧させる
  std::fesetexceptflag(&excepts, FE_DIVBYZERO);
  assert(div_by_zero_state == std::fetestexcept(FE_DIVBYZERO));
}
```
* std::fesetexceptflag[color ff0000]
* fexcept_t[link fexcept_t.md]
* std::fegetexceptflag[link fegetexceptflag.md]
* std::feclearexcept[link feclearexcept.md]
* std::fetestexcept[link fetestexcept.md]
* FE_ALL_EXCEPT[link fe_all_except.md]
* FE_DIVBYZERO[link fe_divbyzero.md]

### 出力
```
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


