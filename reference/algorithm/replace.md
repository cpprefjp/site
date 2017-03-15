# replace
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class T>
  void replace(ForwardIterator first, ForwardIterator last,
               const T& old_value, const T& new_value);
}
```

## 概要
指定された値と一致する要素を指定された値に置き換える。


## 要件
`*first = new_value` という式が有効でなければならない。


## 効果
`[first,last)` 内のイテレータ `i` について、`*i == old_value` であるものは `*i = new_value` という式によって置き換えられる。


## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換える
  std::replace(v.begin(), v.end(), 1, 10);

  std::for_each(v.begin(), v.end(),
    [](int x) { std::cout << x << ","; });
}
```
* std::replace[color ff0000]

### 出力
```
3,10,2,10,2,
```


## 実装例
```cpp
template <class ForwardIterator, class T>
void replace(ForwardIterator first, ForwardIterator last,
             const T& old_value, const T& new_value) {
  for ( ; first != last; ++first)
    if (*first == old_value)
      *first = new_value;
}
```

