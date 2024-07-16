# enable_view
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  inline constexpr bool enable_view = derived_from<T, view_base> || is-derived-from-view-interface<T>;
}
```
* derived_from[link /reference/concepts/derived_from.md]
* view_base[link view_base.md]

## 概要

`enable_view<T>`が`true`であることは、`T`が[`view`](view.md)であるための必要条件である。

[`view`](view.md)コンセプトの要件は意味論要件がメインなため、[`view_base`](view_base.md)を基底クラスにするか、`enable_view`を特殊化することで、明示的に`view`であることを示すようになっている。

## *is-derived-from-view-interface*

`is-derived-from-view-interface<T>`は説明専用の`bool`型の変数テンプレートである。

```cpp
namespace std::ranges {
  template<class T>
  inline constexpr bool is-derived-from-view-interface = see below; // 説明専用
}
```
* see below[italic]

`is-derived-from-view-interface<T>`は、`T`がある型`U`についてただ一つだけ`view_interface<U>`を`public`な基底クラスに持ち、他の型`V`についての`view_interface<V>`を基底クラスに持たない場合に`true`となる。

多くの場合`U = T`であり、その場合`T`は`view_interface<T>`を`public`で1つだけ継承していればこれを満たすことができる。継承関係が複雑な型などで、`view_interface`を複数継承階層の中に持っているとこれを満たすことができなくなる。

## 例

```cpp example
#include <ranges>

int main()
{
  using namespace std::ranges;
  static_assert(enable_view<view_base>);
  static_assert(!enable_view<int>);
    
  struct t : view_base { };
    
  static_assert(enable_view<t>);
}
```
* enable_view[color ff0000]
* view_base[link view_base.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [LWG Issue 3549. `view_interface` is overspecified to derive from `view_base`](https://cplusplus.github.io/LWG/issue3549)
