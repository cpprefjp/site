#operator<<
```cpp
namespace std {
  template <class T, class CharT, class Traits>
  basic_ostream<CharT, Traits>&
    operator<<(basic_ostream<CharT, Traits>& os, const complex<T>& x);
}
```
* basic_ostream[link /reference/ostream/basic_ostream.md]

##概要
ストリームに出力する。


##効果
```
basic_ostringstream<CharT, Traits> s;
s.flags(os.flags());
s.imbue(os.getloc());
s.precision(os.precision());
s << '(' << x.real() << "," << x.imag() << ')';
return os << s.str();
```
* basic_ostringstream[link /reference/sstream/basic_ostringstream.md]
* flags[link /reference/ios/ios_base/flags.md]
* imbue[link /reference/ios/ios_base/imbue.md]
* getloc[link /reference/ios/ios_base/getloc.md]
* precision[link /reference/ios/ios_base/precision.md]
* real[link ./real.md]
* imag[link ./imag.md]
* str[link /reference/sstream/basic_ostringstream/str.md]


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::cout << c << std::endl;
}
```
* <<[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
(1,2)
```


##参照

| 名前                          | 説明                 |
|-------------------------------|----------------------|
| [`operator>>`](op_istream.md) | ストリームからの入力 |

