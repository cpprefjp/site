#remove_copy_if
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class Predicate>
  OutputIterator remove_copy_if(InputIterator first, InputIterator last,
                                OutputIterator result, Predicate pred);

}
```

##概要
条件を満たす要素を除け、その結果を出力の範囲へコピーする。


##要件
- `[first,last)` と `[result,result + (last - first9)` は重なってはならない。
- `*result = *first` という式が有効でなければならない。


##効果
`[first,last)` 内にあるイテレータ `i` について、`pred(*i) != false` でない要素を `result` へコピーする


##戻り値
実行結果の範囲の終端を返す


##計算量
正確に `last - first` 回の述語の適用を行う


##備考
安定


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 奇数を除去した結果を出力する
  std::remove_copy_if(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","),
    [](int x) { return x%2 != 0; });
}
```
* std::remove_copy_if[color ff0000]
* std::ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力
```
2,2,
```


##実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate>
OutputIterator remove_copy_if(InputIterator first, InputIterator last,
                              OutputIterator result, Predicate pred) {
  for ( ; first != last; ++first)
    if (!pred(*first))
      *result++ = *first;
  return result;
}
```

