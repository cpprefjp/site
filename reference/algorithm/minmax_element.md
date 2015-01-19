#minmax_element (C++11)
```cpp
namespace std {
  template<class ForwardIterator>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ForwardIterator first, ForwardIterator last);

  template<class ForwardIterator, class Compare>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ForwardIterator first, ForwardIterator last, Compare comp);
}
```
* pair[link /reference/utility/pair.md]

##概要
`[first, last)`の範囲において、最小要素を指すイテレータと最大要素を指すイテレータの組を取得する。


##戻り値
`*i < *j`もしくは`comp(*i, *j)`の比較によって最小と判断された要素を指すイテレータを`first`、

`*j < *i`もしくは`comp(*j, *i)`の比較によって最大と判断された要素を指すイテレータを`second`に持つ[`pair`](/reference/utility/pair.md)オブジェクトを返す。

`first == last`の場合、[`make_pair`](/reference/utility/make_pair.md)`(first, first)`を返す。


##計算量
`n`を範囲の要素数とする場合、[`max`](/reference/algorithm/max.md)`(3(n / 2) - 1, 0)`回の述語適用を行う。


##例
```cpp
#include <cassert>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  auto i = std::minmax_element(v.begin(), v.end());
  assert(*i.first == 1);
  assert(*i.second == 4);

  auto j = std::minmax_element(v.begin(), v.end(), [](int a, int b) {
                                return a > b;
                              });
  assert(*j.first == 4);
  assert(*j.second == 1);
}
```
* minmax_element[color ff0000]

###出力
```
```


##実装例
[http://www.boost.org/doc/libs/release/boost/algorithm/minmax_element.hpp](http://www.boost.org/doc/libs/release/boost/algorithm/minmax_element.hpp)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


