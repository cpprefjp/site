#FLT_ROUNDS
* cfloat[meta header]
* macro[meta id-type]

```cpp
#define FLT_ROUNDS implementation-defined
```
* implementation-defined[italic]

##概要
`FLT_ROUNDS` は、浮動小数点数の加算の丸めモードを表すマクロである。

`FLT_ROUNDS` が

- 0 のとき、0 方向に丸める。
- 1 のとき、最も近い値に丸める。
- 2 のとき、正の無限大方向に丸める。
- 3 のとき、負の無限大方向に丸める。
- -1 のとき、不確定。

その他の数のとき、実装依存の動作をする。

[`<cfloat>`](../cfloat.md) ヘッダの他のマクロと異なり、`FLT_ROUNDS` の値は定数ではなく、[`<cfenv>`](../cfenv.md.nolink) ヘッダの [`fesetround`](../cfenv/fesetround.md.nolink)`()` による実行時の丸めモード変更が反映される。  
従って、`FLT_ROUNDS` は `#if` プリプロセッサディレクティブで使用することはできない。


##備考
[`fesetround`](../cfenv/fesetround.md.nolink)`()`、および、[`fegetround`](../cfenv/fegetround.md.nolink)`()` で用いられるマクロ（[`FE_DOWNWARD`](../cfenv/fe_downward.md.nolink)、[`FE_TONEAREST`](../cfenv/fe_tonearest.md.nolink)、[`FE_TOWARDZERO`](../cfenv/fe_towardzero.md.nolink)、[`FE_UPWARD`](../cfenv/fe_upward.md.nolink)）の値は、本マクロの値と対応しているわけでは無いため注意。


##例
```cpp
#include <iostream>
#include <cfloat>
#include <cfenv>

int main()
{
  std::cout << "FLT_ROUNDS = " << FLT_ROUNDS << '\n';
  std::cout << std::fesetround(FE_TOWARDZERO) << '\n';
  std::cout << "FLT_ROUNDS = " << FLT_ROUNDS << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* <cfenv>[link ../cfenv.md.nolink]
* cout[link ../iostream/cout.md]
* FLT_ROUNDS[color ff0000]
* fesetround[link ../cfenv.md.nolink]
* FE_TOWARDZERO[link ../cfenv/fe_towardzero.md.nolink]

###出力例
```
FLT_ROUNDS = 1
0
FLT_ROUNDS = 0
```
