#remove_copy

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class T>
  OutputIterator remove_copy(InputIterator first, InputIterator last,
                             OutputIterator result, const T& value);
}
```

###概要
指定された要素を除け、その結果を出力の範囲へコピーする。


###要件
`[first,last)` と `[result,result + (last - first)` は重なってはならない。
`*result = *first` という式が有効でなければならない。

###効果
`[first,last)` 内にあるイテレータ `i` について、`*i == value` でない要素を `result` へコピーする


###戻り値
実行結果の範囲の終端を返す


###計算量
正確に `last - first` 回の比較を行う


###注意
安定。


###実装例
```cpp
template <class InputIterator, class OutputIterator, class T>
OutputIterator remove_copy(InputIterator first, InputIterator last,
                           OutputIterator result, const T& value) {
  for ( ; first != last; ++first)
    if (!(*first == value))
      *result++ = *first;
  return result;
}
```

###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>
 
int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 1 を除去した結果を出力する
  std::remove_copy(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","), 1);
}
```
* remove_copy[color ff0000]

###出力
```
2,3,2,
```

