# search_n
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator, class Size, class T>
  ForwardIterator
    search_n(ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value);       // (1) C++03

  template<class ForwardIterator, class Size, class T>
  constexpr ForwardIterator
    search_n(ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value);       // (1) C++20

  template<class ForwardIterator, class Size, class T, class BinaryPredicate>
  ForwardIterator
    search_n(ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value,
             BinaryPredicate pred); // (2) C++03

  template<class ForwardIterator, class Size, class T, class BinaryPredicate>
  constexpr ForwardIterator
    search_n(ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value,
             BinaryPredicate pred); // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Size, class T>
  ForwardIterator
    search_n(ExecutionPolicy&& exec,
             ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value);       // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class Size, class T,
            class BinaryPredicate>
  ForwardIterator
    search_n(ExecutionPolicy&& exec,
             ForwardIterator first,
             ForwardIterator last,
             Size count,
             const T& value,
             BinaryPredicate pred); // (4) C++17
}
```

## 概要
あるシーケンスの�から、特定のサブシーケンスを探す。


## 要件
`Size`は整数型に変換できる型である必要がある。


## 戻り値
`[first,last-count)` 内のイテレータ `i` があるとき、0 以上 `count` 未満の整数 `n` について、それぞれ `*(i + n) == value` もしくは `pred(*(i + n),value) != false` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスの先�のイテレータを返す。

そのようなイテレータが見つからない場合は `last` を返す。


## 計算量
最大で `last - first` 回の対応する比較もしくは述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,2,3,2,1,3,3,2,3,3,1 };

  // 3 が 2 つ連続している最初のシーケンスを探す
  auto it1 = std::search_n(v.cbegin(), v.cend(), 2, 3);
  // v[5] の位置を指すイテレータが見つかる。
  if (it1 == v.cend()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.cbegin(), it1) << std::endl;
  }

  // 3 未満が 2 つ連続している最初のシーケンスを探す
  auto it2 = std::search_n(v.cbegin(), v.cend(), 2, 3, [](int x, int y) { return x < y; });
  // v[0] の位置を指すイテレータが見つかる。
  if (it2 == v.cend()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.cbegin(), it2) << std::endl;
  }
}
```
* std::search_n[color ff0000]
* v.cbegin()[link /reference/vector/vector/cbegin.md]
* v.cend()[link /reference/vector/vector/cend.md]

### 出力
```
found: index==5
found: index==0
```


## 実装例
```cpp
template <class ForwardIterator, class Size, class T>
ForwardIterator search_n(ForwardIterator first, ForwardIterator last, Size count, T const& value)
{
  if (first == last || count <= 0)
    return first;

  while (first != last) {
    if (*first == value) {
      ForwardIterator it = first;
      ++it;
      Size i = 1;
      for (; i < count && it != last && *it == value; ++i, ++it)
        ;
      if (i == count)
        return first;
      else if (it == last)
        return last;
      else
        first = it;
    }
    ++first;
  }
  return last;
}

template <class ForwardIterator, class Size, class T, class BinaryPredicate>
ForwardIterator search_n(ForwardIterator first, ForwardIterator last,
                         Size count, T const& value, BinaryPredicate pred)
{
  if (first == last || count <= 0)
    return first;

  while (first != last) {
    if (pred(*first, value)) {
      ForwardIterator it = first;
      ++it;
      Size i = 1;
      for (; i < count && it != last && pred(*it, value); ++i, ++it)
        ;
      if (i == count)
        return first;
      else if (it == last)
        return last;
      else
        first = it;
    }
    ++first;
  }
  return last;
}
```


## 参照
- [LWG Issue 714. `search_n` complexity is too lax](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#714)
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
