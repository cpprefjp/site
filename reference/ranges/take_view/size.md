# size
* ranges[meta header]
* std::ranges[meta namespace]
* take_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++20

constexpr auto size() const
  requires sized_range<const V>; // (2) C++20
```

## 概要
要素数を取得する。

## 効果
入力`view`（`V`）のオブジェクトを`base_`、取得する要素数を`count_`というメンバに保持するとして、以下と等価：

```cpp
auto n = ranges::size(base_);
return min<D>(n, static_cast<D>(count_));
```
* min[link /reference/algorithm/min.md]

ここで、`D`は`decltype(n)`。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  std::ranges::take_view r{vec, 5};

  std::size_t n = r.size();
  std::cout << n << std::endl;
}
```
* size[color ff0000]

### 出力
```
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]