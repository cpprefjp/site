# polar
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T> polar(const T& rho, const T& theta = 0);
}
```

## 概要
複素数を極形式で指定して作る。polar は polar form（極形式）の略。


## 戻り値
絶対値が `rho` で偏角が `theta` の複素数


## 備考
- 規格には、偏角 `theta` の単位については何も記載がない。しかし、この引数の単位がラジアンであることは異論をはさむ余地はないだろう。  
	実際、本関数の逆関数（の片割れ）とも言える [`arg`](arg.md) の戻り値はラジアンである。
- コンストラクタのデフォルト引数を踏まえると、偏角 `theta` のデフォルト引数が `T()` ではなく `0` であるのは、規格の誤りであるように思われる。
- `rho` と `theta` に現れる型 `T` は（残念ながら）同じ型でなければならない。（`int` と `double` を渡すなどといったことはできない）  
	同じ [`complex`](/reference/complex.md) ヘッダの [`pow`](pow.md) や、[`cmath`](/reference/cmath.md) ヘッダの [`atan2`](/reference/cmath/atan2.md) などの関数群は、引数の型が異なっていても簡単に呼び出せるように C++11 でオーバーロードが追加されているため、単なる規格の考慮漏れかもしれない。


## 例
```cpp example
#include <iostream>
#include <complex>
#include <cmath>

static const double pi = std::acos(-1.0); // お手軽に π を得る。

int main()
{
  std::complex<double> result = std::polar(1.0, pi / 4.0);
  std::cout << "polar(1.0, pi / 4.0) = " << result << std::endl;
}
```
* std::polar[color ff0000]
* std::acos[link /reference/cmath/acos.md]

### 出力
```
polar(1.0, pi / 4.0) = (0.707107,0.707107)
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
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
