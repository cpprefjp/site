# counted
* ranges[meta header]
* std::ranges::views[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges::views {
  inline constexpr /*unspecified*/ counted = /*unspecified*/;
}
```

## 概要
イテレータ`i`と数`n`に対して、範囲`[i, i + n)`をRangeとして扱う[`view`](view.md)を生成するカスタマイゼーションポイントオブジェクト。実際に生成するのは[`subrange`](subrange.md)か[`span`](/reference/span/span.md)である。

`counted`は、手元にイテレータだけがあるとき、そこから指定個数までの範囲をRangeとして扱うために使用できる。これは、ポインタと個数で定まる範囲を[`contiguous_range`](contiguous_range.md)として扱う[`span`](/reference/span/span.md)を、一般のイテレータに拡張したものである。

`counted`はRangeアダプタオブジェクトではないので、パイプライン記法は使用できない。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ○    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ イテレータに従う

## 効果

式`E`をイテレータ、式`F`を進める数、イテレータ型`T`を[`decay_t`](/reference/type_traits/decay.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>`、イテレータの差の型`D`を[`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<T>`とする。式`views::counted(E, F)`の効果は以下の通り。

- [`decltype`](/lang/cpp11/decltype.md)`((F))`が[`convertible_to`](/reference/concepts/convertible_to.md)`<D>`のモデルでなければ、呼び出しは不適格。
- `T`が[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)のモデルであれば、[`span`](/reference/span/span.md)`(`[`to_address`](/reference/memory/to_address.md)`(E), static_cast<D>(F))`と等しい。
- `T`が[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルであれば、[`subrange`](subrange.md)`(E, E + static_cast<D>(F))`と等しい。
- それ以外のとき、[`subrange`](subrange.md)`(`[`counted_iterator`](/reference/iterator/counted_iterator.md)`(E, F),` [`default_sentinel`](/reference/iterator/default_sentinel_t.md)`)`と等しい。

## 例
```cpp example
#include <ranges>
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  using namespace std;
  vector<int> v;
  

  for (int i = 0; auto& elem : views::counted(back_inserter(v), 5)) {
    elem = i++;
  }

  for(int elem : v) {
    cout << elem;
  }
}
```
* views::counted[color ff0000]
* back_inserter[link /reference/iterator/back_inserter.md]

### 出力
```
01234
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
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
