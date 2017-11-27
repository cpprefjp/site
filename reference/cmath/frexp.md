# frexp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float frexp(float value, int* exp);
  double frexp(double value, int* exp);
  long double frexp(long double value, int* exp);

  double frexp(Integral value, int* exp);           // C++11 から

  float frexpf(float value, int* exp);              // C++17 から
  long double frexpl(long double value, int* exp);  // C++17 から
}
```
* Integral[italic]

## 概要
`frexp`関数 (fraction and exponent)は、浮動小数点数`value`を、正規化された仮数部と 2 の累乗へ分解する。

この関数は、与えられた浮動小数点数`value`を仮数部と指数部に分解し、仮数部を戻り値で返し、指数を`*exp`に書き込んで返す。

この関数と反対に、[`std::ldexp()`](ldexp.md)関数を使用することで、仮数部と指数部の値から浮動小数点数を作り出せる。


## 戻り値
引数 `value` が浮動小数点数ではない、もしくは2の乗数が `int` の範囲外である場合、戻り値は未規定。

そうでない場合、戻り値を `x` とすると `x` の絶対値は `[1/2, 1)` の範囲もしくはゼロとなり、`*exp` は <code>value = x * 2<sup>*exp</sup></code> となるように設定される。

`value` がゼロの場合は、戻り値と `*exp` に書き込む値はどちらもゼロとなる。


## 備考
C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）

- `value = ±0` の場合、戻り値は `±0` となり、`*exp` にはゼロが設定される。
- `value = ±∞` の場合、戻り値は `±∞` となり、`*exp` には未規定の値が設定される。
- `value` が NaN の場合、戻り値は NaN となり、`*exp` には未規定の値が設定される。
- `frexp` は浮動小数点例外を全く発生させない。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  double value = 48.0;

  int exp = 0;
  double x = std::frexp(value, &exp);

  std::cout << value << " = " << x << " * 2^" << exp << std::endl;
}
```
* std::frexp[color ff0000]

### 出力例
```
48 = 0.75 * 2^6
```


## 参照
- [Why does `frexp()` not yield scientific notation?](http://stackoverflow.com/questions/24928833/why-does-frexp-not-yield-scientific-notation)
    - `frexp()`が戻り値を`[1, 2)`の範囲ではなく、`[0.5, 1)`の範囲に収めるようにしている理由は、IEEE 754およびISO/IEC 60559が策定される前に作られた関数であることが理由と考えられる

