# end
* ranges[meta header]
* std::ranges[meta namespace]
* take_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto end() const
  requires range<const V>;          // (2) C++20
```

## 概要
番兵を取得する。

## 戻り値
入力が[`sized_range`](../sized_range.md)かつ[`random_access_range`](../random_access_range.md)の場合：
- (1), (2) : 以下と等価：
    ```cpp
    return ranges::begin(base_) + min<D>(ranges::size(base_), count_);
    ```
    ここで、`D`は[`range_difference_t`](../range_difference_t.md)`<V>`。

それ以外の場合：
- (1), (2) : 以下と等価：
    ```cpp
    return counted_iterator{ranges::begin(base_), count_};
    ```

ただし、`base_`は元の`view`を表すメンバ変数、`count_`は取得する要素数を表すメンバ変数。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::take_view r{vec, 5};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    int x = *it;
    std::cout << x << " ";
    ++it;
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
1 2 3 4 5 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
