#operator!=
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class CharT, class Traits, class Distance>
  bool operator!=(const istream_iterator<T, CharT, Traits, Distance>& x,
                  const istream_iterator<T, CharT, Traits, Distance>& y);
}
```

##概要
2つの`istream_iterator`オブジェクトを非等値比較する。


##戻り値
`!(x == y)`


##例
```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << 1;

  std::istream_iterator<int> it1(ss);
  std::istream_iterator<int> it2 = it1;
  std::istream_iterator<int> last;

  std::cout << std::boolalpha;

  std::cout << "it1 == it2 : " << (it1 != it2) << std::endl;
  std::cout << "it1 == last : " << (it1 != last) << std::endl;

  ++it1;

  // it1は入力ストリームから要素を読み取り終わっているので終端となる
  std::cout << "it1 == last : " << (it1 != last) << std::endl;
}
```

###出力
```
it1 == it2 : false
it1 == last : true
it1 == last : false
```

##参照


