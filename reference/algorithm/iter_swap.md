#iter_swap
```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  void iter_swap(ForwardIterator1 a, ForwardIterator2 b);
}
```

##概要
2つのイテレータの要素を入れ替える。


###要件
- `a` と `b` は `Dereferenceable` でなければならない。
- `*a` は `*b` と `Swappable` でなければならない。


##効果
[`swap`](/reference/utility/swap.md)`(*a, *b)`


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v1 = { 3,1,4 };
  std::vector<int> v2 = { 4,2,5 };

  std::iter_swap(v1.begin()+1, v2.begin()+2);

  std::cout << "v1: ";
  std::copy(v1.begin(), v1.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;

  std::cout << "v2: ";
  std::copy(v2.begin(), v2.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;
}
```
* iter_swap[color ff0000]

###出力
```
v1: 3,5,4,
v2: 4,2,1,
```


##実装例
```cpp
template <class ForwardIterator1, class ForwardIterator2>
void iter_swap(ForwardIterator1 a, ForwardIterator2 b) {
  swap(*a, *b);
}
```

