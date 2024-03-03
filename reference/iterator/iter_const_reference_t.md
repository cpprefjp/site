# iter_const_reference_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<indirectly_readable It>
  using iter_const_reference_t = common_reference_t<const iter_value_t<It>&&, iter_reference_t<It>>;
}
```
* indirectly_readable[link ./indirectly_readable.md]
* common_reference_t[link /reference/type_traits/common_reference.md]
* iter_value_t[link ./iter_value_t.md]
* iter_reference_t[link ./iter_reference_t.md]

## 概要

任意のイテレータ型`It`から、そのイテレータの要素への`const`参照型を取得する。

## 型の決定

`iter_value_t<It>`が非参照型であり`iter_reference_t<It>`から修飾を除いた型であるとすると、`iter_reference_t<It>`に対して`iter_const_reference_t<It>`は基本的には次のようになる（`T`を任意の修飾なしの型とする）

|`iter_reference_t<It>`|`iter_const_reference_t<It>`|
|---|---|
|`T&`|`const T&`|
|`T&&`|`const T&&`|
|`const T&`|`const T&`|
|`const T&&`|`const T&&`|
|`T`|`T`|
|`const T`|`T`|

`iter_value_t<It>`に対して`iter_reference_t<It>`が修飾以外も異なる型となる場合や、`It`に対して`iterator_traits`の特殊化が存在する場合、`const iter_value_t<It>&&`と`iter_reference_t<It>`について`common_reference`が特殊化されている場合などはこれと異なる結果となりうる。標準ライブラリにあるそのようなイテレータ型を持つものについて一部例を示すと、次のようになる

|`It`の取得元の範囲|`iter_value_t<It>`|`iter_reference_t<It>`|`iter_const_reference_t<It>`|
|---|---|---|---|
|[`std::vector<bool>`](/reference/vector/vector.md)|`bool`|`std::vector<bool>::reference`|`bool`|
|`const std::vector<bool>`|`bool`|`bool`|`bool`|
|[`views::zip`](/reference/ranges/zip_view.md)|`std::tuple<T, U>`|`std::tuple<T&, U&>`|`std::tuple<const T&, const D&>`|
|[`views::enumrate`](/reference/ranges/enumrate_view.md.nolink)|`std::tuple<D, T>`|`std::tuple<D, T&>`|`std::tuple<D, const T&>`|

表中の`T, U`はそれそれの`view`に入力された範囲の値型、`D`は`views::enumrate`の入力範囲の`iter_difference_t`とする。

## 例
```cpp example
#include <iterator>
#include <tuple>

// indirectly_readableとなる最低限の型
// Rが参照型、Vが値型となる
template<typename R, typename V>
struct test_indirectly_readable {
  using value_type = V;
  using difference = std::ptrdiff_t;

  auto operator*() const -> R;
};

int main() {
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<int&       , int>>, const int&>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<int&&      , int>>, const int&&>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<const int& , int>>, const int&>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<const int&&, int>>, const int&&>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<int        , int>>, int>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<const int  , int>>, int>);

  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<std::tuple<int, double>  , std::tuple<int, double>>>, std::tuple<int, double>>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<std::tuple<int&, double&>, std::tuple<int, double>>>, std::tuple<const int&, const double&>>);
  static_assert(std::same_as<std::iter_const_reference_t<test_indirectly_readable<std::tuple<int, double>& , std::tuple<int, double>>>, const std::tuple<int, double>&>);
}
```
* std::iter_const_reference_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
