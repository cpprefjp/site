#operator-=
```cpp
complex<T>& operator-=(const T& rhs);		    // (1)
complex<T>& operator-=(const complex<T>& rhs);	// (2)
```

##概要
複素数の減算を行う


##効果
- (1) スカラー値 `rhs` を `*this` の実部から引く。`*this` の虚部は変わらない。
- (2) 複素数値 `rhs` を `*this` から引く。


##戻り値
`*this`


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(4.0, 5.0);
  std::complex<double> d(1.0, 2.0);
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c -= d;
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c -= 3;
  std::cout << "c = " << c << ", d = " << d << std::endl;
}
```
* -=[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
c = (4,5), d = (1,2)
c = (3,3), d = (1,2)
c = (0,3), d = (1,2)
```


##参照
|                                       |                                      |
|---------------------------------------|--------------------------------------|
| [`operator=`](op_assign.md)           | 代入する。                           |
| [`operator+=`](op_plus_assign.md)     | 複素数の加算を行う。                 |
| [`operator*=`](op_multiply_assign.md) | 複素数の乗算を行う。                 |
| [`operator/=`](op_divide_assign.md)   | 複素数の除算を行う。                 |
| [`operator+`](../op_plus.md)          | 複素数の加算を行う。（非メンバ関数） |
| [`operator-`](../op_minus.md)         | 複素数の減算を行う。（非メンバ関数） |
| [`operator*`](../op_multiply.md)      | 複素数の乗算を行う。（非メンバ関数） |
| [`operator/`](../op_divide.md)        | 複素数の除算を行う。（非メンバ関数） |
