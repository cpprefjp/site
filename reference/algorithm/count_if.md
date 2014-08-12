#count_if
```cpp
namespace std {
  template <class InputIterator, class Predicate>
  typename iterator_traits<InputIterator>::difference_type
    count_if(InputIterator first, InputIterator last, Predicate pred);
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

##概要
条件を満たしている要素の数を数える。


##戻り値
`[first,last)` 内のイテレータ `i` について、`pred(*i) != false` であるイテレータの数を返す


##計算量
正確に `last - first` 回の述語の適用を行う


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2,1 };
 
  // 値が 1 または 3 の要素がいくつあるかを数える
  auto count = std::count_if(v.begin(), v.end(), [](int x) { return x == 1 || x == 3; });
  std::cout << "count of 1 or 3: " << count << std::endl;
}
```
* count_if[color ff0000]

###出力
```cpp
count of 1 or 3: 5
```


##実装例
```cpp
template <class InputIterator, class Predicate>
typename iterator_traits<InputIterator>::difference_type
  count_if(InputIterator first, InputIterator last, Predicate pred) {
  typename iterator_traits<InputIterator>::difference_type ret = 0;
  for ( ; first != last; ++first)
    if (pred(*first)) ret++;
  return ret;
}
```

