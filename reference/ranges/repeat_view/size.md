# size
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size() const
  requires (!same_as<Bound, unreachable_sentinel_t>); // (1) C++23
```

## 概要
要素数を取得する。

## 戻り値

以下と等価：

```cpp
return to-unsigned-like(bound_);
```

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  auto r = std::views::repeat(42, 3);
  std::cout << r.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
