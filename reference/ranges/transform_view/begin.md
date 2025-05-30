# begin
* ranges[meta header]
* std::ranges[meta namespace]
* transform_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator<false> begin();       // (1) C++20

constexpr iterator<true> begin() const
  requires range<const V> &&
           regular_invocable<
             const F&,
             range_reference_t<const V>
           >;                            // (2) C++20
```

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 戻り値
- (1) : 以下と等価：
    ```cpp
    return iterator<false>{*this, ranges::begin(base_)};
    ```

- (2) : 以下と等価：
    ```cpp
    return iterator<true>{*this, ranges::begin(base_)};
    ```


## 例

```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::transform_view r{vec, [](int i) { return std::to_string(i); }};

  auto it = r.begin();

  std::string x = *it;
  std::cout << x << '\n';
}
```
* begin[color ff0000]

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
