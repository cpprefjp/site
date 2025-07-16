# FE_UPWARD
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FE_UPWARD integer-constant-expression
// または
#undef FE_UPWARD
```
* integer-constant-expression[italic]

## 概要
浮動小数点数の丸め方式として、「正の無限大方向への丸め (切り上げ, ceil, round up)」を表すマクロ。

このマクロは、標準ライブラリの丸め処理で使用される丸め方式をユーザーが選択するために使用する。

処理系がこの丸め方式に対応している場合にこのマクロが定義される。
マクロが定義されるとき、このマクロの値は整数の定数式になり、非負の値を持つ。


## 例
```cpp example
#include <iostream>
#include <cfenv>
#include <cmath>

int main()
{
  std::fesetround(FE_UPWARD);

  float ar[] = {
      2.0,  2.1,  2.5,  2.9,
     -2.0, -2.1, -2.5, -2.9
  };

  for (float f : ar) {
    int x = std::nearbyint(f);
    std::cout << f << " -> " << x << std::endl;
  }
}
```
* FE_UPWARD[color ff0000]
* std::fesetround[link fesetround.md]
* std::nearbyint[link /reference/cmath/nearbyint.md]

### 出力
```
2 -> 2
2.1 -> 3
2.5 -> 3
2.9 -> 3
-2 -> -2
-2.1 -> -2
-2.5 -> -2
-2.9 -> -2
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
