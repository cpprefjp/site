#reverse
```cpp
namespace std {
  template <class BidirectionalIterator>
  void reverse(BidirectionalIterator first, BidirectionalIterator last);
}
```

##概要
要素の並びを逆にする。


##要件
`*first` は `Swappable` でなければならない


##効果
0 以上 `(last - first) / 2` 以下の整数 `i` について、[`iter_swap`](/reference/algorithm/iter_swap.md)`(first + i, (last - i) - 1)` を行う


##計算量
正確に `(last - first) / 2` 回 swap する


##例
```cpp
#include <algorithm>
#include <iostream>
#include <string>
 
int main() {
  std::string str = "reverse";
 
  std::reverse(str.begin(), str.end());
 
  std::cout << str << std::endl;
}
```
* reverse[color ff0000]

###出力
```
esrever
```


##実装例
```cpp
template <class BidirectionalIterator>
void reverse(BidirectionalIterator first, BidirectionalIterator last) {
  for ( ; first != last && first != --last; ++first)
    iter_swap(first, last);
}
```

