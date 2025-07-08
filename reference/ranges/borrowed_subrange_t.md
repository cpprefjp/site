# borrowed_subrange_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using borrowed_subrange_t = conditional_t<borrowed_range<R>, subrange<iterator_t<R>>, dangling>;
}
```
* conditional_t[link /reference/type_traits/conditional.md]
* dangling[link dangling.md]

## 概要

任意のRange型`R`の部分Rangeの型を取得する。ただし、`R`が[`borrowed_range`](borrowed_range.md)ではない場合、[`dangling`](dangling.md)になる。


## 例
```cpp example
#include <ranges>
#include <vector>

using namespace std;

template<ranges::range R>
ranges::borrowed_subrange_t<R> my_all(R&& r) {
  auto i = ranges::begin(r);
  auto e = ranges::end(r);
  return {i, e};
}

vector<int> f(){ return {}; }

int main() {
  // borrowed_rangeではないRangeのrvalueが渡された場合、danglingが返る
  auto result1 = my_all(f());
  static_assert(same_as<decltype(result1), ranges::dangling>);

  // lvalueが渡された場合、danglingにはならない
  auto vec = f();
  auto result2 = my_all(vec);
  static_assert(!same_as<decltype(result2), ranges::dangling>);

  // borrowed_rangeのrvalueが渡された場合、danglingにはならない
  auto result3 = my_all(ranges::subrange{vec});
  static_assert(!same_as<decltype(result3), ranges::dangling>);
}
```
* ranges::borrowed_subrange_t[color ff0000]
* ranges::range[link range.md]
* ranges::dangling[link dangling.md]
* ranges::subrange[link subrange.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
