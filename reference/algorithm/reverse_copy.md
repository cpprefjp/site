#reverse_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator, class OutputIterator>
  OutputIterator reverse_copy(BidirectionalIterator first,
                              BidirectionalIterator last,
                              OutputIterator result);
}
```

##概要
要素の並びを逆にし、その結果を出力の範囲へコピーする。


##要件
`[first,last)` と `[result,result+(last-first))` は領域が重なっていてはならない。


##効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + (last - first) -1 - i) = *(first + i)` を行うことで、`[first,last)` の範囲を `[result,result+(last-first))` へコピーする。


##戻り値
`result + (last - first)`


##計算量
正確に `last - first` 回代入する


##使用例
```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "reverse";

  std::reverse_copy(str.begin(), str.end(),
    std::ostream_iterator<char>(std::cout, ""));
}
```
* std::reverse_copy[color ff0000]
* std::string[link /reference/string/basic_string.md]
* str.begin()[link /reference/string/basic_string/begin.md]
* str.end()[link /reference/string/basic_string/end.md]
* std::ostream_iterator[link /reference/iterator/ostream_iterator.md]
* std::cout[link /reference/iostream/cout.md]

###出力
```
esrever
```


##実装例
```cpp
template <class BidirectionalIterator, class OutputIterator>
OutputIterator reverse_copy(BidirectionalIterator first,
                            BidirectionalIterator last,
                            OutputIterator result) {
  while (first != last)
    *result++ = *--last;
  return result;
}
```


###備考
- [LWG Issue 2074. Off by one error in `std::reverse_copy`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3438.html#2074)
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)

