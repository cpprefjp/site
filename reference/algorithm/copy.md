# copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator copy(InputIterator first, InputIterator last, OutputIterator result);
}
```

## 概要
指定された範囲の要素をコピーする。


## 要件
`result` は `[first,last)` の範囲に含まれてはならない。


## 効果
`[first,last)` 内の要素を、それぞれ `[result,result + (last - first))` へコピーする。

コピーは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = *(first + n)` を行う。


## 戻り値
`result + (last - first)`


## 計算量
正確に `last - first` 回代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2 };

  // v から v2 へ普通にコピーする
  std::vector<int> v2(v.size()); // ちゃんと確保しておくこと
  std::copy(v.begin(), v.end(), v2.begin());

  // back_inserter を使って v3 へ設定。
  // back_inserter は要素をコピーするときに v3.push_back() するイテレータを作る関数。
  std::list<int> ls3;
  std::copy(v2.begin(), v2.end(), std::back_inserter(ls3));

  // ostream_iterator を使って出力。
  // ostream_iterator<int>(cout, ",") は要素をコピーするときに cout << x << "," としてくれるイテレータ。
  std::copy(ls3.begin(), ls3.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* std::copy[color ff0000]

### 出力
```
3,1,2,
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator copy(InputIterator first, InputIterator last, OutputIterator result) {
  while (first != last)
    *result++ = *first++;
  return result;
}
```

