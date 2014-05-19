#polar
```cpp
namespace std {
  template<class T>
  complex<T> polar(const T& rho, const T& theta = 0);
}
```

##概要
複素数を極形式で指定して作る。polar は polar form（極形式）の略。


##戻り値
絶対値が `rho` で偏角が `theta` の複素数


##備考
- 規格には、偏角 `theta` の単位については何も記載がない。しかし、この引数の単位がラジアンであることは異論をはさむ余地はないだろう。  
    実際、本関数の逆関数（の片割れ）とも言える [`arg`](arg.md) の戻り値はラジアンである。
- コンストラクタのデフォルト引数を踏まえると、偏角 `theta` のデフォルト引数が `T()` ではなく `0` であるのは、規格の誤りであるように思われる。
- `rho` と `theta` に現れる型 `T` は（残念ながら）同じ型でなければならない。（`int` と `double` を渡すなどといったことはできない）  
    [`atan2`](/reference/cmath/atan2.md) など [`cmath`](/reference/cmath.md) の関数群はできるので、単なる規格の考慮漏れかもしれない。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <complex>
#include <cmath>

static const double pi = std::acos(-1.0); // お手軽に π を得る。

int main()
{
  std::cout << std::setprecision(16) << "polar(1.0, pi / 4.0) = " << std::polar(1.0, pi / 4.0) << std::endl;
}
```
* polar[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]
* cmath[link /reference/cmath.md]
* acos[link /reference/cmath/acos.md]

###出力
```
polar(1.0, pi / 4.0) = (0.7071067811865476,0.7071067811865475)
```


##参照
|                                    |                                        |
|------------------------------------|----------------------------------------|
| [`real`](real.md)                  | 複素数の実部を得る。                   |
| [`imag`](imag.md)                  | 複素数の虚部を得る。                   |
| [`abs`](abs.md)                    | 複素数の絶対値を得る。                 |
| [`arg`](arg.md)                    | 複素数の偏角を得る。                   |
| [`norm`](norm.md)                  | 複素数体のノルムを得る。               |
| [`conj`](conj.md)                  | 共役複素数を得る。                     |
| [`proj`](proj.md)                  | リーマン球面への射影を得る。           |
