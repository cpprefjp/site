# mismatch
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr ranges::mismatch_result<I1, I2> mismatch(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr mismatch_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>> mismatch(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
}
```
* pair[link /reference/utility/pair.md]


## 概要
2つのシーケンスが一致していない場所を検索する。


## 戻り値
`last2`が渡されなかった場合は、`last2 = first2 + (last1 - first1)`とする。

`[first1,last1)` 内にあるイテレータ `i` と、`j == first2 + (i - first1)` であるイテレータ `j` について、

- `j`が範囲`[first2, last2)`に含まれており、
- `!(*i == *j)` もしくは
- `pred(*i, *j) == false` であるような、最初のイテレータのペアを返す。

そのようなイテレータが見つからなかった場合は `last1` と `first2 + (last1 - first1)` のペアを返す。


## 計算量
最大で `last1 - first1` 回の対応する比較もしくは述語が適用される。


## 例
```cpp example
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
* std::mismatch[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
mismatch index: 2
mismatch value: (3,4)

mismatch index: 5
mismatch value: (end,2)
```


## 実装例
```cpp
template <class InputIterator1, class InputIterator2>
std::pair<InputIterator1, InputIterator2> mismatch(
  InputIterator1 first1, InputIterator1 last1, InputIterator2 first2) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(*first1 == *first2))
      return std::make_pair(first1, first2);
  return std::make_pair(first1, first2);
}

template <class InputIterator1, class InputIterator2, class BinaryPredicate>
std::pair<InputIterator1, InputIterator2> mismatch(
  InputIterator1 first1, InputIterator1 last1, InputIterator2 first2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(pred(*first1, *first2)))
      return std::make_pair(first1, first2);
  return std::make_pair(first1, first2);
}
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10


## 参照
- [N4821 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
