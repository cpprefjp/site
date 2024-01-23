# norm
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  T
    norm(const complex<T>& x); // (1) C++03
  template <class T>
  constexpr T
    norm(const complex<T>& x); // (1) C++20

  complex<Promoted>
    norm(Arithmetic x);        // (2) C++11
  constexpr complex<Promoted>
    norm(Arithmetic x);        // (2) C++26
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
複素数体のノルム（field norm。絶対値の 2 乗）を得る。

- (1) : `complex<T>`に対するオーバーロード
- (2) : 算術型に対する追加のオーバーロード

(2)は、以下のように振る舞う：

- 実引数の型が浮動小数点数型 `T` の場合、`complex<T>` にキャストされているかのように振る舞う
- そうでなくて、実引数が整数型の場合、`complex<double>` にキャストされているかのように振る舞う (C++23)

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


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
- C++98（追加のオーバーロードは C++11 から）

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4（追加のオーバーロード含む）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバーロード以外）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバーロード含む）
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
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型への対応が行われ、整数型も考慮されるようになった
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で(2)が`constexpr`対応した
