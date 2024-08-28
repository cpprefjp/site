# begin
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator begin();
```
* iterator[link iterator.md]

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 事前条件

`pred_.`[`has_value`](/reference/optional/optional/has_value.md)`()`が`true`であること。

## 戻り値

`{*this, `[`ranges​::​find_if`](/reference/algorithm/ranges_find_if.md)`(base_, `[`ref`](/reference/functional/ref.md)`(*pred_))}`

[`range`](../range.md)のモデルとなるためにはこの関数が償却定数時間で実行できなければならないため、値はキャッシュされる。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::filter_view fv{vec, [](int i) { return i % 2 == 0; }};

  auto it = fv.begin();

  std::cout << *it << '\n';
}
```
* begin[color ff0000]
* filter_view[link ../filter_view.md]

### 出力

```
2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
