# begin
* ranges[meta header]
* std::ranges[meta namespace]
* drop_while_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto begin() const
  requires range<const V> &&
           indirect_unary_predicate<
             const Pred,
             iterator_t<const V>
           >;                        // (2) C++20
```

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 戻り値
先頭から条件を満たさない最初の要素を指すイテレータを返す。

- (1), (2) : 実装時にキャッシュした結果を返すか、以下と等価：
    ```cpp
    return ranges::find_if_not(ranges::begin(base_), ranges::end(base_), pred_);
    ```

ただし、`base_`は元の`view`を表すメンバ変数、`pred_`は述語を表すメンバ変数。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::drop_while_view r{vec, [](int x) { return x < 6; }};

  auto it = r.begin();

  int x = *it;
  std::cout << x << '\n';
}
```
* begin[color ff0000]

### 出力

```
6
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
