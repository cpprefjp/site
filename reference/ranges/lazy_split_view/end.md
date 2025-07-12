# end
* ranges[meta header]
* std::ranges[meta namespace]
* lazy_split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto end() const
  requires range<const V> &&
           forward_range<const Pattern>;  // (2) C++20
```

## 概要
番兵を取得する。

## 戻り値
- (1), (2) : `lazy_split_view`の番兵を返す

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9};
  std::vector<int> pattern = {4, 5};

  std::ranges::lazy_split_view r{v, pattern};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    auto subrange = *it;
    for (int n : subrange) {
      std::cout << n;
    }
    std::cout << '\n';
    ++it;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
123
6789
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
