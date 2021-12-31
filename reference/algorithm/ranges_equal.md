# equal
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool equal(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool equal(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});}
```

## 概要
2つの範囲を等値比較する。

- (1) : 範囲`[first1, last1)`と範囲`[first2, first2 + (last1 - first1))`が等値かを判定する
- (2) : (1)の等値比較を任意の2引数関数オブジェクトで行う
- (3) : 範囲`[first1, last1)`と範囲`[first2, last2)`が等値かを判定する
- (4) : (3)の等値比較を任意の2引数関数オブジェクトで行う

2つの範囲が異なる要素数であった場合、`false`を返す。

2つの範囲が要素数および各要素が等値であった場合、`true`を返す。


## 戻り値
`last2` が与えられている形式の場合、もし `last1 - first1 != last2 - first2` であれば、`false` を返す。  
そうでない場合、`[first1,last1)` 内のイテレータ `i` について、`*i == *(first2 + (i - first1))` もしくは `pred(*i, *(first2 + (i - first1))) != false` が全てのイテレータ `i` について満たされているのであれば `true` を返す。  
そうでない場合は `false` を返す。


## 計算量
`last2` が与えられていない形式では、`last2 = first2 + (last1 - first1)`であるとして説明する。

- (1), (2), (3), (4) : `InputIterator1` と `InputIterator2` が共にランダムアクセスイテレータの要件を満たす場合で、かつ、`last1 - first1 != last2 - first2` の場合、1 度も比較または述語は適用されない。そうでない場合、最大で `min(last1 - first1, last2 - first2)` 回の比較または述語が適用される。
- (5), (6), (7), (8) : `ForwardIterator1` と `ForwardIterator2` が共にランダムアクセスイテレータの要件を満たす場合で、かつ、`last1 - first1 != last2 - first2` の場合、1 度も比較または述語は適用されない。そうでない場合、O(`min(last1 - first1, last2 - first2)`) の計算量で比較または述語が適用される。


## 備考
- ランダムアクセスイテレータの範囲を使用する場合、状況によっては(1) (2)のバージョンよりも、(3) (4)を使用する方が効率がよくなることが期待できる。ランダムアクセスイテレータはイテレータ同士の差を定数時間で求められるため、イテレーションを行うことなく2つの範囲の要素数が異なることを検出できるためである


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>
#include <iterator>

int main() {
  std::vector<int>   v  = { 1,2,3,4,3,2 };
  std::array<int, 6> v2 = { 1,2,3,4,2,1 };

  // コンテナの中身が同じかどうか調べる
  bool result = std::equal(std::begin(v), std::end(v), std::begin(v2), std::end(v2));
  std::cout << std::boolalpha << result << std::endl;

  // x±1 の誤差を許すようにする
  bool result2 = std::equal(std::begin(v), std::end(v), std::begin(v2), std::end(v2),
                            [](int x, int y) { return x - 1 <= y && y <= x + 1; });
  std::cout << std::boolalpha << result2 << std::endl;
}
```
* std::equal[color ff0000]

### 出力
```
false
true
```


## 実装例
```cpp
template<class InputIterator1, class InputIterator2>
bool equal(InputIterator1 first1, InputIterator1 last1,
           InputIterator2 first2) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(*first1 == *first2))
      return false;
  return true;
}

template<class InputIterator1, class InputIterator2, class BinaryPredicate>
bool equal(InputIterator1 first1, InputIterator1 last1,
           InputIterator2 first2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(pred(*first1, *first2)))
      return false;
  return true;
}

# if __cplusplus >= 201402L

template<class RandomAccessIterator1, class RandomAccessIterator2, class BinaryPredicate>
inline bool equal_impl(RandomAccessIterator1 first1, RandomAccessIterator1 last1,
                       RandomAccessIterator2 first2, RandomAccessIterator2 last2,
                       BinaryPredicate pred,
                       random_access_iterator_tag, random_access_iterator_tag) {
  if (last1 - first1 != last2 - first2)
    return false;
  return std::equal(first1, last1, first2, pred);
}

template<class InputIterator1, class InputIterator2, class BinaryPredicate>
bool equal_impl(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, InputIterator2 last2, BinaryPredicate pred,
                input_iterator_tag, input_iterator_tag) {
  for ( ; first1 != last1 && first2 != last2; ++first1, ++first2)
    if (!bool(pred(*first1, *first2)))
      return false;
  return first1 == last1 && first2 == last2;
}

template<class InputIterator1, class InputIterator2, class BinaryPredicate>
inline bool equal(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, InputIterator2 last2, BinaryPredicate pred) {
  return equal_impl(first1, last1, first2, last2, pred,
                    typename iterator_traits<InputIterator1>::iterator_category(),
                    typename iterator_traits<InputIterator2>::iterator_category());
}

template<class InputIterator1, class InputIterator2>
inline bool equal(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, InputIterator2 last2) {
  return std::equal(first1, last1, first2, last2, equal_to<>());
}

# endif
```
* ranges::equal_to[link ../functional/ranges_equal_to.md]
* iterator_traits[link ../iterator/iterator_traits.md]


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
