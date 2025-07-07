# merge
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator
    merge(InputIterator1 first1,
          InputIterator1 last1,
          InputIterator2 first2,
          InputIterator2 last2,
          OutputIterator result); // (1) C++03

  template <class InputIterator1, class InputIterator2, class OutputIterator>
  constexpr OutputIterator
    merge(InputIterator1 first1,
          InputIterator1 last1,
          InputIterator2 first2,
          InputIterator2 last2,
          OutputIterator result);  // (1) C++20

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  OutputIterator
    merge(InputIterator1 first1,
          InputIterator1 last1,
          InputIterator2 first2,
          InputIterator2 last2,
          OutputIterator result,
          Compare comp);           // (2) C++03

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  constexpr OutputIterator
    merge(InputIterator1 first1,
          InputIterator1 last1,
          InputIterator2 first2,
          InputIterator2 last2,
          OutputIterator result,
          Compare comp);           // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class ForwardIterator>
  ForwardIterator
    merge(ExecutionPolicy&& exec,
          ForwardIterator1 first1,
          ForwardIterator1 last1,
          ForwardIterator2 first2,
          ForwardIterator2 last2,
          ForwardIterator result); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class ForwardIterator, class Compare>
  ForwardIterator
    merge(ExecutionPolicy&& exec,
          ForwardIterator1 first1,
          ForwardIterator1 last1,
          ForwardIterator2 first2,
          ForwardIterator2 last2,
          ForwardIterator result,
          Compare comp);           // (4) C++17
}
```

## 概要
2つのソート済みイテレータ範囲`[first1, last1)`と`[first2, last2)`をマージする。


## 事前条件
- `[first1,last1)` と `[first2,last2)` は `operator<` または `comp` でソートされていること。
- 結果のイテレータ範囲と入力のイテレータ範囲は重なっていてはならない。


## 効果
イテレータ範囲`[first1,last1)`とイテレータ範囲`[first2,last2)` の２つの要素を全て `[result,result_last)` へコピーする。その際に、[`is_sorted`](is_sorted.md)`(result, result_last)` または [`is_sorted`](is_sorted.md)`(result, result_last, comp)` の条件を満たすようにコピーする（`result_last` は `result + (last1 - first1) + (last2 - first2)` とする）。


## 戻り値
```cpp
return result + (last1 - first1) + (last2 - first2);
```


## 計算量
`N = (last1 - first1) + (last2 - first2)`であるとして説明する。

- (1), (2) : 最大でN - 1回比較する
- (3), (4) : O(N) 回だけ比較する


## 備考
この操作は安定である。つまり、各入力イテレータ範囲内の要素の前後関係は保たれ、また、1 番目の範囲と 2 番目に等値の要素があった場合には、1 番目の範囲の要素の方が先に来る。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> a = {3, 1, 4, 2};
  std::vector<int> b = {2, 5, 6, 4};
  std::vector<int> result;

  std::sort(a.begin(), a.end());
  std::sort(b.begin(), b.end());

  // aとbをマージ
  std::merge(a.begin(), a.end(),
             b.begin(), b.end(),
             std::back_inserter(result));

  std::for_each(result.begin(), result.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::merge[color ff0000]
* a.begin()[link /reference/vector/vector/begin.md]
* a.end()[link /reference/vector/vector/end.md]
* b.begin()[link /reference/vector/vector/begin.md]
* b.end()[link /reference/vector/vector/end.md]
* result.begin()[link /reference/vector/vector/begin.md]
* result.end()[link /reference/vector/vector/end.md]
* std::back_inserter[link /reference/iterator/back_inserter.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]
* std::for_each[link /reference/algorithm/for_each.md]

### 出力
```
1
2
2
3
4
4
5
6
```


## 実装例
```cpp
template <class InputIterator1, class InputIterator2, class OutputIterator>
OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                     InputIterator2 first2, InputIterator2 last2,
                     OutputIterator result)
{
  while (first1 != last1) {
    if (first2 == last2)
      return std::copy(first1, last1, result);
    *result++ = *first2 < *first1 ? *first2++ : *first1++;
  }
  return std::copy(first2, last2, result);
}

template <class InputIterator1, class InputIterator2, class OutputIterator,
          class Compare>
OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                     InputIterator2 first2, InputIterator2 last2,
                     OutputIterator result, Compare comp)
{
  while (first1 != last1) {
    if (first2 == last2)
      return std::copy(first1, last1, result);
    *result++ = comp(*first2, *first1) ? *first2++ : *first1++;
  }
  return std::copy(first2, last2, result);
}
```


## 関連項目
- [`std::set::merge()`](/reference/set/set/merge.md)
- [`std::set_union()`](set_union.md)


## 参照
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
