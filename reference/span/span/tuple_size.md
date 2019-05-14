# tuple_size
* span[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  template <class ElementType, std::size_t Extent>
  struct tuple_size<span<ElementType, Extent>>
    : integral_constant<std::size_t, Extent> {};

  template <class ElementType>
  struct tuple_size<span<ElementType, dynamic_extent>>; // 宣言のみで定義なし
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]
* dynamic_extent[link /reference/span/dynamic_extent.md.nolink]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。

`<span>`ヘッダでは、静的な要素数をもつ[`std::span`](/reference/span/span.md)クラスに関する特殊化を定義する。

動的な要素数を表す[`std::dynamic_extent`](/reference/span/dynamic_extent.md.nolink)をもつ[`std::span`](/reference/span/span.md)型は、タプルとしては扱えない。


## 例
```cpp example
#include <span>

int main()
{
  static_assert(std::tuple_size<std::span<int, 3>>::value == 3);
}
```
* std::tuple_size[color ff0000]


### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
