# replace_if
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class Predicate, class T>
  void replace_if(ForwardIterator first, ForwardIterator last,
                  Predicate pred, const T& new_value);
}
```

## 概要
条件を満たす要素を指定された値に置き換える。


## 要件
`*first = new_value` という式が有効でなければならない。


## 効果
`[first,last)` 内のイテレータ `i` について、`pred(*i) != false` であるものは `*i = new_value` という式によってに置き換えられる。


## 計算量
正確に `last - first` 回の述語の適用を行う。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 奇数の要素を全部 10 に置き換える
  std::replace_if(v.begin(), v.end(),
    [](int x) { return x%2 != 0; }, 10);

  std::for_each(v.begin(), v.end(),
    [](int x) { std::cout << x << ","; });
}
```
* std::replace_if[color ff0000]

### 出力
```
10,10,2,10,2,
```


## 実装例
```cpp
template <class ForwardIterator, class Predicate, class T>
void replace_if(ForwardIterator first, ForwardIterator last,
                Predicate pred, const T& new_value) {
  for ( ; first != last; ++first)
    if (pred(*first))
      *first = new_value;
}
```

