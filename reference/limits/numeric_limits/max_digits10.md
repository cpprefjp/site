# max_digits10
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr int max_digits10;
```

## 概要
`max_digits10`は、`T`が浮動小数点数型のとき意味を持つ。  

基数`radix`の浮動小数点数を、仮数部がn桁で基数10の浮動小数点数に変換してまた元の基数`radix`の浮動小数点数に変換することを考える。  
`max_digits10`は、上の変換によって元の浮動小数点数の値が変化しないようなnのうち、最小のものを表す。  
したがって、浮動小数点数を文�列などに変換する場合に、�確な値を保持するために使用できる。  

`max_digits10`は [`digits`](digits.md) を用いて次のように計算できる：  

  `(Is radix power of 10) ? digits * log10(radix) : ceil(1 + digits * log10(radix))`


対応するマク�を次の表に挙げる。

| 型            | 対応するマク� |
|---------------|----------------|
| `float`       | [`FLT_DECIMAL_DIG`](/reference/cfloat/flt_decimal_dig.md)  |
| `double`      | [`DBL_DECIMAL_DIG`](/reference/cfloat/dbl_decimal_dig.md)  |
| `long double` | [`LDBL_DECIMAL_DIG`](/reference/cfloat/ldbl_decimal_dig.md) |

なお、`is_specialized == false`もしくは浮動小数点数型以外の場合、`max_digits10`は`0`となる。


## 例
```cpp example
#include <iostream>
#include <limits>
#include <sstream>

int main()
{
  constexpr int d = std::numeric_limits<float>::max_digits10;
  std::cout << d << std::endl;

  float f = 3.145900F;

  std::stringstream s;
  s.precision(d);
  s << std::scientific << f;

  std::cout << s.str() << std::endl;
}
```
* max_digits10[color ff0000]
* std::stringstring[link /reference/sstream/basic_stringstream.md.nolink]
* precision[link /reference/ios/ios_base/precision.md]
* std::scientific[link /reference/ios/scientific.md]
* s.str()[link /reference/sstream/basic_stringstream/str.md.nolink]

### 出力例
```
9
3.145900011e+000
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.5.4
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017

### 参照
* [A Proposal to add a max significant decimal digits value to the C++ Standard Library Numeric limits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1822.pdf)


