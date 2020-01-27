# is_permutation
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2);           // (1) C++11

  template <class ForwardIterator1, class ForwardIterator2>
  constexpr bool is_permutation(ForwardIterator1 first1,
                                ForwardIterator1 last1,
                                ForwardIterator2 first2); // (1) C++20

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2,
                      BinaryPredicate pred);              // (2) C++11

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  constexpr bool is_permutation(ForwardIterator1 first1,
                                ForwardIterator1 last1,
                                ForwardIterator2 first2,
                                BinaryPredicate pred);    // (2) C++20

  template <class ForwardIterator1, class ForwardIterator2>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2,
                      ForwardIterator2 last2);            // (3) C++14

  template <class ForwardIterator1, class ForwardIterator2>
  constexpr bool is_permutation(ForwardIterator1 first1,
                                ForwardIterator1 last1,
                                ForwardIterator2 first2,
                                ForwardIterator2 last2);  // (3) C++20

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2,
                      ForwardIterator2 last2,
                      BinaryPredicate pred);              // (4) C++14

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  constexpr bool is_permutation(ForwardIterator1 first1,
                                ForwardIterator1 last1,
                                ForwardIterator2 first2,
                                ForwardIterator2 last2,
                                BinaryPredicate pred);    // (4) C++20
}
```

## 概要
`first2` で始まる範囲を並べ替えたものが、`[first1, last1)` の範囲と一致するか判定する。


## 要件
- `decltype(*first1)` と `decltype(*first2)` の型が同じであること。
- `BinaryPredicate` は同値関係を持っていること。


## 戻り値
`last2` が与えられている形式の場合、`last1 - first1 != last2 - first2` であれば `false` を返す。  
そうでなければ、`[first1, last1)` の範囲と `[first2, first2 + (last1 - first1))` の範囲を並び変えたもので、[`equal`](equal.md)`(first1, last1, first2)`、あるいは [`equal`](equal.md)`(first1, last1, first2, pred)` が `true` を返すようなものがあれば `true` を、そうでなければ `false` を返す。  
なお、実際に並べ替えが行われるわけではない。


## 計算量
`last2` が与えられている形式の場合、`ForwardIterator1` と `ForwardIterator2` がどちらもランダムアクセスイテレータの要件を満たし、かつ `last1 - first1 != last2 - first2` であれば 1 度も述語の適用を行わない。  
そうでなければ、[`equal`](/reference/algorithm/equal.md)`(first1, last1, first2, last2) == true` もしくは [`equal`](/reference/algorithm/equal.md)`(first1, last1, first2, last2, pred) == true` の場合（`last2` が無い形式の場合、[`equal`](/reference/algorithm/equal.md) も `last2` の無い形式で置き換える）、[`distance`](/reference/iterator/distance.md)`(first1, last1)` 回の述語適用で完了する。  
そうでなければ、[`distance`](/reference/iterator/distance.md)`(first1, last1)` をNとした場合に最悪O(N^2)回の述語適用で完了する。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main ()
{
  std::vector<int> v = {1, 2, 3};

  std::vector<int> good = {2, 3, 1};
  std::vector<int> bad = {2, 3, 4};

  std::cout << std::boolalpha;
  std::cout << std::is_permutation(v.begin(), v.end(), good.begin()) << std::endl;
  std::cout << std::is_permutation(v.begin(), v.end(), bad.begin()) << std::endl;
}
```
* std::is_permutation[color ff0000]
* good.begin()[link /reference/vector/vector/begin.md]
* bad.begin()[link /reference/vector/vector/begin.md]

### 出力
```
true
false
```


## 実装例
```cpp
template <class ForwardIterator1, class ForwardIterator2>
bool is_permutation(ForwardIterator1 first1, ForwardIterator1 last1,
                    ForwardIterator2 first2)
{
  std::tie(first1, first2) = std::mismatch(first1, last1, first2);
  if (first1 == last1)
    return true;
  auto last2 = std::next(first2, std::distance(first1, last1));

  for (; first1 != last1; ++first1) {
    auto count2 = std::count(first2, last2, *first1);
    if (count2 == 0 || std::count(std::next(first1), last1, *first1) >= count2)
      return false;
  }
  return true;
}

template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
bool is_permutation(ForwardIterator1 first1, ForwardIterator1 last1,
                    ForwardIterator2 first2, BinaryPredicate pred)
{
  std::tie(first1, first2) = std::mismatch(first1, last1, first2, pred);
  if (first1 == last1)
    return true;
  auto last2 = std::next(first2, std::distance(first1, last1));

  using value_type = typename std::iterator_traits<ForwardIterator1>::value_type;
  auto upred = [&pred, &first1](const value_type& x) { return pred(*first1, x); };
  for (; first1 != last1; ++first1) {
    auto count2 = std::count_if(first2, last2, upred);
    if (count2 == 0 || std::count_if(std::next(first1), last1, upred) >= count2)
      return false;
  }
  return true;
}

# if __cplusplus >= 201402L

template <class RandomAccessIterator1, class RandomAccessIterator2, class BinaryPredicate>
bool is_permutation_impl(RandomAccessIterator1 first1, RandomAccessIterator1 last1,
                         RandomAccessIterator2 first2, RandomAccessIterator2 last2,
                         BinaryPredicate pred,
                         std::random_access_iterator_tag, std::random_access_iterator_tag)
{
  if (last1 - first1 != last2 - first2)
    return false;
  return std::is_permutation(first1, last1, first2, pred);
}

template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
bool is_permutation_impl(ForwardIterator1 first1, ForwardIterator1 last1,
                         ForwardIterator2 first2, ForwardIterator2 last2,
                         BinaryPredicate pred,
                         std::forward_iterator_tag, std::forward_iterator_tag)
{
  std::tie(first1, first2) = std::mismatch(first1, last1, first2, last2, pred);
  if (first1 == last1 || first2 == last2)
    return first1 == last1 && first2 == last2;
  if (std::distance(first1, last1) != std::distance(first2, last2))
    return false;

  auto upred = [&pred, &first1](const auto& x) { return pred(*first1, x); };
  for (; first1 != last1; ++first1) {
    auto count2 = std::count_if(first2, last2, upred);
    if (count2 == 0 || std::count_if(std::next(first1), last1, upred) >= count2)
      return false;
  }
  return true;
}

template <class ForwardIterator1, class ForwardIterator2>
bool is_permutation(ForwardIterator1 first1, ForwardIterator1 last1,
                    ForwardIterator2 first2, ForwardIterator2 last2)
{
  return is_permutation_impl(first1, last1, first2, last2, std::equal_to<>(),
                             typename std::iterator_traits<ForwardIterator1>::iterator_category(),
                             typename std::iterator_traits<ForwardIterator2>::iterator_category());
}


template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
bool is_permutation(ForwardIterator1 first1, ForwardIterator1 last1,
                    ForwardIterator2 first2, ForwardIterator2 last2,
                    BinaryPredicate pred)
{
  return is_permutation_impl(first1, last1, first2, last2, pred,
                             typename std::iterator_traits<ForwardIterator1>::iterator_category(),
                             typename std::iterator_traits<ForwardIterator2>::iterator_category());
}

# endif
```
* std::tie[link /reference/tuple/tie.md]
* std::mismatch[link mismatch.md]
* std::count[link count.md]
* std::count_if[link count_if.md]
* std::next[link /reference/iterator/next.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::equal_to[link /reference/functional/equal_to.md]
* std::random_access_iterator_tag[link /reference/iterator/iterator_tag.md]
* std::forward_iterator_tag[link /reference/iterator/iterator_tag.md]


## バージョン
### 言語
- C++11
- C++14: 2つ目の終端のイテレータ`last2`を実引数に取るオーバー�ードの追加。


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
    - C++14で追加されたオーバー�ードは2015から実装されている。

## 参照
- [N3671 Making non-modifying sequence operations more robust: Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3671.html)
    - C++14から追加された、`last2`を受け取るオーバー�ードの提案文書
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
