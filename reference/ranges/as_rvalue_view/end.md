# end
* ranges[meta header]
* std::ranges[meta namespace]
* as_rvalue_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view <V>); // (1) C++23

constexpr auto end() const
  requires range<const V>;     // (2) C++23
```

## 概要

番兵を取得する。


## 戻り値
メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
if constexpr (common_range<V>) {
  return std::move_iterator(ranges::end(base_));
}
else {
  return std::move_sentinel(ranges::end(base_));
}
```
* ranges::end[link /reference/ranges/end.md]


## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<std::string> v = {"one", "two", "three"};
  auto r = std::ranges::as_rvalue_view(v);
  auto it = r.begin();
  auto end = r.end();

  while (it != end) {
    std::string x = *it; // ここでムーブされる
    std::cout << x << std::endl;
    ++it;
  }
}
```
* end[color ff0000]
* begin()[link begin.md]

### 出力
```
one
two
three
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
