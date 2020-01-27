# operator==
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits>
  bool operator==(const istreambuf_iterator<CharT, Traits>& a,
                  const istreambuf_iterator<CharT, Traits>& b);
}
```

## 概要
2つの`istreambuf_iterator`オブジェクトを�値比較する。


## 戻り値
`a.equal(b)`


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
  std::istreambuf_iterator<char> it2 = it1;
  std::istreambuf_iterator<char> last;

  if (it1 == it2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }

  ++it1;
  ++it1;
  ++it1;
  if (it1 == last) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

### 出力
```
equal
equal
```

## 参照


