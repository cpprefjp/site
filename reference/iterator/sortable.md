# sortable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I, class R = ranges::less, class P = identity>
  concept sortable =
    permutable<I> &&
    indirect_strict_weak_order<R, projected<I, P>>;
}
```
* less[link /reference/functional/less.md]
* permutable[link /reference/iterator/permutable.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]

## 概要

`sortable`は、イテレータ型`I`の参照する範囲を`R`による比較関数によってソートできる事を表すコンセプトである。  
また、その際にイテレータに対して任意の射影操作（`P`）を指定する事ができる。

これは、[`sort`](/reference/algorithm/sort.md)のような操作を可能とするための最小の要求である。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>

template<std::bidirectional_iterator I, std::sentinel_for<I> S, typename R = std::ranges::less, typename P = std::identity>
  requires std::sortable<I, R, P> // ソートに必要な操作を制約する
void bubble_sort(I it, S end, R comp = {}, P proj = {}) {
  if (it == end) return;

  int count{};

  for (auto loopend = std::ranges::prev(end, 1); it != loopend; std::ranges::advance(loopend, -count)) {
  	count = 0;
  	for (auto current = it; current != loopend; ++current) {
      if (auto next = std::ranges::next(current); comp(proj(*current), proj(*next))) {
        //                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
        //                                        ↑これと
        ++count;
      } else {
        std::iter_swap(current, next);  // これ
        count = 0;
      }
  	}
  	if (count == 0) ++count;
  }
}

int main() {
  
  std::vector<int> vec = {9, 5, 1, 2, 4, 6, 3, 0, 8, 7};
  bubble_sort(vec.begin(), vec.end());
  
  for (auto n : vec) {
    std::cout << n;
  }
}
```
* std::sortable[color ff0000]

### 出力
```
0123456789
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`sort`](/reference/algorithm/sort.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
