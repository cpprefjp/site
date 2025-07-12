# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* take_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
take_view()
  requires default_initializable<V> = default;          // (1) C++20

constexpr explicit
  take_view(V base, range_difference_t<V> count);        // (2) C++20
```

## 概要

[`take_view`](../take_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewと取得する要素数を指定して構築

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

  std::ranges::take_view view{vec, 5};
  for (const auto& x : view) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}
```
* take_view[color ff0000]

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

## 参照
- [N4861 24.7.10 Take view](https://timsong-cpp.github.io/cppwp/n4861/range.take)
- [N4950 26.7.14 Take view](https://timsong-cpp.github.io/cppwp/n4950/range.take)
