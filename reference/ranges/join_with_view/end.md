# end
* ranges[meta header]
* std::ranges[meta namespace]
* join_with_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);       // (1) C++23

constexpr auto end() const
  requires range<const V> &&
           input_range<range_reference_t<const V>> &&
           range<const Pattern>;     // (2) C++23
```

## 概要
番兵を取得する。

## 戻り値
- (1), (2) : `join_with_view`の番兵を返す

## 例

```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};
  std::string delimiter = "-";

  std::ranges::join_with_view r{words, delimiter};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    char x = *it;
    std::cout << x;
    ++it;
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
hello-world-join
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
