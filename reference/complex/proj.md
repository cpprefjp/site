#proj
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  complex<T> proj(const complex<T>& x);

  complex<Promoted> proj(Arithmetic x);	// 追加のオーバーロード：C++11 から
}
```
* Promoted[italic]
* Arithmetic[italic]

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
- 本関数は、C99 の規格にある `cproj`（より正確には `complex.h` ヘッダの `cproj`、`cprojf`、`cprojl` の 3 つ。それぞれ C++ の `proj<double>`、`proj<float>`、`proj<long double>` に相当）と同等である。  
- 本関数は、`x` が無限大ではない場合、`x` そのものを返す。ここで「無限大ではない」とは、`!`[`isinf`](/reference/cmath/isinf.md.nolink)`(`[`real`](real.md)`(x)) && !`[`isinf`](/reference/cmath/isinf.md.nolink)`(`[`imag`](imag.md)`(x))` である。  
	`x` が無限大の場合、[`complex`](complex/op_constructor.md)`<T>(`[`numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`infinity`](/reference/limits/numeric_limits/infinity.md)`(),` [`copysign`](/reference/cmath/copysign.md.nolink)`(T(),` [`imag`](imag.md)`(x)))` を返す。


##例
```cpp
#include <iostream>
#include <complex>
#include <limits>

template <class T>
void print_proj(const std::complex<T>& c)
{
  std::complex<T> result = std::proj(c);

  std::cout << "proj( " << c << " ) = " << result << std::endl;
}

int main()
{
  print_proj(std::complex<double>(1.0, 2.0));
  print_proj(std::complex<double>(std::numeric_limits<double>::infinity(), 0.0));
  print_proj(std::complex<double>(std::numeric_limits<double>::infinity(), -0.0));
  print_proj(std::complex<double>(std::numeric_limits<double>::quiet_NaN(), std::numeric_limits<double>::infinity()));
  print_proj(std::complex<double>(std::numeric_limits<double>::quiet_NaN(), -std::numeric_limits<double>::infinity()));
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
また、[`numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`is_iec559`](/reference/limits/numeric_limits/is_iec559.md)`()` が `true` でない場合、結果が異なる可能性がある。


##バージョン
##言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- libstdc++ では（規格通りに）C++11 以降のモードでなければ本関数は使用できないが、libc++ では C++98 モードでも使用することができる。（上記の [Clang](/implementation.md#clang) が C++11 モードになっていないのはそのため）
- libstdc++ では、通常 glibc の対応する関数を呼び出すが、glibc 2.18 以前のバージョンには NAN の取り扱いに、更に、2.11.\* 以前のバージョンには通常の値の取り扱いにもバグがある。
	また、glibc を使用していない libstdc++ も 4.9.0 現在、glibc 2.11.\* 以前のバージョンと同様のバグがある。


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


##参照
- [LWG Issue 781. `std::complex` should add missing C99 functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#781)

