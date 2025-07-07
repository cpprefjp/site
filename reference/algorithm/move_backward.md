# move_backward
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator1, class BidirectionalIterator2>
  BidirectionalIterator2
    move_backward(BidirectionalIterator1 first,
                  BidirectionalIterator1 last,
                  BidirectionalIterator2 result); // C++11

  template <class BidirectionalIterator1, class BidirectionalIterator2>
  constexpr BidirectionalIterator2
    move_backward(BidirectionalIterator1 first,
                  BidirectionalIterator1 last,
                  BidirectionalIterator2 result); // C++20
}
```

## 概要
イテレータ範囲`[first, last)`の要素を出力イテレータ範囲に後ろからムーブする。


## 事前条件
- `result` はイテレータ範囲`(first,last]` に含まれてはならない


## 効果
イテレータ範囲`[first,last)` 内にある要素を、それぞれ出力イテレータ範囲`[result - (last-first),result)` へムーブする。

ムーブは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = std::move(*(last - n))` を行う。


## 戻り値
`result - (last - first)`


## 計算量
正確に `last - first` 回ムーブ代入が行われる。


## 備考
`last` が `[result - (last-first),result)` の範囲内にあるときには、[`move()`](move.md) の代わりに `move_backward()` を使うべきである。


## 例
```cpp example
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

  // 0,1,2 の値がある範囲を、2,3,4 の値がある範囲へムーブする
  std::move_backward(v.begin(), v.begin() + 3, v.end());

  // 以下のコードだと期待した結果にならないことを確認しよう。
  // 移動元の後方と移動先の前方でイテレータ範囲が重なっている場合は、move_backwardを使わないといけない
  // std::move(v.begin(), v.begin() + 3, v.begin() + 2);

  std::for_each(v.begin(), v.end(), &print);
}
```
* std::move_backward[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::move[link move.md]

### 出力
```
(null)
(null)
0
1
2
```


## 実装例
```cpp
template<class BidirectionalIterator1, class BidirectionalIterator2>
BidirectionalIterator2 move_backward(BidirectionalIterator1 first, BidirectionalIterator1 last,
                                     BidirectionalIterator2 result) {
  while (first != last)
    *--result = move(*--last);
  return result;
}
```
* move[link /reference/utility/move.md]


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 関連項目
- [C++11 右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md)


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
