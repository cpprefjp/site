# equal
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool equal(InputIterator1 first1,
             InputIterator1 last1,
             InputIterator2 first2);           // (1) C++03

  template <class InputIterator1, class InputIterator2>
  constexpr bool equal(InputIterator1 first1,
                       InputIterator1 last1,
                       InputIterator2 first2); // (1) C++20

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  bool equal(InputIterator1 first1,
             InputIterator1 last1,
             InputIterator2 first2,
             BinaryPredicate pred);            // (2) C++03

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  constexpr bool equal(InputIterator1 first1,
                       InputIterator1 last1,
                       InputIterator2 first2,
                       BinaryPredicate pred);  // (2) C++20

  template <class InputIterator1, class InputIterator2>
  bool equal(InputIterator1 first1,
             InputIterator1 last1,
             InputIterator2 first2,
             InputIterator2 last2);            // (3) C++14

  template <class InputIterator1, class InputIterator2>
  constexpr bool equal(InputIterator1 first1,
                       InputIterator1 last1,
                       InputIterator2 first2,
                       InputIterator2 last2);  // (3) C++20

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  bool equal(InputIterator1 first1,
             InputIterator1 last1,
             InputIterator2 first2,
             InputIterator2 last2,
             BinaryPredicate pred);            // (4) C++14

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  constexpr bool equal(InputIterator1 first1,
                       InputIterator1 last1,
                       InputIterator2 first2,
                       InputIterator2 last2,
                       BinaryPredicate pred);  // (4) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  bool equal(ExecutionPolicy&& exec,
             ForwardIterator1 first1,
             ForwardIterator1 last1,
             ForwardIterator2 first2);         // (5) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryPredicate>
  bool equal(ExecutionPolicy&& exec,
             ForwardIterator1 first1,
             ForwardIterator1 last1,
             ForwardIterator2 first2,
             BinaryPredicate pred);            // (6) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  bool equal(ExecutionPolicy&& exec,
             ForwardIterator1 first1,
             ForwardIterator1 last1,
             ForwardIterator2 first2,
             ForwardIterator2 last2);          // (7) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryPredicate>
  bool equal(ExecutionPolicy&& exec,
             ForwardIterator1 first1,
             ForwardIterator1 last1,
             ForwardIterator2 first2,
             ForwardIterator2 last2,
             BinaryPredicate pred);            // (8) C++17
}
```

## 概要
2つの範囲を�値比較する。

- (1) : 範囲`[first1, last1)`と範囲`[first2, first2 + (last1 - first1))`が�値かを判定する
- (2) : (1)の�値比較を任意の2引数関数オブジェクトで行う
- (3) : 範囲`[first1, last1)`と範囲`[first2, last2)`が�値かを判定する
- (4) : (3)の�値比較を任意の2引数関数オブジェクトで行う

2つの範囲が異なる要素数であった場合、`false`を返す。

2つの範囲が要素数および各要素が�値であった場合、`true`を返す。


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

  // コンテナの�身が同じかどうか調べる
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
* equal_to[link ../functional/equal_to.md]
* iterator_traits[link ../iterator/iterator_traits.md]


## バージョン
### 言語
- C++98
- C++14: 2つ目の終端のイテレータ`last2`を実引数に取るオーバー�ードの追加。

### 処理系(last2を受け取るバージョン)
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [N3671 Making non-modifying sequence operations more robust: Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3671.html)
    - C++14から追加された、`last2`を受け取るオーバー�ードの提案文書
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
