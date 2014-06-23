#norm
```cpp
namespace std {
  template <class T>
  T norm(const complex<T>& x);

  FloatingPointType norm(ArithmeticType x);	// 追加のオーバーロード：C++11 から
}
```

##概要
複素数体のノルム（field norm。絶対値の 2 乗）を得る。

なお、C++11 で追加されたオーバーロードは、以下のように規定されている。

- 実引数の型が `long double` の場合、`complex<long double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `double` か整数型の場合、`complex<double>` にキャストされているかのように振る舞う。
- そうでなくて、実引数の型が `float` の場合、`complex<float>` にキャストされているかのように振る舞う。

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


##戻り値
引数 `x` のノルム


##備考
- ここで言う「ノルム」は複素数を体として実数体の拡大体と見た際のノルム（`x * `[`conj`](conj.md)`(x)`）である。  
複素数を複素平面上の点と見たときの原点との距離（絶対値：[`abs`](abs.md)）ではないことに注意。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::cout << "norm( " << c << " ) = " << std::norm(c) << std::endl;
}
```
* norm[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
norm( (1,2) ) = 5
```


##参照
|                                    |                                        |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |

- [ノルム (体論) - Wikipedia](http://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%AB%E3%83%A0_(%E4%BD%93%E8%AB%96))
- [ノルム - Wikipedia](http://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%AB%E3%83%A0)
