#pow
```cpp
namespace std {
  template <class T>
  complex<T> pow(const complex<T>& x, const complex<T>& y);

  template <class T>
  complex<T> pow(const complex<T>& x, const T& y);

  template <class T>
  complex<T> pow(const T& x, const complex<T>T& y);

  ComplexType pow(ArithmeticType1 x, ArithmeticType2 y);	// 追加のオーバーロード：C++11 から
}
```

##概要
複素数値の累乗を得る。pow は power（累乗、指数）の略。

なお、C++11 で追加されたオーバーロードは、以下のように規定されている。

- いずれかの実引数の型が `complex<long double>` か `long double` の場合、両方の引数が `complex<long double>` にキャストされているかのように振る舞う。
- そうでなくて、いずれかの実引数の型が `complex<double>` か `double` か整数型の場合、両方の引数が `complex<double>` にキャストされているかのように振る舞う。
- そうでなくて、eいずれかの実引数の型が `complex<float>` か `float` の場合、両方の引数が `complex<float>` にキャストされているかのように振る舞う。

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


##戻り値
引数 `x` の `y` 乗。[`exp`](exp.md)`(y * `[`log`](log.md)`(x))` で定義される。
`pow(0, 0)` の戻り値は処理系定義である。


##備考
- 引数 `x` に対する分岐截断は負の実軸に沿っている。
- C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `cpow`、`cpowf`、`cpowl`の 3 つ。それぞれ C++ の `pow<double>`、`pow<float>`、`pow<long double>` に相当）では、
本関数が [`exp`](exp.md)`(y * `[`log`](log.md)`(x))` で定義されるとの記載は無く、処理系が ISO IEC 60559 に準拠している場合でもそのように計算することが可能である旨のみの記載となっている。  
また、処理系が ISO IEC 60559 に準拠している場合、結果のパートを計算する際に適切な浮動小数点例外を引き起こすこと、および、偽の浮動小数点例外を引き起こしても良いことが記載されている。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、
C++ の規格書には該当する記載を見つける事ができなかった。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::complex<float> d(3.0, 4.0);
  std::cout << "pow( " << c << ", " << d << " ) = " << std::pow(c, d) << std::endl;
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
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


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
