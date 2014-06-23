#conj
```cpp
namespace std {
  template <class T>
  complex<T> conj(const complex<T>& x);

  ComplexType conj(ArithmeticType x);	// 追加のオーバーロード：C++11 から
}
```

##概要
共役複素数を得る。conj は conjugate（共役）の略。

なお、C++11 で追加されたオーバーロードは、以下のように規定されている。

- 実引数の型が `long double` の場合、`complex<long double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `double` か整数型の場合、`complex<double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `float` の場合、`complex<float>` にキャストされているかのように振る舞う。

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


##戻り値
引数 `x` の共役複素数


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::cout << "conj( " << c << " ) = " << std::conj(c) << std::endl;
}
```
* conj[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
conj( (1,2) ) = (1,-2)
```


##参照
|                                    |                                        |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |
