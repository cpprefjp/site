# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* as_rvalue_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <class R>
  as_rvalue_view(R&&) -> as_rvalue_view<views::all_t<R>>;
}
```

## 概要

[`as_rvalue_view`](../as_rvalue_view.md)クラステンプレートの型推論補助。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::as_rvalue_view(v);
  for (int x : r) {
    std::cout << x << std::endl;
  }
}
```

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
