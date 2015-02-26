#iリテラル (C++14)
* complex[meta header]

```cpp
namespace std {
inline namespace literals {
inline namespace complex_literals {
  constexpr complex<double> operator""i(long double);

  constexpr complex<double> operator""i(unsigned long long);
}}}
```

##概要
`complex<double>`のリテラル。

虚部の値を受け取り、実部`0.0`の値と合わせて`complex<double>`型のオブジェクトを生成する。


##戻り値
```cpp
complex<double>{0.0, static_cast<double>(d)}
```


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  using namespace std::literals::complex_literals;

  // 実部0.0、虚部1.0の複素数オブジェクトを作る
  std::complex<double> c = 1.0i;

  std::cout << c << std::endl;
}
```
* 1.0i[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
(0,1)
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++1y mode](/implementation.md#clang): 3.4
- [GCC, C++1y mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 

##参照

| 名前               | 説明                             |
|--------------------|----------------------------------|
| [`if`](./op_if.md) | `complex<float>`のリテラル       |
| [`il`](./op_il.md) | `complex<long double>`のリテラル |

- [N3779 User-dened Literals for std::complex part 2 of UDL for Standard Library Types (version 5)](http://isocpp.org/files/papers/N3779.pdf)

