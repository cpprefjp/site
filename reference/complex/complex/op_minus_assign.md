#operator-=
```cpp
complex<T>& operator-=(const T& rhs);			// (1)
complex<T>& operator-=(const complex<T>& rhs);	// (2)
```

##概要
複素数の減算を行う


##効果
- (1) スカラー値 `rhs` を `*this` の実部から引く。`*this` の虚部は変わらない。
- (2) 複素数値 `rhs` を `*this` から引く。


##戻り値
`*this`


##備考
(2) の形式の場合、`rhs` の型は `*this` と同じでなければならない。（`complex<double>` から `complex<float>` を引くといった事はできない。）  
なお、(1) の形式の場合には（少なくとも `T` が規格でサポートが明示されている `float`、`double`、`long double` の場合には）各種の暗黙の標準変換が効くため、`complex<double>` から `int` を引くといったこともできる。


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
