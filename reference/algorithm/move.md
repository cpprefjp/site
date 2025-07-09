# move
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    move(InputIterator first,
         InputIterator last,
         OutputIterator result);   // (1) C++11

  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    move(InputIterator first,
         InputIterator last,
         OutputIterator result);   // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator1,
            class ForwardIterator2>
  ForwardIterator2
    move(ExecutionPolicy&& exec,
         ForwardIterator1 first,
         ForwardIterator1 last,
         ForwardIterator2 result); // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`の要素を出力イテレータ範囲にムーブする。


## 事前条件
`result` はイテレータ範囲`[first,last)`に含まれてはならない。


## 効果
イテレータ範囲`[first,last)` 内の要素を、それぞれ出力イテレータ範囲`[result,result + (last - first))` へムーブする。

ムーブは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = std::move(*(first + n))` を行う。


## 戻り値
`result + (last - first)`


## 計算量
正確に `last - first` 回ムーブ代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>
#include <memory>

int main() {
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; i++)
    v.emplace_back(new int(i));

  std::vector<std::unique_ptr<int>> v2;
  // v のそれぞれの要素を v2 へムーブする
  std::move(v.begin(), v.end(), std::back_inserter(v2));

  std::for_each(v2.begin(), v2.end(),
    [](const std::unique_ptr<int>& v) { std::cout << *v << std::endl; });
}
```
* std::move[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
0
1
2
3
4
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator move(InputIterator first, InputIterator last, OutputIterator result) {
  while (first != last)
    *result++ = move(*first++);
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
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
