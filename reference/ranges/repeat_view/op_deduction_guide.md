# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class T, class Bound = unreachable_sentinel_t>
  repeat_view(T, Bound = Bound()) -> repeat_view<T, Bound>;
}
```

## 概要

[`repeat_view`](../repeat_view.md)クラステンプレートの型推論補助。


## 例
```cpp example
#include <iostream>
#include <ranges>

int main() {
  auto r = std::ranges::repeat_view(42, 3);
  for (int x : r) {
    std::cout << x << std::endl;
  }
}

```

### 出力
```
42
42
42
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
