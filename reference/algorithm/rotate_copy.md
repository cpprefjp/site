#rotate_copy
```cpp
namespace std {
  template <class ForwardIterator, class OutputIterator>
  OutputIterator rotate_copy(ForwardIterator first,
                             ForwardIterator middle,
							 ForwardIterator last,
                             OutputIterator result);
}
```

##概要
要素の並びを回転させ、その結果を出力の範囲へコピーする。


##要件
`[first,last)` と `[result,result + (last - first))` の範囲は重なっていてはならない。


##効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + i) = *(first + (i + (middle - first)) % (last - first))` という操作によって `[first,last)` の範囲を `[result,result + (last - first))` の範囲へコピーする


##戻り値
`result + (last - first)`


##計算量
正確に `last - first` 回代入する。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>
 
int main() {
  std::string str = "rotate";
  std::string result;
 
  std::rotate_copy(str.begin(), str.begin() + 2, str.end(),
    std::back_inserter(result));

  std::cout << result << std::endl;
}
```
* rotate_copy[color ff0000]


###出力
```
tatero
```


##実装例
```cpp
template <class ForwardIterator, class OutputIterator>
OutputIterator rotate_copy(ForwardIterator first,
                           ForwardIterator middle,
						   ForwardIterator last,
                           OutputIterator result) {
  return copy(first, middle, copy(middle, last, result));
}
```

