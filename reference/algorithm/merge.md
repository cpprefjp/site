#merge
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                       InputIterator2 first2, InputIterator2 last2,
                       OutputIterator result);

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                       InputIterator2 first2, InputIterator2 last2,
                       OutputIterator result, Compare comp);
}
```

##概要
2つのソート済み範囲をマージする。


##要件
- `[first1,last1)` と `[first2,last2)` は `operator<` または `comp` でソートされていること。
- 結果の範囲と入力の範囲は重なっていてはならない。


##効果
`[first1,last1)` と `[first2,last2)` の２つの要素を全て `[result,result_last)` へコピーする。その際に、[`is_sorted`](/reference/algorithm/is_sorted.md)`(result, result_last)` または [`is_sorted`](/reference/algorithm/is_sorted.md)`(result, result_last, comp)` の条件を満たすようにコピーする（`result_last` は `result + (last1 - first1) + (last2 - first2)` とする）。


##戻り値
`result + (last1 - first1) + (last2 - first2)`


##計算量
最大で `(last1 - first1) + (last2 - first2) - 1` 回比較する。


##備考
この操作は安定である。つまり、各入力範囲内の要素の前後関係は保たれ、また、1 番目の範囲と 2 番目に等値の要素があった場合には、1 番目の範囲の要素の方が先に来る。


##例
```cpp
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
* merge[color ff0000]
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* algorithm[link ../algorithm.md]
* sort[link sort.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]
* back_inserter[link ../iterator/back_insert_iterator/back_inserter.md]
* for_each[link for_each.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]

###出力
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


##実装例
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
* copy[link copy.md]
