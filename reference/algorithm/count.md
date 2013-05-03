#count

```cpp
namespace std {
  template <class InputIterator, class T>
  typename iterator_traits<InputIterator>::difference_type
    count(InputIterator first, InputIterator last, const T& value);
}
```

###概要
指定された値である要素の数を数える。

###戻り値
`[first,last)` 内のイテレータ `i` について、`*i == value` であるイテレータの数を返す

###計算量
正確に `last - first` 回の比較を行う

###実装例
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

###使用例
```
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2,1 };
 
  // 値が 1 の要素がいくつあるかを数える
  std::cout << "count of 1: " << std::count(v.begin(), v.end(), 1) << std::endl;
}
```

###出力
```
count of 1: 3
```

