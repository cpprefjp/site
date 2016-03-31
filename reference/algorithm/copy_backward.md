#copy_backward
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator1, class BidirectionalIterator2>
  BidirectionalIterator2 copy_backward(BidirectionalIterator1 first,
                                       BidirectionalIterator1 last,
                                       BidirectionalIterator2 result);

}
```

##概要
指定された範囲の要素を後ろからコピーする。


##要件
`result` は `(first,last]` の範囲に含まれてはならない。


##効果
`[first,last)` 内にある要素を、それぞれ `[result - (last-first),result)` へコピーする。

コピーは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = *(last - n)` を行う。


##戻り値
`result - (last - first)`


##計算量
正確に `last - first` 回代入が行われる。


##備考
`last` が `[result - (last-first), result)` の範囲内にあるときには、`copy()` の代わりに `copy_backward()` を使うべきである。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <list>
#include <iterator>
 
int main() {
  std::list<int> list = { 1,2,3,4,5 };
  // 1,2,3 の範囲を、3,4,5 の値のある範囲へコピーする
  std::copy_backward(list.begin(), std::next(list.begin(), 3), list.end());

  // 以下のコードだと期待した結果にならないことを確認しよう
  // std::copy(list.begin(), std::next(list.begin(), 3), std::next(list.begin(), 2));

  std::copy(list.begin(), list.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* copy_backward[color ff0000]
* std::list[link /reference/list.md]
* list.begin()[link /reference/list/begin.md]
* std::next[link /reference/iterator/next.md]
* list.end()[link /reference/list/end.md]
* std::copy[link copy.md]
* std::ostream_iterator[link /reference/iterator/ostream_iterator.md]
* std::cout[link /reference/iostream/cout.md]

###出力
```
1,2,1,2,3,
```


##実装例
```cpp
template <class BidirectionalIterator1, class BidirectionalIterator2>
BidirectionalIterator2 copy_backward(BidirectionalIterator1 first,
                                     BidirectionalIterator1 last,
                                     BidirectionalIterator2 result) {
  while (first != last)
    *--result = *--last;
  return result;
}
```


