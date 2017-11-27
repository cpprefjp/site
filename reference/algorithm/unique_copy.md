# unique_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator unique_copy(InputIterator first, InputIterator last,
                             OutputIterator result);

  template <class InputIterator, class OutputIterator, class BinaryPredicate>
  OutputIterator unique_copy(InputIterator first, InputIterator last,
                             OutputIterator result, BinaryPredicate pred);
}
```

## 概要
重複した要素を取り除き、その結果を出力の範囲へコピーする。


## 要件
- 比較関数は等価関係を持っていなければならない。
- `[first,last)` と `[result,result + (last - first))` は重なっていてはならない。
- `*result = *first` は有効な式でなければならない。
- `InputIterator` と `OutputIterator` のどちらも forward iterator の要求を満たしていない場合、`InputIterator` の value type は `CopyConstructible` かつ `CopyAssignable` でなければならない。そうでない場合は `CopyConstructible` は要求されない。


## 効果
`[first,last)` 内のイテレータ `i` について、`*(i - 1) == *i` もしくは `pred(*(i - 1), *i) != false` による等値の比較によって連続したグループに分け、それぞれのグループの先頭を `result` へコピーする。


## 戻り値
結果の範囲の終端を返す。


## 計算量
`[first,last)` が空の範囲でない場合、正確に `last - first - 1` 回の比較または述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };
  std::vector<int> uniqued;

  // 連続した値を削除してコピーする
  std::unique_copy(v.begin(), v.end(), std::back_inserter(uniqued));

  std::for_each(uniqued.begin(), uniqued.end(), [](int x) { std::cout << x << ","; });
}
```
* std::unique_copy[color ff0000]
* uniqued.begin()[link /reference/vector/begin.md]
* uniqued.end()[link /reference/vector/end.md]

### 出力
```
2,5,3,1,2,4,2,1,4,3,
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator unique_copy(InputIterator first, InputIterator last,
                           OutputIterator result) {
  if (first == last) return result;

  auto value = *first++;
  *result++ = value;
  for ( ; first != last; ++first) {
    if (!(value == *first)) {
      value = *first;
      *result++ = value;
    }
  }

  return result;
}

template <class InputIterator, class OutputIterator, class BinaryPredicate>
OutputIterator unique_copy(InputIterator first, InputIterator last,
                           OutputIterator result, BinaryPredicate pred) {
  if (first == last) return result;

  auto value = *first++;
  *result++ = value;
  for ( ; first != last; ++first) {
    if (!pred(value, *first)) {
      value = *first;
      *result++ = value;
    }
  }

  return result;
}
```

