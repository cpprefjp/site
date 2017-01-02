#ilリテラル
* complex[meta header]
* std::complex_literals[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
inline namespace literals {
inline namespace complex_literals {
  constexpr complex<long double> operator""il(long double d);

  constexpr complex<long double> operator""il(unsigned long long d);
}}}
```

##概要
`complex<long double>`のリテラル。

虚部の値を受け取り、実部`0.0L`の値と合わせて`complex<long double>`型のオブジェクトを生成する。


##戻り値
```cpp
complex<long double>{0.0L, static_cast<long double>(d)}
```


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  using namespace std::literals::complex_literals;

  // 実部0.0L、虚部1.0Lの複素数オブジェクトを作る
  std::complex<long double> c = 1.0il;

  std::cout << c << std::endl;
}
```
* 1.0il[color ff0000]
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

| 名前               | 説明                        |
|--------------------|-----------------------------|
| [`i`](op_i.md)   | `complex<double>`のリテラル |
| [`if`](op_if.md) | `complex<float>`のリテラル  |

- [N3779 User-dened Literals for std::complex part 2 of UDL for Standard Library Types (version 5)](https://isocpp.org/files/papers/N3779.pdf)

