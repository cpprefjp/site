#imag
```cpp
template<typename T>
constexpr T imag(const complex<T>& x);
```

##概要
複素数の虚部を取得する。


##戻り値
引数に指定した複素数 `x` の虚部（`x.`[`imag`](complex/imag.md)`()`)


##備考
同名のメンバ関数 [`imag`](complex/imag.md) も存在する。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::cout << c << ", imag part = " << std::imag(c) << std::endl;
}
```
* imag[color ff0000]

###出力
```
(1,2), imag part = 2
```


##参照
|                         |                                                |
|-------------------------|------------------------------------------------|
|[`real`](real.md)        | 実部を取得する。                               |
|[`real`](complex/real.md)| 実部を取得、あるいは、設定する。（メンバ関数） |
|[`imag`](complex/imag.md)| 虚部を取得、あるいは、設定する。（メンバ関数） |
