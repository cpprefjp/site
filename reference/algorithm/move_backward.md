#move_backward (C++11)
```cpp
namespace std {
  template <class BidirectionalIterator1, class BidirectionalIterator2>
  BidirectionalIterator2 move_backward(BidirectionalIterator1 first,
                                       BidirectionalIterator1 last,
                                       BidirectionalIterator2 result);
}
```

##概要
指定された範囲の要素を後ろからムーブする。


##要件
`result` は `(first,last]` の範囲に含まれてはならない。


##効果
`[first,last)` 内にある要素を、それぞれ `[result - (last-first),result)` へムーブする。

ムーブは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = std::move(*(last - n))` を行う。


##戻り値
`result - (last - first)`


##計算量
正確に `last - first` 回ムーブ代入が行われる。


##備考
`last` が `[result - (last-first),result)` の範囲内にあるときには、[`move()`](/reference/algorithm/move) の代わりに `move_backward()` を使うべきである。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <memory>

void print(const std::unique_ptr<int>& v) {
  if (v) std::cout << *v       << std::endl;
  else   std::cout << "(null)" << std::endl;
}
 
int main() {
  std::vector<std::unique_ptr<int>> v;

  for (int i = 0; i < 5; i++)
    v.emplace_back(new int(i));

  // 1,2,3 の範囲を、3,4,5 の値のある範囲へムーブする
  std::move_backward(v.begin(), v.begin() + 3, v.end());

  // 以下のコードだと期待した結果にならないことを確認しよう
  // std::move(v.begin(), v.begin() + 3, v.begin() + 2);
  std::for_each(v.begin(), v.end(), &print);
}
```
* move_backward[color ff0000]


###出力
```
(null)
(null)
0
1
2
```


##実装例
```cpp
template<class BidirectionalIterator1, class BidirectionalIterator2>
BidirectionalIterator2 move_backward(BidirectionalIterator1 first, BidirectionalIterator1 last,
                                     BidirectionalIterator2 result) {
  while (first != last)
    *--result = move(*--last);
  return result;
}
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
