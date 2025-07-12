# operator==
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class CharT, class Traits, class Distance>
  bool operator==(const istream_iterator<T, CharT, Traits, Distance>& x,
                  const istream_iterator<T, CharT, Traits, Distance>& y); // (1) C++03

  template <class T,
           class charT = char,
           class traits = char_traits<charT>,
           class Distance = ptrdiff_t>
  class istream_iterator {
  public:
    friend bool operator==(const istream_iterator& i, default_sentinel_t); // (2) C++20
  };
}
```
* char_traits[link /reference/string/char_traits.md]

## 概要
2つの`istream_iterator`オブジェクトを等値比較する


## 戻り値
- (1) : `x`と`y`がどちらも同じ有効な入力ストリームオブジェクトを指す場合、もしくはどちらも無効な入力ストリームオブジェクトを指す場合は`true`を返し、そうでなければ`false`を返す
- (2) : `i`が有効な入力ストリームオブジェクトを指していれば`true`、そうでなければ`false`を返す


## 備考
- この演算子により、以下の演算子が自動導出される (C++20)：
    - `operator==(default_sentinel_t, const istream_iterator&)`
    - `operator!=(const istream_iterator&, const istream_iterator&)`
    - `operator!=(const istream_iterator&, default_sentinel_t)`
    - `operator!=(default_sentinel_t, const istream_iterator&)`


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

  std::cout << "it1 == it2 : " << (it1 == it2) << std::endl;
  std::cout << "it1 == last : " << (it1 == last) << std::endl;

  ++it1;

  // it1は入力ストリームから要素を読み取り終わっているので終端となる
  std::cout << "it1 == last : " << (it1 == last) << std::endl;
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
it1 == it2 : true
it1 == last : false
it1 == last : true
```

## 参照
