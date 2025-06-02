# end
* ranges[meta header]
* std::ranges[meta namespace]
* split_view[meta class]
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
- (1), (2) : `split_view`の番兵を返す

## 例

```cpp example
#include <ranges>
#include <string_view>
#include <iostream>

int main() {
  using namespace std::literals;
  
  std::string_view text = "hello,world,split";
  std::string_view delimiter = ",";

  std::ranges::split_view r{text, delimiter};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    auto subrange = *it;
    std::string_view sv{subrange.begin(), subrange.end()};
    std::cout << sv << '\n';
    ++it;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
hello
world
split
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]