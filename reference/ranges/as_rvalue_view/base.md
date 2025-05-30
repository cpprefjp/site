# base
* ranges[meta header]
* std::ranges[meta namespace]
* as_rvalue_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>; // (1) C++23

constexpr V base() &&;            // (2) C++23
```

## 概要
元となるRangeを取得する。

- (1) : 元となるRangeをコピーして返す
- (2) : 元となるRangeをムーブして返す


## 戻り値

メンバ変数`base_`として保持している、元となるRangeオブジェクトがあるとして、以下を返す：

- (1) :
    ```cpp
    return base_;
    ```

- (2) :
    ```cpp
    return std::move(base_);
    ```
    * std::move[link /reference/utility/move.md]


## 備考
- ここで、`V`は[`std::ranges::ref_view`](../ref_view.md)であり、元となるRangeは`view`に変換されている。


## 例
```cpp
#include <cassert>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::views::as_rvalue(v);
  std::ranges::ref_view<std::vector<int>> base = r.base();

  assert(&base.base() == &v);
}
```
* r.base()[color ff0000]
* std::ranges::ref_view[link /reference/ranges/ref_view.md]
* base.base()[link /reference/ranges/ref_view/base.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
