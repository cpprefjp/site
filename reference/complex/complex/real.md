# real
* complex[meta header]
* std[meta namespace]
* complex[meta class]
* function[meta id-type]

```cpp
T real() const;             // (1) C++03
constexpr T real() const;   // (1) C++14

void real(T val);           // (2) C++03
constexpr void real(T val); // (2) C++20
```

## 概要
複素数の実部を取得、あるいは、�定する。


## 効果
- (1) -
- (2) 実部に `val` を�定する。


## 戻り値
- (1) 実部
- (2) -


## 備考
- 実部の取得は、同名の非メンバ関数 [`real`](real_free.md) も�在する。
- 実部の取得は、C++14 から `constexpr` 関数になっている。
- 実部の�定は、C++11 から追加された。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::cout << c << ", real part = " << c.real() << std::endl;
  c.real(4.0);
  std::cout << c << ", real part = " << c.real() << std::endl;
}
```
* real[color ff0000]

### 出力
```
(1,2), real part = 1
(4,2), real part = 4
```


## 関連項目

| 名前                 | 説明                             |
|----------------------|----------------------------------|
|[`imag`](imag.md)     | 虚部を取得、あるいは、�定する。 |
|[`real`](real_free.md)| 実部を取得する。（非メンバ関数） |
|[`imag`](imag_free.md)| 虚部を取得する。（非メンバ関数） |


## 参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)
- [P0415R1 Constexpr for `std::complex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0415r1.html)
