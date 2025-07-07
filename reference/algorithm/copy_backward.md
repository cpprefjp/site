# copy_backward
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator1, class BidirectionalIterator2>
  BidirectionalIterator2
    copy_backward(BidirectionalIterator1 first,
                  BidirectionalIterator1 last,
                  BidirectionalIterator2 result); // C++03

  template <class BidirectionalIterator1, class BidirectionalIterator2>
  constexpr BidirectionalIterator2
    copy_backward(BidirectionalIterator1 first,
                  BidirectionalIterator1 last,
                  BidirectionalIterator2 result); // C++20
}
```

## 概要
指定されたイテレータ範囲`[first, last)`の要素を、出力イテレータ範囲に後ろからコピーする。


## 要件
`result` はイテレータ範囲 `(first,last]` に含まれてはならない。


## 効果
`[first,last)` 内にある要素を、それぞれ `[result - (last-first),result)` へコピーする。

コピーは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = *(last - n)` を行う。


## 戻り値
`result - (last - first)`


## 計算量
正確に `last - first` 回代入が行われる。


## 備考
`last` がイテレータ範囲 `[result - (last-first), result)` に含まれる場合には、`copy()` の代わりに `copy_backward()` を使うべきである。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <list>
#include <iterator>

int main() {
  std::list<int> ls = { 1,2,3,4,5 };
  // 1,2,3 の範囲を、3,4,5 の値のある範囲へコピーする
  std::copy_backward(ls.begin(), std::next(ls.begin(), 3), ls.end());

  // 以下のコードだと期待した結果にならないことを確認しよう
  // std::copy(ls.begin(), std::next(ls.begin(), 3), std::next(ls.begin(), 2));

  std::copy(ls.begin(), ls.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* std::copy_backward[color ff0000]
* ls.begin()[link /reference/list/list/begin.md]
* ls.end()[link /reference/list/list/end.md]

### 出力
```
1,2,1,2,3,
```


## 実装例
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

## バージョン
### 言語

### 処理系
- [Clang](/implementation.md#clang): 14.0.6 [mark verified]
- [GCC](/implementation.md#gcc): 9.5.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
