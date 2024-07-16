# size
* ranges[meta header]
* std::ranges[meta namespace]
* as_const_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size() requires sized_range<V>;              // (1)
constexpr auto size() const requires sized_range<const V>;  // (2)
```
* sized_range[link /reference/ranges/sized_range.md]

## 概要

`view`の要素数を取得する。

この関数で得られる`as_const_view`の要素数は、元のRange（`V`）の要素数と一致する。

## 戻り値

入力`view`（`V`）のオブジェクトを`base_`というメンバに保持するとして、(1)(2)どちらも

```cpp
return ranges::size(base_);
```
* size[link /reference/ranges/size.md]

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::as_const_view acv{vec};

  std::cout << acv.size() << '\n';
  std::cout << vec.size() << '\n';
}
```
* size[color ff0000]

### 出力

```
5
5
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
