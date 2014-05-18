#real
```cpp
template<typename T>
constexpr T real(const complex<T>& x);
```

##概要
複素数の実部を取得する。


##戻り値
引数に指定した複素数 `x` の実部（`x.`[`real`](complex/real.md)`()`)


##備考
同名のメンバ関数 [`real`](complex/real.md) も存在する。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::cout << c << ", real part = " << std::real(c) << std::endl;
}
```
* real[color ff0000]

###出力
```
(1,2), real part = 1
```


##参照
|                         |                                                |
|-------------------------|------------------------------------------------|
|[`imag`](imag.md)        | 虚部を取得する。                               |
|[`real`](complex/real.md)| 実部を取得、あるいは、設定する。（メンバ関数） |
|[`imag`](complex/imag.md)| 虚部を取得、あるいは、設定する。（メンバ関数） |
