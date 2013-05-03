#merge
```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                       InputIterator2 first2, InputIterator2 last2,
                       OutputIterator result);

  template <class InputIterator1, class InputIterator2, class OutputIterator, class Compare>
  OutputIterator merge(InputIterator1 first1, InputIterator1 last1,
                       InputIterator2 first2, InputIterator2 last2,
                       OutputIterator result, Compare comp);
}
```

##概要
2つのソート済み範囲をマージする


##要件
`[first1,last1)` と `[first2,last2)` は `operator<` または `comp` でソートされている必要がある。
結果の範囲と入力の範囲は重なっていてはならない。


##効果
`[first1,last1)` と `[first2,last2)` の２つの要素を全て `[result,result_last)` へコピーする。その際に、[`is_sorted`](/reference/algorithm/is_sorted.md)`(result, result_last)` または [`is_sorted`](/reference/algorithm/is_sorted.md)`(result, result_last, comp)` の条件を満たすようにコピーする（`result_last` は `result + (last1 - first1) + (last2 - first2)` とする）。


##戻り値
`result + (last1 - first1) + (last2 - first2)`


##計算量
最大で `(last1 - first1) + (last2 - first2) - 1` 回比較する。


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
```

##参照

