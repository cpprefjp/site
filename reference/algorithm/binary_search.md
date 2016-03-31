#binary_search
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class T>
  bool binary_search(ForwardIterator first,
                     ForwardIterator last,
                     const T& value);

  template <class ForwardIterator, class T, class Compare>
  bool binary_search(ForwardIterator first,
                     ForwardIterator last,
                     const T& value,
                     Compare comp);
}
```

##概要
二分探索法による検索を行う。


##要件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)`、または `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の全ての要素 `e` は、`e < value` であれば `!(value < e)` である、または `comp(e, value)` であれば `!comp(value, e)` である必要がある。


##戻り値
`[first,last)` 内のイテレータ `i` について、`!(*i < value) && !(value < *i)` または `comp(*i, value) == false && comp(value, *i) == false` であるようなイテレータが見つかった場合は `true` を返す。


##計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


##備考
- `comp` は 2 引数の関数オブジェクトで、1 番目の引数が 2 番目の引数「より小さい」場合に `true` を、そうでない場合に `false` を返すものとして扱われる。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // binary_search で 4 を検索する場合、
  // 4 より小さい物、4 と等しい物、4 より大きい物がその順に並んでいれば、
  // 必ずしもソートされている必要はない。
  std::vector<int> v = {3, 1, 4, 6, 5};

  if (std::binary_search(v.begin(), v.end(), 4)) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* binary_search[color ff0000]
* <iostream>[link /reference/iostream.md]
* <vector>[link /reference/vector.md]
* <algorithm>[link /reference/algorithm.md]
* std::vector[link /reference/vector.md]
* v.begin()[link /reference/vector/begin.md]
* v.end()[link /reference/vector/end.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
found
```


##実装例
```cpp
template <class ForwardIterator, class T>
bool binary_search(ForwardIterator first, ForwardIterator last,
                   const T& value)
{
  first = std::lower_bound(first, last, value);
  return first != last && !bool(value < *first);
}

template <class ForwardIterator, class T, class Compare>
bool binary_search(ForwardIterator first, ForwardIterator last,
                   const T& value, Compare comp)
{
  first = std::lower_bound(first, last, value, comp);
  return first != last && !bool(comp(value, *first));
}
```
* lower_bound[link lower_bound.md]


##参照
- [LWG Issue 787. complexity of `binary_search`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#787)
    - C++03までの計算量が間違っていたので、C++11で修正。

