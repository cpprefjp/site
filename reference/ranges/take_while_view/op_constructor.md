# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* take_while_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
take_while_view()
  requires default_initializable<V> &&
           default_initializable<Pred> = default; // (1) C++20

constexpr explicit
  take_while_view(V base, Pred pred);             // (2) C++20
```

## 概要

[`take_while_view`](../take_while_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewと述語を指定して構築

## 効果

- (1) : `base_`と`pred_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`pred_`を`std::move(pred)`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::take_while_view view{vec, [](int x) { return x < 6; }};
  for (const auto& x : view) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}
```
* take_while_view[color ff0000]

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