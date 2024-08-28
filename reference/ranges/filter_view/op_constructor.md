# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
filter_view() requires default_initializable<V> && default_initializable<Pred> = default;    // (1)

constexpr explicit filter_view(V base, Pred pred);                                           // (2)
```

## 概要

[`filter_view`](../filter_view.md)オブジェクトを構築する。

## 効果

- (1) : `base_`、`pred_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`pred_`を`std::move(pred)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  using std::ranges::filter_view;

  std::vector<int> vec = {1, 2, 3, 4, 5};

  // (1) デフォルト構築
  filter_view<std::views::all_t<std::vector<int>>, bool(*)(int)> v1{};
  
  // (2) viewを入力して構築
  filter_view v2{vec, [](int x){ return x % 2 == 0; }};
}
```
* filter_view[color ff0000]

### 出力
```
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
