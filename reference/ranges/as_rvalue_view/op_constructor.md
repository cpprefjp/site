# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* as_rvalue_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
as_rvalue_view()
  requires default_initializable<V> = default; // (1) C++23

constexpr explicit
  as_rvalue_view(V base);                      // (2) C++23
```

## 概要
[`as_rvalue_view`](../as_rvalue_view.md)オブジェクトを構築する。

- (1) : `base`をムーブして`*this`に保持する


## 効果
- (1) : メンバ変数`base_`を[`std::move`](/reference/utility/move.md)`(base)`で初期化する


## 備考
- ここで、`V`は[`std::ranges::ref_view`](../ref_view.md)であり、元となるRangeは`view`に変換されて保持される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::ranges::for_each(
    std::views::as_rvalue(v),
    [](int x) { std::cout << x << ' '; }
  );
}
```
* std::ranges::for_each[link /reference/algorithm/ranges_for_each.md]

### 出力
```
1 2 3 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
