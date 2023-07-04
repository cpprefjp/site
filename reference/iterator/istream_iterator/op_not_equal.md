# operator!=
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class T, class CharT, class Traits, class Distance>
  bool operator!=(const istream_iterator<T, CharT, Traits, Distance>& x,
                  const istream_iterator<T, CharT, Traits, Distance>& y); // (1) C++03

  template <class T,
           class charT = char,
           class traits = char_traits<charT>,
           class Distance = ptrdiff_t>
  class istream_iterator {
  public:
    friend bool operator!=(const istream_iterator& i, default_sentinel_t); // (2) C++20
    friend bool operator!=(default_sentinel_t, const istream_iterator& i); // (3) C++20
  };
}
```

## 概要
2つの`istream_iterator`オブジェクトを非等値比較する。


## 戻り値
`!(x == y)`


## 例
```cpp example
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
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
it1 == it2 : false
it1 == last : true
it1 == last : false
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
