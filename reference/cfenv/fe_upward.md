#FE_UPWARD
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FE_UPWARD implementation-defined
```

##概要
浮動小数点数の丸め方式として、「正の無限大方向への丸め (切り上げ, ceil, round up)」を表すマクロ。

このマクロは、標準ライブラリの丸め処理で使用される丸め方式をユーザーが選択するために使用する。

このマクロの値は、整数の定数式として定義され、非負の値を持つ。


##例
```cpp
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

###出力
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

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0, 14.0
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、正しく動作しないおそれがある。


