# log
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T> log(const complex<T>& x);
}
```

## 概要
複素数の自然対数（ネイピア数 e を底とした対数）を得る。log は logarithm（対数）、あるいは、logarithmic function（対数関数）の略。


## 戻り値
引数 `x` の自然対数（ネイピア数 e を底とした対数）。本関数の値域は、実軸は全域で、虚軸は `[ -`*i*`π, `*i*`π ]` の範囲である。
`x` が負の実数の場合、[`imag`](imag.md)`(log(x))` は `π` である（ただし、備考参照）。


## 備考
- 分岐截断は負の実軸に沿っている。
- 規格には、上記の戻り値の記載、および、分岐截断以外の規定・説明は無い。  
	なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `clog`、`clogf`、`clogl`の 3 つ。それぞれ C++ の `log<double>`、`log<float>`、`log<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `log(`[`conj`](conj.md)`(x)) =` [`conj`](conj.md)`(log(x))`。
	- `log(complex(-0, +0))` は `complex(-∞, +π)` を返し、ゼロ除算の浮動小数点例外（`FE_DIVBYZERO`）を引き起こす。
	- `log(complex(+0, +0))` は `complex(-∞, +0)` を返し、ゼロ除算の浮動小数点例外（`FE_DIVBYZERO`）を引き起こす。
	- 有限の `x` に対して、`log(complex(x, +∞))` は `complex(+∞, +π/2)` を返す。
	- 有限の `x` に対して、`log(complex(x, NaN))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- 有限で正の符号を持つ（`+0` を含む）`y` に対して、`log(complex(-∞, y))` は `complex(+0, +π)` を返す。
	- 有限で正の符号を持つ（`+0` を含む）`y` に対して、`log(complex(+∞, y))` は `complex(+∞, +0)` を返す。
	- `log(complex(-∞, +∞))` は `complex(+∞, +3π/4)` を返す。
	- `log(complex(+∞, +∞))` は `complex(+∞, +π/4)` を返す。
	- `log(complex(±∞, NaN))` は `complex(+∞, NaN)` を返す。
	- 有限の `y` に対して、`log(complex(NaN, y))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `log(complex(NaN, +∞))` は `complex(+∞, NaN)` を返す。
	- `log(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 規格には、上記の「戻り値」に記載の通り、`x` が負の実数の場合には戻り値の虚部は `π` との記載があるが、値域の虚部が `-π` を含むことからも分かるように、`x` の実部が負で虚部が `-0` の場合（この場合も `x` は負の実数と考えられる）には戻り値の虚部は `-π` である。なお、C99 の規格にはそのような記載はない。
- 本関数は数学的には `complex(`[`log`](/reference/cmath/log.md)`(`[`abs`](abs.md)`(x)),` [`arg`](arg.md)`(x))` と等価である。
- 自然対数の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                         | ヘッダ                               | 備考       |
	|-------------------------------------------|----------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`log`](/reference/cmath/log.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`log`](/reference/cmath/log.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`log`](/reference/cmath/log.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`log`](/reference/cmath/log.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`log`](/reference/valarray/valarray/log.md) | [`valarray`](/reference/valarray.md) |            |


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::log(c);
  std::cout << "log( " << c << " ) = " << result << std::endl;
}
```
* std::log[color ff0000]

### 出力
```
log( (1,2) ) = (0.804719,1.10715)
```


## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- libstdc++ では、通常 glibc の対応する関数を呼び出すため、上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たす。  
	しかし、glibc を使用していない libstdc++、および、libc++ は、当該要件を満たしていない（満たすつもりが無い？）ようである。


## 関連項目
| 名前                               | 説明                                      |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の双曲線逆余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の双曲線逆正弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の双曲線逆正接を求める。            |
| [`cos`](cos.md)                    | 複素数の余弦を求める。                    |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。              |
| [`exp`](exp.md)                    | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                    | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`log`](/reference/cmath/log.md)   | 実数の自然対数を求める。                  |
