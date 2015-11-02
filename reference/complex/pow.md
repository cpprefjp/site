#pow
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T> pow(const complex<T>& x, const complex<T>& y);		// (1)

  template <class T>
  complex<T> pow(const complex<T>& x, const T& y);				// (2)

  template <class T>
  complex<T> pow(const T& x, const complex<T>& y);				// (3)

  template <class T>
  complex<T> pow(const complex<T>& x, int y);					// (4) C++03 まで

  Promoted pow(ArithmeticOrComplex1 x, ArithmeticOrComplex2 y);	// (5) 追加のオーバーロード：C++11 から
}
```
* Promoted[italic]
* ArithmeticOrComplex1[italic]
* ArithmeticOrComplex2[italic]

##概要
複素数値の累乗を得る。pow は power（累乗、指数）の略。

なお、C++11 で追加されたオーバーロード (5) は、少なくとも 1 つの実引数が `complex<T>` の場合にオーバーロード解決の際に考慮され、以下のように規定されている。

- いずれかの実引数の型が `complex<long double>` か `long double` の場合、両方の引数が `complex<long double>` にキャストされているかのように振る舞う。
- そうでなくて、いずれかの実引数の型が `complex<double>` か `double` か整数型の場合、両方の引数が `complex<double>` にキャストされているかのように振る舞う。
- そうでなくて、いずれかの実引数の型が `complex<float>` か `float` の場合、両方の引数が `complex<float>` にキャストされているかのように振る舞う。

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


##戻り値
引数 `x` の `y` 乗。[`exp`](exp.md)`(y *` [`log`](log.md)`(x))` で定義される。`pow(0, 0)` の戻り値は処理系定義である。


##備考
- 引数 `x` に対する分岐截断は負の実軸に沿っている。
- C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `cpow`、`cpowf`、`cpowl` の 3 つ。それぞれ C++ の `pow<double>`、`pow<float>`、`pow<long double>` に相当）では、本関数が [`exp`](exp.md)`(y *` [`log`](log.md)`(x))` で定義されるとの記載は無く、処理系が ISO IEC 60559 に準拠している場合でもそのように計算することが可能である旨のみの記載となっている。  
	また、処理系が ISO IEC 60559 に準拠している場合、結果のパートを計算する際に適切な浮動小数点例外を引き起こすこと、および、偽の浮動小数点例外を引き起こしても良いことが記載されている。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 累乗の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                         | ヘッダ                               | 備考       |
	|-------------------------------------------|----------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`pow`](/reference/cmath/pow.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`pow`](/reference/cmath/pow.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`pow`](/reference/cmath/pow.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の算術型                              | [`pow`](/reference/cmath/pow.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`pow`](/reference/valarray/valarray/pow.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::complex<double> d(3.0, 4.0);

  std::complex<double> result = std::pow(c, d);
  std::cout << "pow( " << c << ", " << d << " ) = " << result << std::endl;
}
```
* pow[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
pow( (1,2), (3,4) ) = (0.12901,0.0339241)
```


##バージョン
###言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4（追加のオーバーロード含む）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバーロード以外）
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバーロード含む）
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- libstdc++ では、バージョンによって C++11 モードの挙動が異なる。
	- 4.3.6 では第 2 引数が `int` のオーバーロード (4) が無効化されていない。また、追加のオーバーロード (5) は `complex<T>` でない方の引数の型が算術型でなくても、算術型への暗黙の型変換が可能であれば、適用されてしまう。さらに、追加のオーバーロード (5) の結果型は、引数の型が `complex<float>` と整数型の場合、`complex<float>`　になってしまう。
	- 4.4.7、4.5.4 では、第 2 引数が `int` のオーバーロード (4) は無効化されているが、追加のオーバーロード (5) は `complex<T>` でない方の引数の型が算術型でなくても、算術型への暗黙の型変換が可能であれば、適用されてしまう。さらに、追加のオーバーロード (5) の結果型は、引数の型が `complex<float>` と整数型の場合、`complex<float>`　になってしまう。
	- 4.6.4 から 4.8.2 の間は第 2 引数が `int` のオーバーロード (4) は無効化されている。また、追加のオーバーロード (5) は、引数の型が `complex<T>` と算術型でなければ適用されない。（最も規格に準拠した挙動である）
	- 4.9.0 では第 2 引数が `int` のオーバーロード (5) は無効化されていないが、追加のオーバーロード (5) は、引数の型が `complex<T>` と算術型でなければ適用されない。
	なお、いずれのバージョンでも C++03 モードでは追加のオーバーロード (5) は無効化されている。
- libc++ では、C++03 モードでも第 2 引数が `int` のオーバーロード (4) は使用できず、また、追加のオーバーロード (5) が使用できる。


##参照
|                                    |                                           |
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
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`sin`](sin.md)                    | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`pow`](/reference/cmath/pow.md)   | 実数の累乗を求める。                      |
