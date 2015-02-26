#operator>>
* complex[meta header]
* std[meta namespace]
* complex[meta class]

```cpp
namespace std {
  template <class T, class CharT, class Traits>
  basic_istream<CharT, Traits>&
    operator>>(basic_istream<CharT, Traits>& is, complex<T>& x);
}
```
* basic_istream[link /reference/istream/basic_istream.md]

##概要
ストリームからの入力。


##要件
入力の値が`T`に変換可能であること。


##効果
以下のいずれかの形式の`complex`オブジェクトを読み込む：

- `u`
- `(u)`
- `(u, v)`

`u`は実部の値、`v`は虚部の値である。

読み込みに失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base`](/reference/ios/ios_base.md)`::failbit)`が呼び出される。


##例
```cpp
#include <iostream>
#include <sstream>
#include <complex>

int main()
{
  std::stringstream ss("(1.0,2.0)");

  std::complex<double> c;
  ss >> c;

  std::cout << c << std::endl;
}
```
* >>[color ff0000]
* iostream[link /reference/iostream.md]
* sstream[link /reference/sstream.md]
* complex[link /reference/complex.md]

###出力
```
(1,2)
```


##参照

| 名前                          | 説明               |
|-------------------------------|--------------------|
| [`operator<<`](op_ostream.md) | ストリームへの出力 |

