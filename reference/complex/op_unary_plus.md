#operator+ (単項)
* complex[meta header]

```cpp
namespace std {
  template <class T>
  complex<T> operator+(const complex<T>& lhs);
}
```

##概要
単項 `+` 演算（引数に指定された複素数値を得る）


##戻り値
`complex<T>(lhs)`


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::cout << '+' << c << " = " << +c << std::endl;
}
```
* +[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
+(1,2) = (1,2)
```


##参照
|                                         |                                               |
|-----------------------------------------|-----------------------------------------------|
| [`operator-` (単項)](op_unary_minus.md) | 単項 `-` 演算（符号を反転した複素数値を得る） |
