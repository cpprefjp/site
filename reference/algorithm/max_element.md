#max_element
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator>
  ForwardIterator max_element(ForwardIterator first, ForwardIterator last);

  template<class ForwardIterator, class Compare>
  ForwardIterator max_element(ForwardIterator first, ForwardIterator last,
                              Compare comp);
}
```

##概要
`[first, last)`の範囲において、最大要素を指す最初のイテレータを取得する。



##戻り値
`*j < *i`もしくは`comp(*j, *i)`の比較によって最大と判断された最初の要素を指すイテレータ


##計算量
[`max`](max.md)`((last - first) - 1, 0)`回の比較を行う


##例
```cpp
#include <cassert>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  decltype(v)::iterator i = std::max_element(v.begin(), v.end());
  assert(*i == 4);

  decltype(v)::iterator j = std::max_element(v.begin(), v.end(), [](int a, int b) {
                              return a > b;
                            });
  assert(*j == 1);
}
```
* std::max_element[color ff0000]

###出力
```
```


##実装例
```cpp
template <class ForwardIterator>
ForwardIterator max_element(ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    return first;

  ForwardIterator result = first++;
  for (; first != last; ++first) {
    if (*result < *first) {
      result = first;
    }
  }
  return result;
}

template <class ForwardIterator, class Compare>
ForwardIterator max_element(ForwardIterator first, ForwardIterator last, Compare comp)
{
  if (first == last)
    return first;

  ForwardIterator result = first++;
  for (; first != last; ++first) {
    if (comp(*result, *first)) {
      result = first;
    }
  }
  return result;
}
```


##参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
