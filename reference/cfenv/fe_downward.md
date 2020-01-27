# FE_DOWNWARD
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FE_DOWNWARD implementation-defined
```

## 概要
浮動小数点数の丸め方式として、「負の無限大方向への丸め (切り下げ, floor, round down)」を表すマク�。

このマク�は、標準ライブラリの丸め処理で使用される丸め方式をユーザーが選択するために使用する。

このマク�の値は、整数の定数式として定義され、非負の値を持つ。


## 例
```cpp example
#include <iostream>
#include <cfenv>
#include <cmath>

int main()
{
  std::fesetround(FE_DOWNWARD);

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
* FE_DOWNWARD[color ff0000]
* std::fesetround[link fesetround.md]
* std::nearbyint[link /reference/cmath/nearbyint.md]

### 出力
```
2 -> 2
2.1 -> 2
2.5 -> 2
2.9 -> 2
-2 -> -2
-2.1 -> -3
-2.5 -> -3
-2.9 -> -3
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


