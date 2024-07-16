# borrowed_iterator_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using borrowed_iterator_t = conditional_t<borrowed_range<R>, iterator_t<R>, dangling>;
}
```
* range[link range.md]
* conditional_t[link /reference/type_traits/conditional.md]
* borrowed_range[link borrowed_range.md]
* iterator_t[link iterator_t.md]
* dangling[link dangling.md]

## 概要
任意のRange型`R`のイテレータの型を取得する。ただし、`R`が[`borrowed_range`](borrowed_range.md)ではない場合、[`dangling`](dangling.md)になる。

イテレータを返す関数では、これを戻り値型に使うことでダングリングイテレータになる場合に自動的に[`dangling`](dangling.md)を返すことができる。

## 例
```cpp example
#include <ranges>
#include <vector>

using namespace std;

template<ranges::range R>
ranges::borrowed_iterator_t<R> my_find(R&& r, const ranges::range_value_t<R>& v) {
  auto i = ranges::begin(r);
  auto e = ranges::end(r);
  while(i != e) {
    if(*i == v) return i;
    ++i;
  }
  return e;
}

vector<int> f(){ return {}; }

int main() {
  // borrowed_rangeではないRangeのrvalueが渡された場合、danglingが返る
  auto result1 = my_find(f(), 42);
  static_assert(same_as<decltype(result1), ranges::dangling>);

  // lvalueが渡された場合、danglingにはならない
  auto vec = f();
  auto result2 = my_find(vec, 42);
  static_assert(same_as<decltype(result2), vector<int>::iterator>);

  // borrowed_rangeのrvalueが渡された場合、danglingにはならない
  auto result3 = my_find(ranges::subrange{vec}, 42);
  static_assert(same_as<decltype(result3), vector<int>::iterator>);
}
```
* ranges::borrowed_iterator_t[color ff0000]
* ranges::range[link range.md]
* ranges::begin[link begin.md]
* ranges::end[link end.md]
* ranges::range_value_t[link range_value_t.md]
* ranges::dangling[link dangling.md]
* ranges::subrange[link subrange.md]
* borrowed_range[link borrowed_range.md]

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
