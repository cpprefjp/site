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

通常、浮動小数点数を文字列などに変換する場合には出力精度 (小数点以下の桁数) として[`digits10`](digits10.md) (デフォルト) を使用すれば十分である。しかしその精度では、下位数ビットが異なる値を同値とみなしてしまう場合がある。`max_digits10`を出力精度として使用することで、そのような値の違いに気づくことができる。

`max_digits10`は [`digits`](digits.md) を用いて次のように計算できる：  

  `(Is radix power of 10) ? digits * log10(radix) : ceil(1 + digits * log10(radix))`


対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ |
|---------------|----------------|
| `float`       | [`FLT_DECIMAL_DIG`](/reference/cfloat/flt_decimal_dig.md)  |
| `double`      | [`DBL_DECIMAL_DIG`](/reference/cfloat/dbl_decimal_dig.md)  |
| `long double` | [`LDBL_DECIMAL_DIG`](/reference/cfloat/ldbl_decimal_dig.md) |

なお、`is_specialized == false`もしくは浮動小数点数型以外の場合、`max_digits10`は`0`となる。


## 例
```cpp example
#include <iostream>
#include <limits>
#include <cmath>
#include <sstream>
#include <bitset>
#include <cstring>

std::string make_float_string(float f, int digits) {
  std::stringstream s;
  s.precision(digits);
  s << std::scientific << f;
  return s.str();
}

std::uint32_t float_to_uint(float f) {
    std::uint32_t result = 0;
    std::memcpy(&result, &f, sizeof(std::uint32_t));
    return result;
}

std::string make_bit_string(float f) {
    return std::bitset<32>(float_to_uint(f)).to_string();
}

int main()
{
  using limits = std::numeric_limits<float>;

  std::cout << "float digits10 : " << limits::digits10 << std::endl;
  std::cout << "float max_digits10 : " << limits::max_digits10 << std::endl;
  std::cout << std::endl;

  // digits10とmax_digits10での、
  // 下位数ビットが異なる浮動小数点数の出力のされ方を比較
  for (int digits : {limits::digits10, limits::max_digits10}) {
    std::cout << "[digits : " << digits << ']' << std::endl;
    std::cout << make_float_string(3.145900f, digits) << std::endl;
    std::cout << make_float_string(std::nextafter(3.145900f, 1.0f), digits) << std::endl;
  }

  // それぞれの値のビット列を出力
  std::cout << "[bit string]" << std::endl;
  std::cout << make_bit_string(3.145900f) << std::endl;
  std::cout << make_bit_string(std::nextafter(3.145900f, 1.0f)) << std::endl;
}
```
* max_digits10[color ff0000]
* digits10[link digits10.md]
* std::stringstream[link /reference/sstream/basic_stringstream.md]
* precision[link /reference/ios/ios_base/precision.md]
* std::scientific[link /reference/ios/scientific.md]
* s.str()[link /reference/sstream/basic_stringstream/str.md]
* std::nextafter[link /reference/cmath/nextafter.md]

### 出力例
```
float digits10 : 6
float max_digits10 : 9

[digits : 6]
3.145900e+00
3.145900e+00
[digits : 9]
3.145900011e+00
3.145899773e+00
[bit string]
01000000010010010101011001101101
01000000010010010101011001101100
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.5.4 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]

### 参照
* [A Proposal to add a max significant decimal digits value to the C++ Standard Library Numeric limits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1822.pdf)
