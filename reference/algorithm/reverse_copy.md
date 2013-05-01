#reverse_copy

```cpp
namespace std {

  template <class BidirectionalIterator, class OutputIterator>

  OutputIterator reverse_copy(BidirectionalIterator first, BidirectionalIterator last,

                              OutputIterator result);

}
```

###概要
要素の並びを逆にし、その結果を出力の範囲へコピーする。

###効果

0 以上 last - first 未満の整数 i について、*(result + (last - first) -1 - i) = *(first + i) を行うことで、[first,last) の範囲を [result,result+(last-first)) へコピーする。

###要件

[first,last) と [result,result+(last-first)) は領域が重なっていてはならない。

###戻り値

result + (last - first)

###計算量

正確に last - first 回代入する

###実装例


```cpp
template <class BidirectionalIterator, class OutputIterator>

OutputIterator reverse_copy(BidirectionalIterator first, BidirectionalIterator last,

                            OutputIterator result) {

  while (first != last)

    *result++ = *--last;

  return result;

}
```

###使用例


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
* reverse_copy[color ff0000]

###出力
```cpp
esrever
```

###備考
このページには、C++11規格に対する修正ドラフト仕様であるN3485に取り入れられた、以下の変更を取り入れてある：
[2074. Off by one error in std::reverse_copy](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3438.html#2074)

