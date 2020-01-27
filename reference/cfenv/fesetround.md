# fesetround
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fesetround(int round);
}
```

## 概要
浮動小数点数の丸め方式を�定する。


## 効果
パラメータ`round`で渡された丸め方式を、標準ライブラリの丸め方式として�定する。

パラメータ`round`の値が標準ライブラリで定義される丸め方式のマク�値と異なる場合、丸め方式は変更されない。


## 戻り値
丸め方式を�しく�定できた場合、この関数は`0`を返す。そうでなければ、`0`以外の値を返す。


## 例
```cpp example
#include <iostream>
#include <cfenv>
#include <cmath>

void round_values(const char* mode)
{
  float ar[] = {
      2.0,  2.1,  2.5,  2.9,
     -2.0, -2.1, -2.5, -2.9
  };

  std::cout << mode << std::endl << "  ";
  for (float f : ar) {
    int x = std::nearbyint(f);
    std::cout << '[' << f << " -> " << x << "] ";
  }
  std::cout << std::endl;
}

int main()
{
  // デフォルトの丸めモード (FE_TONEAREST)
  round_values("default");

  // 切り下げ
  std::fesetround(FE_DOWNWARD);
  round_values("downward");

  // 最も近い値への丸め
  std::fesetround(FE_TONEAREST);
  round_values("to nearest");

  // ゼ�方向への丸め
  std::fesetround(FE_TOWARDZERO);
  round_values("toward zero");

  // 切り上げ
  std::fesetround(FE_UPWARD);
  round_values("upward");
}
```
* std::fesetround[color ff0000]
* std::nearbyint[link /reference/cmath/nearbyint.md]
* FE_DOWNWARD[link fe_downward.md]
* FE_TONEAREST[link fe_tonearest.md]
* FE_TOWARDZERO[link fe_towardzero.md]
* FE_UPWARD[link fe_upward.md]

### 出力
```
default
  [2 -> 2] [2.1 -> 2] [2.5 -> 2] [2.9 -> 3] [-2 -> -2] [-2.1 -> -2] [-2.5 -> -2] [-2.9 -> -3] 
downward
  [2 -> 2] [2.1 -> 2] [2.5 -> 2] [2.9 -> 2] [-2 -> -2] [-2.1 -> -3] [-2.5 -> -3] [-2.9 -> -3] 
to nearest
  [2 -> 2] [2.1 -> 2] [2.5 -> 2] [2.9 -> 3] [-2 -> -2] [-2.1 -> -2] [-2.5 -> -2] [-2.9 -> -3] 
toward zero
  [2 -> 2] [2.1 -> 2] [2.5 -> 2] [2.9 -> 2] [-2 -> -2] [-2.1 -> -2] [-2.5 -> -2] [-2.9 -> -2] 
upward
  [2 -> 2] [2.1 -> 3] [2.5 -> 3] [2.9 -> 3] [-2 -> -2] [-2.1 -> -2] [-2.5 -> -2] [-2.9 -> -2] 
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


## 関連項目
- [`rint`](/reference/cmath/rint.md)
- [`nearbyint`](/reference/cmath/nearbyint.md)

