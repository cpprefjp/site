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
イテレータ範囲`[first, last)`のうち、最小要素を指す最初のイテレータを取得する。


## 戻り値
`*i < *j`もしくは`comp(*i, *j)`の比較によって最小と判断された最初の要素を指すイテレータを返す。


## 計算量
[`max`](/reference/algorithm/max.md)`((last - first) - 1, 0)`回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <cassert>
#include <utility>
#include <vector>

int main()
{
  // (1)
  std::vector<int> v1 = {3, 1, 4};

  decltype(v1)::iterator v1_min_element = std::min_element(v1.begin(), v1.end());
  assert(*v1_min_element == 1);


  // (2)
  std::vector<std::pair<int, int>> v2 = {{0, 3}, {1, 1}, {2, 4}};

  decltype(v2)::iterator v2_min_element = std::min_element(v2.begin(), v2.end(), [](const auto& a, const auto& b) {
    return a.second < b.second;
  });
  assert(v2_min_element->first == 1);
  assert(v2_min_element->second == 1);
}
```
* std::min_element[color ff0000]
* v2_min_element->first[link /reference/utility/pair/first.md.nolink]
* v2_min_element->second[link /reference/utility/pair/second.md.nolink]

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
