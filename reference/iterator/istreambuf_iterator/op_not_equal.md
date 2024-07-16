# operator!=
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class CharT, class Traits>
  bool operator!=(const istreambuf_iterator<CharT, Traits>& a,
                  const istreambuf_iterator<CharT, Traits>& b); // (1) C++03

  template <class charT,
            class traits = char_traits<charT>>
  class istream_iterator {
  public:
    friend bool operator!=(const istreambuf_iterator& i, default_sentinel_t); // (2) C++20
    friend bool operator!=(default_sentinel_t, const istreambuf_iterator& i); // (3) C++20
  };
}
```

## 概要
2つの`istreambuf_iterator`オブジェクトを非等値比較する。


## 戻り値
`!a.equal(b)`


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  std::istreambuf_iterator<char> it1(ss);
  std::istreambuf_iterator<char> last;

  if (it1 != last) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
not equal
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
