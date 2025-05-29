# end
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr iterator end() const
  requires (!same_as<Bound, unreachable_sentinel_t>); // (1) C++23
```

## 概要

番兵を取得する。


## 戻り値
以下と等価：

```cpp
return iterator(addressof(*value_), bound_);
```

## 例

```cpp example
#include <ranges>
#include <iostream>

int main() {
  auto r = std::views::repeat(42, 3);
  auto it = r.begin();
  auto last = r.end();

  for (; it != last; ++it) {
    std::cout << *it << ' ';
  }
}
```
* end[color ff0000]
* begin()[link begin.md]

### 出力

```
42 42 42 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
