# end
* ranges[meta header]
* std::ranges[meta namespace]
* transform_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr sentinel<false> end();      // (1) C++20

constexpr iterator<false> end()       // (2) C++20
  requires common_range<V>;

constexpr sentinel<true> end() const
  requires range<const V> &&
  regular_invocable<
    const F&,
    range_reference_t<const V>
  >;                                   // (3) C++20

constexpr iterator<true> end() const
  requires common_range<const V> &&
    regular_invocable<
      const F&,
      range_reference_t<const V>
    >;                                 // (4) C++20
```

## 概要
番兵を取得する。

## 戻り値
- (1) : 以下と等価：
    ```cpp
    return sentinel<false>{ranges::end(base_)};
    ```

- (2) : 以下と等価：
    ```cpp
    return iterator<false>{*this, ranges::end(base_)};
    ```

- (3) : 以下と等価：
    ```cpp
    return sentinel<true>{ranges::end(base_)};
    ```

- (4) : 以下と等価：
    ```cpp
    return iterator<true>{*this, ranges::end(base_)};
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
  auto end_it = r.end();
  while (it != end_it) {
    std::string x = *it;
    std::cout << x << std::endl;
    ++it;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
1
2
3
4
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
