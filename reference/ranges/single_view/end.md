# end
* ranges[meta header]
* std::ranges[meta namespace]
* single_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr T* end() noexcept;             // (1) C++20
constexpr const T* end() const noexcept; // (2) C++20
```

## 概要

番兵を取得する。

## 戻り値
以下と等価：

```cpp
return data() + 1;
```
* data()[link data.md]


## 例

```cpp example
#include <iostream>
#include <ranges>

int main() {
  auto r = std::views::single(1);
  int* it = r.begin();
  int* last = r.end();

  for (; it != last; ++it) {
    std::cout << *it << std::endl;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

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
