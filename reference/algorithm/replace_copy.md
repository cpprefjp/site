# replace_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class T>
  OutputIterator replace_copy(InputIterator first,
                              InputIterator last,
                              OutputIterator result,
                              const T& old_value,
                              const T& new_value);
}
```

## 概要
指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする。


## 要件
- `*first` と `new_value` は `result` へ書き込み可能でなければならない。
- また、`[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない。


## 効果
`[result,result + (last - first))` 内のイテレータ `i` について、`*(first + (i - result)) == old_value` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


## 戻り値
`result + (last - first)`


## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換えたものを出力する
  std::replace_copy(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","), 1, 10);
}
```
* std::replace_copy[color ff0000]

### 出力
```
3,10,2,10,2,
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator, class T>
OutputIterator replace_copy(InputIterator first, InputIterator last, OutputIterator result,
                            const T& old_value, const T& new_value) {
  for ( ; first != last; ++first)
    *result++ = *first == old_value ? new_value : *first;
  return result;
}
```

