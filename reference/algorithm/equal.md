#equal
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2);

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2, BinaryPredicate pred);

  template <class InputIterator1, class InputIterator2>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2, InputIterator2 last2);                          // C++14 から

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2, InputIterator2 last2, BinaryPredicate pred);    // C++14 から
}
```

##概要
2つの範囲を等値比較する。


##戻り値
`last2` が与えられている形式の場合、もし `last1 - first1 != last2 - first2` であれば、`false` を返す。  
そうでない場合、`[first1,last1)` 内のイテレータ `i` について、`*i == *(first2 + (i - first1))` もしくは `pred(*i, *(first2 + (i - first1))) != false` が全てのイテレータ `i` について満たされているのであれば `true` を返す。  
そうでない場合は `false` を返す。


##計算量
`last2` が与えられている形式の場合、もし `InputIterator1` と `InputIterator2` が共にランダムアクセスイテレータの要件を満たす場合で、かつ、`last1 - first1 != last2 - first2` の場合、1 度も比較または述語は適用されない。  
そうでない場合、最大で `last1 - first1` 回（`last2` が与えられていない形式の場合）、あるいは、`min(last1 - first1, last2 - first2)` 回（`last2` が与えられている形式の場合）の比較または述語が適用される。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>
#include <iterator>

int main() {
  std::vector<int>   v  = { 1,2,3,4,3,2 };
  std::array<int, 6> v2 = { 1,2,3,4,2,1 };

  // コンテナの中身が同じかどうか調べる
  bool result = std::equal(std::begin(v), std::end(v), std::begin(v2));
  std::cout << std::boolalpha << result << std::endl;

  // x±1 の誤差を許すようにする
  bool result2 = std::equal(std::begin(v), std::end(v), std::begin(v2),
                            [](int x, int y) { return x - 1 <= y && y <= x + 1; });
  std::cout << std::boolalpha << result2 << std::endl;
}
```
* algorithm[link ../algorithm.md]
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* iterator[link ../iterator.md]
* array[link ../array.md]
* equal[color ff0000]
* boolalpha[link ../ios/boolalpha.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* begin[link ../iterator/begin.md]
* end[link ../iterator/end.md]

###出力
```cpp
false
true
```


##実装例
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

#if __cplusplus >= 201402L

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

#endif
```
* equal_to[link ../functional/equal_to.md]
* iterator_traits[link ../iterator/iterator_traits.md]


##参照
- [N3671 Making non-modifying sequence operations more robust: Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3671.html)
    - C++14から追加された、`last2`を受け取るオーバーロードの提案文書

