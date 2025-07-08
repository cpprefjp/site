# max_element
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator>
  ForwardIterator
    max_element(ForwardIterator first,
                ForwardIterator last); // (1) C++03

  template<class ForwardIterator, class Compare>
  ForwardIterator
    max_element(ForwardIterator first,
                ForwardIterator last,
                Compare comp);         // (2) C++03

  template <class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    max_element(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class Compare>
  ForwardIterator
    max_element(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last,
                Compare comp);         // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`のうち、最大要素を指す最初のイテレータを取得する。



## 戻り値
`*j < *i`もしくは`comp(*j, *i)`の比較によって最大と判断された最初の要素を指すイテレータを返す。


## 計算量
[`max`](max.md)`((last - first) - 1, 0)`回の比較を行う


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

  decltype(v1)::iterator v1_max_element = std::max_element(v1.begin(), v1.end());
  assert(*v1_max_element == 4);


  // (2)
  std::vector<std::pair<int, int>> v2 = {{0, 3}, {1, 1}, {2, 4}};

  decltype(v2)::iterator v2_max_element = std::max_element(v2.begin(), v2.end(), [](const auto& a, const auto& b) {
    return a.second < b.second;
  });
  assert(v2_max_element->first == 2);
  assert(v2_max_element->second == 4);
}
```
* std::max_element[color ff0000]

### 出力
```
```


## 実装例
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


## 参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
