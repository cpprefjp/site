# begin
* ranges[meta header]
* std::ranges[meta namespace]
* as_const_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin() requires (!simple-view<V>);      // (1)
constexpr auto begin() const requires range<const V>;   // (2)
```
* simple-view[link /reference/ranges/simple-view.md]
* range[link /reference/ranges/range.md]

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 戻り値

入力`view`（`V`）のオブジェクトを`base_`というメンバに保持するとして、(1), (2)どちらも

```cpp
return ranges::cbegin(base_);
```
* cbegin[link /reference/ranges/cbegin.md]

`as_const_view`を`views::as_const`から生成している場合、ここで得られるイテレータは常に[`basic_const_iterator`](/reference/iterator/basic_const_iterator.md)の特殊化となる。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::as_const_view acv{vec};

  auto it = acv.begin();

  std::cout << *it << '\n';

  ++it;
  std::cout << *it << '\n';

  // 書き換え不可
  //*it = 0;
}
```
* begin[color ff0000]

### 出力

```
1
2
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
