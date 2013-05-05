#fma
```cpp
namespace std {
  float fma(float x, float y, float z);
  double fma(double x, double y, double z);
  long double fma(long double x, long double y, long double z);
}
```

##概要
`x * y + z` を計算する。
丸めは乗算と加算がのあとに1回だけ行われる。

