# is_sorted
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  bool is_sorted(ForwardIterator first,
                 ForwardIterator last);           // (1) C++11

  template <class ForwardIterator>
  constexpr bool is_sorted(ForwardIterator first,
                           ForwardIterator last); // (1) C++20

  template <class ForwardIterator, class Compare>
  bool is_sorted(ForwardIterator first,
                 ForwardIterator last,
                 Compare comp);                   // (2) C++11

  template <class ForwardIterator, class Compare>
  constexpr bool is_sorted(ForwardIterator first,
                           ForwardIterator last,
                           Compare comp);         // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator>
  bool is_sorted(ExecutionPolicy&& exec,
                 ForwardIterator first,
                 ForwardIterator last);           // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class Compare>
  bool is_sorted(ExecutionPolicy&& exec,
                 ForwardIterator first,
                 ForwardIterator last,
                 Compare comp);                   // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`がソート済みか判定する。

### 戻り値
- (1) : [`is_sorted_until`](/reference/algorithm/is_sorted_until.md)`(first, last) == last`
- (2) : [`is_sorted_until`](/reference/algorithm/is_sorted_until.md)`(first, last, comp) == last`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? " << std::is_sorted(v.begin(), v.end()) << std::endl;

  std::sort(v.begin(), v.end());

  std::cout << " after: is sorted? " << std::is_sorted(v.begin(), v.end()) << std::endl;
}
```
* std::is_sorted[color ff0000]
* std::vector[link /reference/vector/vector.md]
* std::cout[link /reference/iostream/cout.md]
* std::boolalpha[link /reference/ios/boolalpha.md]
* std::endl[link /reference/ostream/endl.md]
* v.begin[link /reference/vector/vector/begin.md]
* v.end[link /reference/vector/vector/end.md]
* std::sort[link sort.md]

### 出力
```
before: is sorted? false
 after: is sorted? true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
    - 2008では、`_HAS_TRADITIONAL_STL`を1に定義してから`<algorithm>`をインクルードすると、`stdext`名前空間で`is_sorted`が定義される。


## 参照
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
