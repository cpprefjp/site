#minmax_element
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

<b>[first, last)の範囲において、最小要素を指すイテレータと最大要素を指すイテレータの組を取得する。</b>


##戻り値

`*i < *j`もしくは`comp(*i, *j)`の比較によって最小と判断された要素を指すイテレータを`first`、

`*j < *i`もしくは`comp(*j, *i)`の比較によって最大と判断された要素を指すイテレータを`second`に持つ[`pair`](/reference/utility/pair.md)オブジェクト。
`first == last`の場合、[`make_pair`](/reference/utility/pair/make_pair.md)(first, first)を返す。


##計算量

`n`を範囲の要素数とする場合、[`max`](/reference/algorithm/max.md)(3(n / 2) - 1, 0)回の述語適用を行う。


##備考



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
* minmax_element[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

[http://www.boost.org/doc/libs/release/boost/algorithm/minmax_element.hpp](http://www.boost.org/doc/libs/release/boost/algorithm/minmax_element.hpp)


##参照


