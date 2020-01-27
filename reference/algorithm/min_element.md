# min_element
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator>
  ForwardIterator
    min_element(ForwardIterator first,
                ForwardIterator last); // (1) C++03

  template<class ForwardIterator, class Compare>
  ForwardIterator
    min_element(ForwardIterator first,
                ForwardIterator last,
                Compare comp);         // (2) C++03

  template <class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    min_element(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class Compare>
  ForwardIterator
    min_element(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last,
                Compare comp);         // (4) C++17
}
```

## 概要
`[first, last)`の範囲において、最小要素を指す最初のイテレータを取得する。


## 戻り値
`*i < *j`もしくは`comp(*i, *j)`の比較によって最小と判�された最初の要素を指すイテレータ


## 計算量
[`max`](/reference/algorithm/max.md)`((last - first) - 1, 0)`回の比較を行う


## 例
```cpp example
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
* std::min_element[color ff0000]

### 出力
```
```

## 実装例
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

## 参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
