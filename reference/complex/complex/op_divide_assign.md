#operator/=
```cpp
complex<T>& operator/=(const T& rhs);		    // (1)
complex<T>& operator/=(const complex<T>& rhs);	// (2)
```

##概要
複素数の除算を行う


##効果
- (1) スカラー値 `rhs` で `*this` を割る。
- (2) 複素数値 `rhs` で `*this` を割る。


##戻り値
`*this`


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::complex<double> d(2.0, 3.0);
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c /= d;
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c /= 7;
  std::cout << "c = " << c << ", d = " << d << std::endl;
}
```
* /=[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
c = (1,2), d = (2,3)
c = (0.615385,0.0769231), d = (2,3)
c = (0.0879121,0.010989), d = (2,3)
```


##参照
|                                       |                                      |
|---------------------------------------|--------------------------------------|
| [`operator=`](op_assign.md)           | 代入する。                           |
| [`operator+=`](op_plus_assign.md)     | 複素数の加算を行う。                 |
| [`operator-=`](op_minus_assign.md)    | 複素数の減算を行う。                 |
| [`operator*=`](op_multiply_assign.md) | 複素数の乗算を行う。                 |
| [`operator+`](../op_plus.md)          | 複素数の加算を行う。（非メンバ関数） |
| [`operator-`](../op_minus.md)         | 複素数の減算を行う。（非メンバ関数） |
| [`operator*`](../op_multiply.md)      | 複素数の乗算を行う。（非メンバ関数） |
| [`operator/`](../op_divide.md)        | 複素数の除算を行う。（非メンバ関数） |
