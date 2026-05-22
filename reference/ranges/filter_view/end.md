# end
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end() {                            // (1) C++20
  if constexpr (common_range<V>)
    return iterator{*this, ranges::end(base_)};
  else
    return sentinel{*this};
}

constexpr auto end() {                            // (1) C++26
  if constexpr (common_range<V>)
    return iterator<false>{*this, ranges::end(base_)};
  else
    return sentinel<false>{*this};
}

constexpr sentinel<true> end() const
  requires (input_range<const V> && !forward_range<const V> &&
            indirect_unary_predicate<const Pred, iterator_t<const V>>); // (2) C++26
```
* iterator[link iterator.md]
* sentinel[link sentinel.md]
* input_range[link /reference/ranges/input_range.md]
* forward_range[link /reference/ranges/forward_range.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]

## 概要

番兵を取得する。

- (1) : 非`const`版
- (2) : `const`版。元のRangeが[`input_range`](/reference/ranges/input_range.md)であり、かつ[`forward_range`](/reference/ranges/forward_range.md)ではない場合に限り提供される

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::filter_view fv{vec, [](int i) { return i % 2 == 0; }};

  auto e = fv.end();

  --e;

  std::cout << *e << '\n';
}
```
* end[color ff0000]
* filter_view[link ../filter_view.md]

### 出力

```
4
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
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
- [P3725R3 Filter View Extensions for Safer Use](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3725r3.pdf)
    - C++26で、(2)の`const`版オーバーロードを追加 (入力Rangeの場合の`const`イテレーションをサポート)
