# norm
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  T norm(const complex<T>& x);           // (1) C++03

  template <class T>
  constexpr T norm(const complex<T>& x); // (1) C++20

  Promoted norm(Arithmetic x);           // (2) C++11 追加のオーバー�ード
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
複素数体のノルム（field norm。絶対値の 2 乗）を得る。

なお、C++11 で追加されたオーバー�ードは、以下のように規定されている。

- 実引数の型が `long double` の場合、`complex<long double>` に�ャストされているかのように振る舞う。
- そうでなくて、実引数の型が `double` か整数型の場合、`complex<double>` に�ャストされているかのように振る舞う。
- そうでなくて、実引数の型が `float` の場合、`complex<float>` に�ャストされているかのように振る舞う。

また、これらの追加のオーバー�ードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


## 戻り値
引数 `x` のノルム


## 備考
- ここで言う「ノルム」は複素数を体として実数体の拡大体と見た際のノルム（`x *` [`conj`](conj.md)`(x)`）である。  
	複素数を複素平面上の点と見たときの原点との距離（絶対値：[`abs`](abs.md)）ではないことに注意。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  double result = std::norm(c);
  std::cout << "norm( " << c << " ) = " << result << std::endl;
}
```
* std::norm[color ff0000]

### 出力
```
norm( (1,2) ) = 5
```


## バージョン
### 言語
- C++98（追加のオーバー�ードは C++11 から）

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4（追加のオーバー�ード含む）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバー�ード以外）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバー�ード含む）
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                               | 説明                                   |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |


## 参照
- [ノルム (体論) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%AB%E3%83%A0_(%E4%BD%93%E8%AB%96))
- [ノルム - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%AB%E3%83%A0)
- [P0415R1 Constexpr for `std::complex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0415r1.html)
