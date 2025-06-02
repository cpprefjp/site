# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* drop_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
drop_view()
  requires default_initializable<V> = default;          // (1) C++20

constexpr explicit
  drop_view(V base, range_difference_t<V> count);        // (2) C++20
```

## 概要

[`drop_view`](../drop_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewと除去する要素数を指定して構築

## 効果

- (1) : `base_`と`count_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`count_`を`count`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::drop_view view{vec, 5};
  for (const auto& x : view) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}
```
* drop_view[color ff0000]

### 出力
```
6 7 8 9 10 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]