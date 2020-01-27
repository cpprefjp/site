# remove_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class T>
  OutputIterator
    remove_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                const T& value);         // (1) C++03

  template <class InputIterator, class OutputIterator, class T>
  constexpr OutputIterator
    remove_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                const T& value);         // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class T>
  ForwardIterator2
    remove_copy(ExecutionPolicy&& exec,
                ForwardIterator1 first,
                ForwardIterator1 last,
                ForwardIterator2 result,
                const T& value);         // (2) C++17
}
```

## 概要
指定された要素を除け、その結果を出力の範囲へコピーする。


## 要件
- `[first,last)` と `[result,result + (last - first)` は重なってはならない。
- `*result = *first` という式が有効でなければならない。

## 効果
`[first,last)` 内にあるイテレータ `i` について、`*i == value` でない要素を `result` へコピーする


## 戻り値
実行結果の範囲の終端を返す


## 計算量
�確に `last - first` 回の比較を行う


## 備考
安定。


## 例
```cpp example
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
* std::remove_copy[color ff0000]

### 出力
```
2,3,2,
```


## 実装例
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


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
