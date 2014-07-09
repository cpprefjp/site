#imag
```cpp
T imag() const;					// (1) C++11 まで

constexpr T imag() const;		// (1) C++14 から

void imag(T val);				// (2) C++11 から
```

##概要
複素数の虚部を取得、あるいは、設定する。


##効果
- (1) -
- (2) 虚部に `val` を設定する。


##戻り値
- (1) 虚部
- (2) -


##備考
- 虚部の取得は、同名の非メンバ関数 [`imag`](../imag.md) も存在する。
- 虚部の所得は、C++14 から `constexpr` 関数になっている。
- 虚部の設定は、C++11 から追加された。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::cout << c << ", imag part = " << c.imag() << std::endl;
  c.imag(4.0);
  std::cout << c << ", imag part = " << c.imag() << std::endl;
}
```
* imag[color ff0000]

###出力
```
(1,2), imag part = 2
(1,4), imag part = 4
```


##参照
|                    |                                  |
|--------------------|----------------------------------|
|[`real`](real.md)   | 実部を取得、あるいは、設定する。 |
|[`real`](../real.md)| 実部を取得する。（非メンバ関数） |
|[`imag`](../imag.md)| 虚部を取得する。（非メンバ関数） |
