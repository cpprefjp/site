# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* transform_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
transform_view()
  requires default_initializable<V> &&
           default_initializable<F> = default; // (1) C++20

constexpr explicit
  transform_view(V base, F fun);               // (2) C++20
```

## 概要

[`transform_view`](../transform_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewと変換関数を指定して構築


## 効果

- (2) : メンバ変数`base_`を`std::move(base)`で、メンバ変数`fun_`を`std::move(fun)`で初期化する


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::transform_view view{vec, [](int x){ return x * 2; }};
  for (const auto& x : view) {
    std::cout << x << std::endl;
  }
}
```
* transform_view[color ff0000]

### 出力
```
2
4
6
8
10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
