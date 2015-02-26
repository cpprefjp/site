#min_element
* algorithm[meta header]

```cpp
namespace std {
  template<class ForwardIterator>
  ForwardIterator min_element(ForwardIterator first, ForwardIterator last);

  template<class ForwardIterator, class Compare>
  ForwardIterator min_element(ForwardIterator first, ForwardIterator last,
                              Compare comp);
}
```

##概要
`[first, last)`の範囲において、最小要素を指すイテレータを取得する。


##戻り値
`*i < *j`もしくは`comp(*i, *j)`の比較によって最小と判断された要素を指すイテレータ


##計算量
[`max`](/reference/algorithm/max.md)`((last - first) - 1, 0)`回の比較を行う


##例
```cpp
#include <cassert>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  decltype(v)::iterator i = std::min_element(v.begin(), v.end());
  assert(*i == 1);

  decltype(v)::iterator j = std::min_element(v.begin(), v.end(), [](int a, int b) {
                              return a > b;
                            });
  assert(*j == 4);
}
```
* min_element[color ff0000]

###出力
```
```

##実装例
```cpp
template <class ForwardIterator>
ForwardIterator min_element(ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    return first;

  ForwardIterator result = first++;
  for (; first != last; ++first) {
    if (*first < *result) {
      result = first;
    }
  }
  return result;
}

template <class ForwardIterator, class Compare>
ForwardIterator min_element(ForwardIterator first, ForwardIterator last, Compare comp)
{
  if (first == last)
    return first;

  ForwardIterator result = first++;
  for (; first != last; ++first) {
    if (comp(*first, *result)) {
      result = first;
    }
  }
  return result;
}
```


