# indirectly_comparable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I1, class I2, class R, class P1 = identity, class P2 = identity>
  concept indirectly_comparable =
    indirect_binary_predicate<R, projected<I1, P1>, projected<I2, P2>>;
}
```
* identity[link /reference/functional/identity.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* projected[link /reference/iterator/projected.md]

## 概要

`indirectly_comparable`は、[`indirectly_readable`](indirectly_readable.md)な型`I1, I2`の参照する要素のオブジェクトが`R`の比較関数によって比較可能であることを表すコンセプトである。  
また、その際に任意の射影操作（`P1, P2`）を指定する事ができる。

単純には、型`I1, I2, R, P1, P2`のオブジェクトをそれぞれ`i1, i2, comp, proj1, proj2`とすると`bool c = comp(proj1(*i1), proj2(*i2))`のような比較が可能であることを表している。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <ranges>

// 間接参照可能なIの参照する値と、任意の範囲の全ての値を比較する
template<class I, class Range, class R, class P1 = std::identity, class P2 = std::identity>
  requires std::indirectly_comparable<I, std::ranges::iterator_t<Range>, R, P1, P2>
bool compare_range(I&& lhs, Range&& r, R comp, P1 proj1 = {}, P2 proj2 = {}) {
  for (auto&& rhs : r) {
    if (comp(proj1(*lhs), proj2(rhs)) == false) return false;
  }
  return true;
}

int main() {
  std::cout << std::boolalpha;

  int n = 0;
  std::vector vec = {1, 2, 3, 4};

  std::cout << compare_range(&n, vec, std::less<>{}) << std::endl;
  std::cout << compare_range(&n, vec, std::greater<>{}) << std::endl;

  std::pair<int, double> p = {5, 1.0};
  auto pair_proj = [](const auto& p) -> auto& { return p.first; };

  std::cout << compare_range(&p, vec, std::less<>{}   , pair_proj) << std::endl;
  std::cout << compare_range(&p, vec, std::greater<>{}, pair_proj) << std::endl; 
}
```
* std::indirectly_comparable[color ff0000]
* identity[link /reference/functional/identity.md]
* less[link /reference/functional/less.md]
* greater[link /reference/functional/greater.md]
* iterator_t[link /reference/ranges/iterator_t.md]

### 出力
```
true
false
false
true
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

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
