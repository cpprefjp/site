# asin
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  complex<T> asin(const complex<T>& x);
}
```

## 概要
複素数値の逆�弦（アークサイン：arc sine）を得る。


## 戻り値
引数 `x` の逆�弦。本関数の値域は、虚軸方向は全域で、実軸方向は `[-π/2, +π/2]` の区間である。


## 備考
- 本関数は実軸の区間 `[-1, +1]` の外側を分岐截�とする。
- 本関数は、C99 の規格にある `casin`（より�確には `complex.h` ヘッダの `casin`、`casinf`、`casinl` の 3 つ。それぞれ C++ の `asin<double>`、`asin<float>`、`asin<long double>` に相当）と�価である。  
	C99 では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、`casin(x) = -`*i* `casinh(`*i* `x)` と規定されている（*i* は虚数単位）。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマク� `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 逆�弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`asin`](/reference/cmath/asin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`asin`](/reference/cmath/asin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`asin`](/reference/cmath/asin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`asin`](/reference/cmath/asin.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`asin`](/reference/valarray/valarray/asin.md) | [`valarray`](/reference/valarray.md) |            |


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::asin(c);
  std::cout << "asin( " << c << " ) = " << result << std::endl;
}
```
* std::asin[color ff0000]

### 出力
```
asin( (1,2) ) = (0.427079,1.52857)
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015, 2017

### 備考
- libstdc++ では（規格通りに）C++11 以降のモードでなければ本関数は使用できないが、libc++ では C++98 モードでも使用することができる。（上記の [Clang](/implementation.md#clang) が C++11 モードになっていないのはそのため）


## 関連項目
| 名前                               | 説明                                      |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆�接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の逆双曲線余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の逆双曲線�弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の逆双曲線�接を求める。            |
| [`cos`](cos.md)                    | 複素数の余弦を求める。                    |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。              |
| [`exp`](exp.md)                    | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                    | 複素数の�弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線�弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の�接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線�接を求める。              |
| [`asin`](/reference/cmath/asin.md) | 実数の逆�弦を求める。                    |
