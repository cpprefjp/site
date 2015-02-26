#mismatch
* algorithm[meta header]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  pair<InputIterator1, InputIterator2>
    mismatch(InputIterator1 first1, InputIterator1 last1, InputIterator2 first2);

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  pair<InputIterator1, InputIterator2>
  mismatch(InputIterator1 first1, InputIterator1 last1,
           InputIterator2 first2, BinaryPredicate pred);
}
```
* pair[link /reference/utility/pair.md]


##概要
2つのシーケンスが一致していない場所を検索する。


##戻り値
`[first1,last1)` 内にあるイテレータ `i` と、`j == first2 + (i - first1)` であるイテレータ `j` について、`!(*i == *j)` もしくは `pred(*i, *j) == false` であるような最初のイテレータのペアを返す。
そのようなイテレータが見つからなかった場合は `last1` と `first2 + (last1 - first1)` のペアを返す。


##計算量
最大で `last1 - first1` 回の対応する比較もしくは述語が適用される。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>
#include <list>
#include <iterator> // for begin, end
#include <string>   // for to_string

// mismatch の結果で得られた pair に対する情報を出力する
template <class Range1, class Range2, class Pair>
void print_mismatch_value(const Range1& r1, const Range2& r2, const Pair& p) {
  std::cout << "mismatch index: " << std::distance(std::begin(r1), p.first) << std::endl;
  std::cout << "mismatch value: (" << (std::end(r1) == p.first  ? "end" : std::to_string(*p.first)) << ","
                                   << (std::end(r2) == p.second ? "end" : std::to_string(*p.second)) << ")"
            << std::endl;
}

int main() {
  const std::vector<int>   v  = { 1,2,3,4,3,2 };
  const std::array<int, 6> v2 = { 1,2,4,3,2,1 };
  const std::list<int>     v3 = { 1,2,3,4,3, };

  // v と v2 で異なる場所を探す
  auto pair = std::mismatch(v.begin(), v.end(), v2.begin());
  print_mismatch_value(v, v2, pair);

  std::cout << std::endl;

  // v と v3 で異なる場所を探す。
  // v.size() > v3.size() なので mismatch(v.begin(), v.end(), v3.begin()) とやってはいけない。
  auto pair2 = std::mismatch(v3.begin(), v3.end(), v.begin());
  print_mismatch_value(v3, v, pair2);
}
```
* mismatch[color ff0000]

###出力
```
mismatch index: 2
mismatch value: (3,4)

mismatch index: 5
mismatch value: (end,2)
```


##実装例
```cpp
template <class InputIterator1, class InputIterator2>
pair<InputIterator1, InputIterator2> mismatch(
  InputIterator1 first1, InputIterator1 last1, InputIterator2 first2) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(*first1 == *first2))
      return make_pair(first1, first2);
  return make_pair(first1, first2);
}

template <class InputIterator1, class InputIterator2, class BinaryPredicate>
pair<InputIterator1, InputIterator2> mismatch(
  InputIterator1 first1, InputIterator1 last1, InputIterator2 first2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(pred(*first1, *first2)))
      return make_pair(first1, first2);
  return make_pair(first1, first2);
}
```

