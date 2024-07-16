# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* as_const_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
as_const_view() requires default_initializable<V> = default;    // (1)

constexpr explicit as_const_view(V base);                       // (2)
```
* default_initializable[link /reference/concepts/default_initializable.md]

## 概要

`as_const_view`オブジェクトを構築する。

## 効果

入力`view`（`V`）のオブジェクトを`base_`というメンバに保持するとして

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  using std::ranges::as_const_view;

  std::vector<int> vec = {1, 2, 3, 4, 5};

  // (1) デフォルト構築
  as_const_view<std::views::all_t<std::vector<int>>> v1{};
  
  // (2) viewを入力して構築
  as_const_view v2{vec};
}
```
* as_const_view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
