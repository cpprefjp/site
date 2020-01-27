# find_if_not
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Predicate>
  InputIterator find_if_not(InputIterator first,
                            InputIterator last,
                            Predicate pred);               // (1) C++11

  template <class InputIterator, class Predicate>
  constexpr InputIterator find_if_not(InputIterator first,
                                      InputIterator last,
                                      Predicate pred);     // (1) C++20

  template<class ExecutionPolicy, class ForwardIterator, class Predicate>
  ForwardIterator find_if_not(ExecutionPolicy&& exec,
                              ForwardIterator first,
                              ForwardIterator last,
                              Predicate pred);             // (2) C++17
}
```

## 概要
範囲の�から、指定された条件を満たさない最初の要素を検索する。


## 戻り値
`[first,last)` 内のイテレータ `i` について、`pred(*i) == false` である最初のイテレータを返す。そのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
最大で `last - first` 回述語による比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };
  // 3ではない最初の要素を検索する
  auto result = std::find_if_not(v.begin(), v.end(), [](int x) { return x == 3; });
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
```
* std::find_if_not[color ff0000]

### 出力
```
found: 1
```


## 実装例
```cpp
template <class InputIterator, class Predicate>
InputIterator find_if_not(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (!bool(pred(*first))) return first;
  return last;
}
```


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
