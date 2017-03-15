# count
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class T>
  typename iterator_traits<InputIterator>::difference_type
    count(InputIterator first, InputIterator last, const T& value);
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
指定された値と等値な要素の数を数える。


## 戻り値
`[first,last)` 内のイテレータ `i` について、`*i == value` であるイテレータの数を返す


## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2,1 };

  // 値が 1 の要素がいくつあるかを数える
  std::cout << "count of 1: " << std::count(v.begin(), v.end(), 1) << std::endl;
}
```
* std::count[color ff0000]

### 出力
```
count of 1: 3
```


## 実装例
```cpp
template <class InputIterator, class T>
typename iterator_traits<InputIterator>::difference_type
  count(InputIterator first, InputIterator last, const T& value) {
  typename iterator_traits<InputIterator>::difference_type ret = 0;
  for ( ; first != last; ++first)
    if (value == *first) ret++;
  return ret;
}
```


