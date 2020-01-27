# FLT_ROUNDS
* cfloat[meta header]
* macro[meta id-type]

```cpp
# define FLT_ROUNDS implementation-defined
```

## 概要
`FLT_ROUNDS` は、浮動小数点数の加算の丸めモードを表すマク�である。

`FLT_ROUNDS` が

- 0 のとき、0 方向に丸める。
- 1 のとき、最も近い値に丸める。
- 2 のとき、�の無限大方向に丸める。
- 3 のとき、負の無限大方向に丸める。
- -1 のとき、不確定。

その他の数のとき、実装依�の動作をする。

[`<cfloat>`](../cfloat.md) ヘッダの他のマク�と異なり、`FLT_ROUNDS` の値は定数ではなく、[`<cfenv>`](../cfenv.md) ヘッダの [`fesetround`](../cfenv/fesetround.md)`()` による実行時の丸めモード変更が反映される。  
従って、`FLT_ROUNDS` は `#if` プリプ�セッサディレクティブで使用することはできない。


## 備考
[`fesetround`](../cfenv/fesetround.md)`()`、および、[`fegetround`](../cfenv/fegetround.md)`()` で用いられるマク�（[`FE_DOWNWARD`](../cfenv/fe_downward.md)、[`FE_TONEAREST`](../cfenv/fe_tonearest.md)、[`FE_TOWARDZERO`](../cfenv/fe_towardzero.md)、[`FE_UPWARD`](../cfenv/fe_upward.md)）の値は、本マク�の値と対応しているわけでは無いため注意。


## 例
```cpp example
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
* FLT_ROUNDS[color ff0000]
* std::fesetround[link ../cfenv.md]
* FE_TOWARDZERO[link ../cfenv/fe_towardzero.md]

### 出力例
```
FLT_ROUNDS = 1
0
FLT_ROUNDS = 0
```
