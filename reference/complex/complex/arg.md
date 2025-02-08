# arg
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  T
    arg(const complex<T>& x); // (1) C++03
  template <class T>
  constexpr T
    arg(const complex<T>& x); // (1) C++26

  complex<Promoted>
    arg(Arithmetic x);        // (2) C++11
  constexpr complex<Promoted>
    arg(Arithmetic x);        // (2) C++26
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
複素数値の偏角を得る。arg は argument（偏角）の略。

- (1) : `complex<T>`に対するオーバーロード
- (2) : 算術型に対する追加のオーバーロード

(2)は、以下のように振る舞う：

- 実引数の型が浮動小数点数型 `T` の場合、`complex<T>` にキャストされているかのように振る舞う
- そうでなくて、実引数が整数型の場合、`complex<double>` にキャストされているかのように振る舞う (C++23)

また、これらの追加のオーバーロードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


## 戻り値
引数 `x` の偏角。単位はラジアン。[`atan2`](/reference/cmath/atan2.md)`(`[`imag`](imag.md)`(x),` [`real`](real.md)`(x))`。


## 備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
	なお、C99 の規格にある本関数と等価の関数群（`complex.h` ヘッダの `carg`、`cargf`、`cargl` の 3 つ。それぞれ C++ の `arg<double>`、`arg<float>`、`arg<long double>` に相当）では、本関数は実軸の負の領域すべてを分岐截断とすること、および、戻り値は `[-π, π]` の区間であることが記載されている。
- [`atan2`](/reference/cmath/atan2.md) は、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠していない場合、両方の引数が `0` の場合には定義域エラー（domain error）としても良いとされているので注意（つまり、`0` の偏角を求めようとするとエラーとなる）。  
	ISO IEC 60559 に準拠している場合、両方の引数が `0` の場合には戻り値が `0` であることが規定されている。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  double result = std::arg(c);
  std::cout << "arg( " << c << " ) = " << result << std::endl;
}
```
* std::arg[color ff0000]

### 出力
```
arg( (1,2) ) = 1.10715
```


## バージョン
### 言語
- C++98（追加のオーバーロードは C++11 から）

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4（追加のオーバーロード含む） [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0（追加のオーバーロード以外） [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0（追加のオーバーロード含む） [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                               | 説明                                   |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型への対応が行われ、整数型も考慮されるようになった
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
