# operator==
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits>
  bool operator==(const istreambuf_iterator<CharT, Traits>& a,
                  const istreambuf_iterator<CharT, Traits>& b); // (1) C++03

  template <class charT,
            class traits = char_traits<charT>>
  class istream_iterator {
  public:
    friend bool operator==(const istreambuf_iterator& i, default_sentinel_t); // (2) C++20
  };
}
```

## 概要
2つの`istreambuf_iterator`オブジェクトを等値比較する。


## 戻り値
- (1) : `a.equal(b)`
- (2) : `i`が有効な入力ストリームオブジェクトを指していれば`true`、そうでなければ`false`を返す


## 備考
- この演算子により、以下の演算子が自動導出される (C++20)：
    - `operator==(default_sentinel_t, const istreambuf_iterator&)`
    - `operator!=(const istreambuf_iterator&, const istreambuf_iterator&)`
    - `operator!=(const istreambuf_iterator&, default_sentinel_t)`
    - `operator!=(default_sentinel_t, const istream_iteratorbuf&)`


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
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
equal
equal
```

## 参照
