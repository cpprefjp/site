#proj (C++11)
```cpp
namespace std {
  template<class T>
  complex<T> proj(const complex<T>& x);

  ComplexType proj(ArithmeticType x);	// 追加のオーバーロード：C++11 から
}
```

##概要
リーマン球面への射影（備考参照）を得る。proj は projection（射影、投射）の略。

なお、C++11 で追加されたオーバーロードは、以下のように規定されている。

- 実引数の型が `long double` の場合、`complex<long double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `double` か整数型の場合、`complex<double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `float` の場合、`complex<float>` にキャストされているかのように振る舞う。

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。

##戻り値
引数 `x` のリーマン球面への射影


##備考
`x` が無限大ではない場合、`x` そのものを返す。ここで「無限大ではない」とは、
`!`[`isinf`](/reference/cmath/isinf.md)`(`[`real`](real.md)`(x)) && !`[`isinf`](/reference/cmath/isinf.md)`(`[`imag`](imag.md)`(x))`
である。  
`x` が無限大の場合、[`complex`](complex/complex.md)`<T>(`[`numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`infinity`](/reference/limits/numeric_limits/infinity.md)`(), `[`copysign`](/reference/cmath/copysign.md)`(T(), `[`imag`](imag.md)`(x)))` を返す。


##例
```cpp
#include <iostream>
#include <complex>
#include <limits>

template<typename T>
void print_proj(const std::complex<T>& c)
{
  std::cout << "proj( " << c << " ) = " << std::proj(c) << std::endl;
}

int main()
{
  print_proj(std::complex<float>(1.0, 2.0));
  print_proj(std::complex<float>(std::numeric_limits<float>::infinity(), 0.0));
  print_proj(std::complex<float>(std::numeric_limits<float>::infinity(), -0.0));
  print_proj(std::complex<float>(std::numeric_limits<float>::quiet_NaN(), std::numeric_limits<float>::infinity()));
  print_proj(std::complex<float>(std::numeric_limits<float>::quiet_NaN(), -std::numeric_limits<float>::infinity()));
}
```
* proj[color ff0000]
* numeric_limits[link /reference/limits/numeric_limits.md]
* quiet_NaN[link /reference/limits/numeric_limits/quiet_nan.md]
* infinity[link /reference/limits/numeric_limits/infinity.md]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]
* limits[link /reference/limits.md]

###出力例
```
proj( (1,2) ) = (1,2)
proj( (inf,0) ) = (inf,0)
proj( (inf,-0) ) = (inf,-0)
proj( (nan,inf) ) = (inf,0)
proj( (nan,-inf) ) = (inf,-0)
```
無限大や NaN の出力は異なる可能性がある。  
また、[`numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`is_iec559`](/reference/limits/numeric_limits/is_iec559.md)`()` が `true` でない場合、結果が異なる可能性がある。


##バージョン
##言語
- C++11


##参照
|                                    |                                        |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |
