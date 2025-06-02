# end
* ranges[meta header]
* std::ranges[meta namespace]
* join_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto end() const
  requires range<const V> &&
           input_range<range_reference_t<const V>>;  // (2) C++20
```

## 概要
番兵を取得する。

## 戻り値
- (1), (2) : `join_view`の番兵を返す

## 例

```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};

  std::ranges::join_view r{words};

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
helloworldjoin
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]