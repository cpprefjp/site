# operator-
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T> operator-(const complex<T>& lhs, const complex<T>& rhs);

  template <class T>
  complex<T> operator-(const complex<T>& lhs, const T& rhs);

  template <class T>
  complex<T> operator-(const T& lhs, const complex<T>& rhs);
}
```

## 概要
複素数の減算を行う


## 戻り値
`complex<T>(lhs)` [`-=`](complex/op_minus_assign.md) `rhs`  
（`lhs` を基に新たな `complex<T>` 型のオブジェクトを作成し、そのオブジェクトから [`operator-=`](complex/op_minus_assign.md) を用いて `rhs` を引いた上で当該オブジェクトを返す）


## 備考
`lhs` と `rhs` の両辺に現れる型 `T` は（残念ながら）同じ型でなければならない。（`complex<double>` と `complex<float>` の減算や、`complex<double>` と `float` の減算などを行うことはできない。）  
特に、これらの演算子は関数テンプレートであるため、[`operator-=`](complex/op_minus_assign.md) の場合と異なり、暗黙の型変換は行われないことに注意。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::complex<float> d(2.0, 3.0);
  std::cout << c << " - " << d << " = " << (c - d) << std::endl;
  std::cout << c << " - " << 3.0F << " = " << (c - 3.0F) << std::endl;
  std::cout << 5.0F << " - " << d << " = " << (5.0F - d) << std::endl;
}
```
* -[color ff0000]

### 出力
```
(1,2) - (2,3) = (-1,-1)
(1,2) - 3 = (-2,2)
5 - (2,3) = (3,-3)
```


## 関連項目
| 名前                                          | 説明                                 |
|-----------------------------------------------|--------------------------------------|
| [`operator=`](complex/op_assign.md)           | 代入する。                           |
| [`operator+=`](complex/op_plus_assign.md)     | 複素数の加算を行う。                 |
| [`operator-=`](complex/op_minus_assign.md)    | 複素数の減算を行う。                 |
| [`operator*=`](complex/op_multiply_assign.md) | 複素数の乗算を行う。                 |
| [`operator/=`](complex/op_divide_assign.md)   | 複素数の除算を行う。                 |
| [`operator+`](op_plus.md)                     | 複素数の加算を行う。（非メンバ関数） |
| [`operator*`](op_multiply.md)                 | 複素数の乗算を行う。（非メンバ関数） |
| [`operator/`](op_divide.md)                   | 複素数の除算を行う。（非メンバ関数） |
