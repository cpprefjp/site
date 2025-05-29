# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  single_view(T) -> single_view<T>;
}
```
* single_view[link ../single_view.md]

## 概要

[`single_view`](../single_view.md)クラステンプレートの型推論補助。


## 例
```cpp example
#include <iostream>
#include <ranges>

int main() {
  auto r = std::ranges::single_view(1);
  for (int x : r) {
    std::cout << x << std::endl;
  }
}

```

### 出力
```
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
