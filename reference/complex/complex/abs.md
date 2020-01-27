# abs
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  T abs(const complex<T>& x);
}
```

## 概要
複素数値の絶対値（大きさ・マグニチュード）を得る。abs は absolute value（絶対値）の略。


## 戻り値
引数 `x` の絶対値（大きさ・マグニチュード）


## 備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
	なお、C99 の規格にある本関数と�価の関数群（`complex.h` ヘッダの `cabs`、`cabsf`、`cabsl` の 3 つ。それぞれ C++ の `abs<double>`、`abs<float>`、`abs<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している（マク� `__STDC_IEC_559_COMPLEX__` が `1` に定義されている）場合、`abs(x +` *i* `y) =` [`hypot`](/reference/cmath/hypot.md)`(x, y)` と規定されている（*i* は虚数単位）。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマク� `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 絶対値の算出については、一部の算術型、および、[`valarray`](/reference/valarray/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。  

	| 引数の型                                           | 関数                                          | ヘッダ                               | 備考       |
	|----------------------------------------------------|-----------------------------------------------|--------------------------------------|------------|
	| `float`                                            | [`abs`](/reference/cmath/abs.md)              | [`cmath`](/reference/cmath.md)       |            |
	|                                                    | [`fabs`](/reference/cmath/fabs.md)            | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                           | [`abs`](/reference/cmath/abs.md)              | [`cmath`](/reference/cmath.md)       |            |
	|                                                    | [`fabs`](/reference/cmath/fabs.md)            | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                                      | [`abs`](/reference/cmath/abs.md)              | [`cmath`](/reference/cmath.md)       |            |
	|                                                    | [`fabs`](/reference/cmath/fabs.md)            | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                                       | [`abs`](/reference/cmath/abs.md)              | [`cmath`](/reference/cmath.md)       | C++11 から |
	|                                                    | [`fabs`](/reference/cmath/fabs.md)            | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `int`                                              | [`abs`](/reference/cstdlib/abs.md.nolink)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long int`                                         | [`labs`](/reference/cstdlib/labs.md.nolink)   | [`cstdlib`](/reference/cstdlib.md)   |            |
	|                                                    | [`abs`](/reference/cstdlib/abs.md.nolink)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long long int`                                    | [`llabs`](/reference/cstdlib/llabs.md.nolink) | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	|                                                    | [`abs`](/reference/cstdlib/abs.md.nolink)     | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	| [`valarray`](/reference/valarray/valarray.md)`<T>` | [`abs`](/reference/valarray/valarray/abs.md)  | [`valarray`](/reference/valarray.md) |            |

	なお、上記のうち、任意の整数型に対する [`abs`](/reference/cmath/abs.md) については C++11 で追加されたが、ある種の問題を引き起こすことから、今後削除される可能性がある。[Validity and return type of std::abs(0u) is unclear](http://wg21.cmeerw.net/lwg/issue2192) 参照。  
	また、浮動小数点版、および、整数版の `abs` については今後、全て [`cmath`](/reference/cmath.md) [`cstdlib`](/reference/cstdlib.md) 両方のヘッダで利用できるようになるかもしれない。[\<cstdlib\> should declare abs(double)](http://wg21.cmeerw.net/lwg/issue2294) 参照。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  double result = std::abs(c);
  std::cout << "abs( " << c << " ) = " << result << std::endl;
}
```
* std::abs[color ff0000]

### 出力
```
abs( (1,2) ) = 2.23607
```


## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                               | 説明                                   |
|------------------------------------|----------------------------------------|
| [`real`](real_free.md)             | 複素数の実部を得る。                   |
| [`imag`](imag_free.md)             | 複素数の虚部を得る。                   |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
| [`polar`](polar.md)                | 指定した絶対値と偏角の複素数値を得る。 |
| [`abs`](/reference/cmath/abs.md)   | 絶対値を得る。（浮動小数点版）         |
| [`fabs`](/reference/cmath/fabs.md) | 絶対値を得る。（浮動小数点版）         |
| [`abs`](/reference/cstdlib/abs.md.nolink) | 絶対値を得る。（整数版）               |
