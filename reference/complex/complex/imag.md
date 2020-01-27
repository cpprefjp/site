# imag
* complex[meta header]
* std[meta namespace]
* complex[meta class]
* function[meta id-type]

```cpp
T imag() const;             // (1) C++03
constexpr T imag() const;   // (1) C++14

void imag(T val);           // (2) C++03
constexpr void imag(T val); // (2) C++20
```

## 概要
複素数の虚部を取得、あるいは、�定する。


## 効果
- (1) -
- (2) 虚部に `val` を�定する。


## 戻り値
- (1) 虚部
- (2) -


## 備考
- 虚部の取得は、同名の非メンバ関数 [`imag`](imag_free.md) も�在する。
- 虚部の取得は、C++14 から `constexpr` 関数になっている。
- 虚部の�定は、C++11 から追加された。


## 例
```cpp example
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

### 出力
```
(1,2), imag part = 2
(1,4), imag part = 4
```


## 関連項目

| 名前                   | 説明                             |
|------------------------|----------------------------------|
| [`real`](real.md)      | 実部を取得、あるいは、�定する。 |
| [`real`](real_free.md) | 実部を取得する。（非メンバ関数） |
| [`imag`](imag_free.md) | 虚部を取得する。（非メンバ関数） |


## 参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)
- [P0415R1 Constexpr for `std::complex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0415r1.html)
