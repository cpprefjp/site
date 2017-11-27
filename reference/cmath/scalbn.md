# scalbn
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float scalbn(float x, int n);
  double scalbn(double x, int n);
  long double scalbn(long double x, int n);

  double scalbn(Integral x, int n);

  float scalbnf(float x, int n);                // C++17 から
  long double scalbnl(long double x, int n);    // C++17 から

  // 乗数としてlong int型を受け取るバージョン
  float scalbln(float x, long int n);
  double scalbln(double x, long int n);
  long double scalbln(long double x, long int n);

  double scalbln(Integral x, long int n);

  float scalblnf(float x, long int n);              // C++17 から
  long double scalblnl(long double x, long int n);  // C++17 から
}
```
* Integral[italic]

## 概要
`x` に、浮動小数点数の内部表現の基数 [`FLT_RADIX`](/reference/cfloat/flt_radix.md) の `n` 乗を掛けた値を効率的に（通常は [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<sup>n</sup> を明示的には計算せずに）計算する。scalbは「scale binary」を意味する。

この関数は、[`FLT_RADIX`](/reference/cfloat/flt_radix.md) が `2` であるシステム上では、[`ldexp()`](ldexp.md) 関数と同等である。


## 戻り値
<code>x * [FLT_RADIX](/reference/cfloat/flt_radix.md)<sup>n</sup></code>

オーバーフローエラー、アンダーフローエラーが発生する可能性がある。


## 備考
- この関数は元々 `scalb()` という名前で提案されていたが、非標準の同名関数が広く実装されていた。そのため、`new` の意味を持つ `n` を関数名の末尾に付けて `scalbn()` 関数として標準ライブラリに定義された。
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `n = 0` の場合、戻り値は `x` となる。
	- `x = ±∞` の場合、戻り値は `±∞` となる。
	- もしオーバーフローエラーやアンダーフローエラーを起こさなければ、結果は正確で現在の丸め方式には依存しない。

- `scalbln()` 関数は、パラメータ `n` の型が `long int` であることを除いて、`scalbn()` 関数と同等である。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  // 3.0 * (FLT_RADIX^4)
  double result = std::scalbn(3.0, 4);
  std::cout << result << std::endl;
}
```
* std::scalbn[color ff0000]

### 出力例
```
48
```

### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  double scalbn(double x, int n)
  {
    return x * std::pow(static_cast<double>(FLT_RADIX), n);
  }

  float scalbn(float x, int n)
  {
    return x * std::pow(static_cast<float>(FLT_RADIX), n);
  }

  long double scalbn(long double x, int n)
  {
    return x * std::pow(static_cast<long double>(FLT_RADIX), n);
  }
}
```
* std::pow[link pow.md]


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [WG14 N657 Floating-Point and Complex Arithmetic Enhancements](http://www7.open-std.org/JTC1/SC22/WG14/www/docs/n657.ps)

