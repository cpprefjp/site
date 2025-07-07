# end
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end() {
  if constexpr (common_range<V>)
    return iterator{*this, ranges::end(base_)};
  else
    return sentinel{*this};
}
```
* iterator[link iterator.md]
* sentinel[link sentinel.md]

## 概要

番兵を取得する。

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
