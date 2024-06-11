# begin
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator begin() const;
```
* iterator[link iterator.md]

## 概要
先頭要素を指すイテレータを取得する。

## 効果
```cpp
return iterator{value_};
```
* iterator[link iterator.md]

ただし、`value_`は`iota_view`が内部で保持する先頭の値。

## 例
```cpp example
#include <ranges>
#include <iostream>

int main()
{
  // .begin と .end を暗黙的に使用
  for (int x : std::views::iota(1, 6)) {
    std::cout << x << '\n';
  }
}
```
* std::views::iota[link ../iota_view.md]

### 出力
```
1
2
3
4
5
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
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
