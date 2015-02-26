#fill
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class ForwardIterator, class T>
  void fill(ForwardIterator first, ForwardIterator last, const T& value);
}
```

##概要
指定された値で出力の範囲に書き込む。


##要件
`value` は `output iterator` へ書き込み可能でなければならない


##効果
`[first,last)` 内の全ての要素に `value` を代入する


##計算量
正確に `last - first` 回の代入を行う


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v(5);

  // v を 3 の値で埋める
  std::fill(v.begin(), v.end(), 3);

  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << ","; });
}
```
* fill[color ff0000]

###出力
```
3,3,3,3,3,
```


##実装例
```cpp
template <class ForwardIterator, class T>
void fill(ForwardIterator first, ForwardIterator last, const T& value) {
  while (first != last)
    *first++ = value;
}
```

