# mergeable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I1, class I2, class Out, class R = ranges::less,
           class P1 = identity, class P2 = identity>
  concept mergeable =
    input_iterator<I1> &&
    input_iterator<I2> &&
    weakly_incrementable<Out> &&
    indirectly_copyable<I1, Out> &&
    indirectly_copyable<I2, Out> &&
    indirect_strict_weak_order<R, projected<I1, P1>, projected<I2, P2>>;
}
```
* less[link /reference/functional/less.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]

## 概要

`mergeable`は、イテレータ型`I1, I2`がそれぞれ参照するソート済みの範囲を、`R`による比較関数によってマージしつつ`Out`の指す出力イテレータ範囲にコピーできる事を表すコンセプトである。  
また、その際にイテレータに対して任意の射影操作（`P1, P2`）を指定する事ができる。

これは、[`merge`](/reference/algorithm/merge.md)のような操作を可能とするための最小の要求である。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>
#include <forward_list>
#include <list>

int main() {
  
  using proj = decltype([](const auto& pair) -> auto& { return std::get<0>(pair); });
  
  std::cout << std::boolalpha;
  
  std::cout << std::mergeable<int*, const int*, int*> << std::endl;
  std::cout << std::mergeable<std::list<int>::iterator, std::vector<int>::iterator, std::forward_list<int>::iterator> << std::endl;
  std::cout << std::mergeable<int*, const int*, int*, std::ranges::greater> << std::endl;
  std::cout << std::mergeable<std::pair<int, double>*, std::tuple<int, double>*, std::vector<std::tuple<int, double>>::iterator, std::ranges::less, proj, proj> << std::endl;
  
  std::cout << "\n";
  std::cout << std::mergeable<int*, const int*, const int*> << std::endl;
  std::cout << std::mergeable<int*, const int*, std::istream_iterator<int>> << std::endl;
  std::cout << std::mergeable<int*, std::ostream_iterator<int>, int*> << std::endl;
}
```
* std::mergeable[color ff0000]

### 出力
```
true
true
true
true

false
false
false
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
- [`merge`](/reference/algorithm/merge.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
