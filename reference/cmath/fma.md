#fma
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float fma(float x, float y, float z);

  double fma(double x, double y, double z);

  long double fma(long double x, long double y, long double z);

  Promoted fma(Arithmetic1 x, Arithmetic2 y, Arithmetic3 z);   // C++11
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]
* Arithmetic3[italic]

##概要
`x * y + z` を計算する。

丸めは乗算と加算のあとに1回だけ行われる。

