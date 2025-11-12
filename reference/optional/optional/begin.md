# begin
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr iterator begin() noexcept; // (1)
constexpr const_iterator begin() const noexcept; // (2)
```

## 概要
`optional`をrangeとした時の先頭要素を指すイテレータを取得する。


## 効果
[`has_value()`](has_value.md) `== true`なら、保持している有効値を指すイテレータを返す。またこの時、[`distance`](/reference/iterator/distance.md)`(begin(),` [`end()`](end.md)`)` `== 1` となる。

[`has_value()`](has_value.md) `!= true`なら、末尾要素の次を指すイテレータを返す。この時、`begin() ==` [`end()`](end.md) である。


## 例
```cpp example
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p1 = 1;
  for (auto i = p1.begin(); i != p1.end(); ++i) {
    std::cout << *i; // １度通る
  }

  std::optional<int> p2 = std::null_opt;
  for (auto i = p2.begin(); i != p2.end(); ++i) {
    std::cout << *i; // １度も通らない
  }
}
```
* begin()[color ff0000]
* end()[link end.md]

### 出力
```
1
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3168R2 Give std::optional Range Support](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3168r2.html)
