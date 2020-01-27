# operator/
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T>
    operator/(const complex<T>& lhs, const complex<T>& rhs); // (1) C++03

  template <class T>
  constexpr complex<T>
    operator/(const complex<T>& lhs, const complex<T>& rhs); // (1) C++20

  template <class T>
  complex<T>
    operator/(const complex<T>& lhs, const T& rhs);          // (2) C++03

  template <class T>
  constexpr complex<T>
    operator/(const complex<T>& lhs, const T& rhs);          // (2) C++20

  template <class T>
  complex<T>
    operator/(const T& lhs, const complex<T>& rhs);          // (3) C++03

  template <class T>
  constexpr complex<T>
    operator/(const T& lhs, const complex<T>& rhs);          // (3) C++20
}
```

## 概要
複素数の除算を行う


## 戻り値
`complex<T>(lhs)` [`/=`](op_divide_assign.md) `rhs`  
（`lhs` を基に新たな `complex<T>` 型のオブジェクトを作成し、そのオブジェクトを [`operator/=`](op_divide_assign.md) を用いて `rhs` で割った上で、当該オブジェクトを返す）


## 備考
`lhs` と `rhs` の両辺に現れる型 `T` は（残念ながら）同じ型でなければならない。（`complex<double>` と `complex<float>` の除算や、`complex<double>` と `float` の除算などを行うことはできない。）  
特に、これらの演算�は関数テンプレートであるため、[`operator/=`](op_divide_assign.md) の場合と異なり、暗黙の型変換は行われないことに注意。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::complex<float> d(2.0, 3.0);
  std::cout << c << " / " << d << " = " << (c / d) << std::endl;
  std::cout << c << " / " << 3.0F << " = " << (c / 3.0F) << std::endl;
  std::cout << 5.0F << " / " << d << " = " << (5.0F / d) << std::endl;
}
```
* /[color ff0000]

### 出力
```
(1,2) / (2,3) = (0.615385,0.0769231)
(1,2) / 3 = (0.333333,0.666667)
5 / (2,3) = (0.769231,-1.15385)
```


## 関連項目
| 名前                                  | 説明                                 |
|---------------------------------------|--------------------------------------|
| [`operator=`](op_assign.md)           | 代入する。                           |
| [`operator+=`](op_plus_assign.md)     | 複素数の加算を行う。                 |
| [`operator-=`](op_minus_assign.md)    | 複素数の減算を行う。                 |
| [`operator*=`](op_multiply_assign.md) | 複素数の乗算を行う。                 |
| [`operator/=`](op_divide_assign.md)   | 複素数の除算を行う。                 |
| [`operator+`](op_plus.md)             | 複素数の加算を行う。（非メンバ関数） |
| [`operator-`](op_minus.md)            | 複素数の減算を行う。（非メンバ関数） |
| [`operator*`](op_multiply.md)         | 複素数の乗算を行う。（非メンバ関数） |


## 参照
- [P0415R1 Constexpr for `std::complex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0415r1.html)
