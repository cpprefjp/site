#reverse
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

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
0 以上 `(last - first) / 2` 未満の整数 `i` について、[`iter_swap`](/reference/algorithm/iter_swap.md)`(first + i, (last - i) - 1)` を行う


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


##参照
- [LWG Issue 2039. Issues with `std::reverse` and `std::copy_if`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2039)
    - C++11まで、効果を「0 以上 `(last - first) / 2` **以下**の整数 `i` について、」と記載していたが、これは間違いなので、C++14で「0 以上 `(last - first) / 2` **未満**の整数 `i` について、」と修正。

