# LDBL_SNAN
* cfloat[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define LDBL_SNAN see below
```

## 概要
`long double`型のシグナルNaN (signaling NaN) を表す定数式マクロ。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`signaling_NaN`](/reference/limits/numeric_limits/signaling_nan.md)`()`と等しい。

C23で`<float.h>`に追加されたマクロであり、C++26で`<cfloat>`に取り込まれた。


## 備考
- シグナルNaNがサポートされない場合、このマクロは定義されない


## 例
```cpp example
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  long double x = LDBL_SNAN;
  std::cout << std::boolalpha << std::isnan(x) << std::endl;
}
```
* LDBL_SNAN[color ff0000]
* std::isnan[link /reference/cmath/isnan.md]

### 出力
```
true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`FLT_SNAN`](flt_snan.md): `float`型のシグナルNaN
- [`DBL_SNAN`](dbl_snan.md): `double`型のシグナルNaN
- [`NAN`](/reference/cmath/nan.md): `float`型のquiet NaN


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、このマクロが`<cfloat>`に追加された
