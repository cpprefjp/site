# variant_alternative
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T>
  struct variant_alternative;                       // (1) 先行宣言

  template <std::size_t I, class T>
  struct variant_alternative<I, const T>;           // (2)

  template <std::size_t I, class T>
  struct variant_alternative<I, volatile T>;        // (3)

  template <std::size_t I, class T>
  struct variant_alternative<I, const volatile T>;  // (4)

  template <std::size_t I, class T>
  using variant_alternative_t =
    typename variant_alternative<I, T>::type;       // (5)

  template <std::size_t I, class... Types>
  struct variant_alternative<I, variant<Types...>>; // (6)
}
```
* variant[link variant.md]

## 概要
`variant_alternative`は、[`std::variant`](variant.md)クラスの候補型のうち、i番目の型を取得するためのクラスである。

- (1) : 先行宣言
- (2) : `const`修飾付き[`std::variant`](variant.md)型の候補型のうち、i番目の型を取得する
- (3) : `volatile`修飾付き[`std::variant`](variant.md)型の候補型のうち、i番目の型を取得する
- (4) : `const volatile`修飾付き[`std::variant`](variant.md)型の候補型のうち、i番目の型を取得する
- (5) : `typename`と`::type`を省略するためのエイリアステンプレート版
- (6) : 修飾なし[`std::variant`](variant.md)型の候補型のうち、i番目の型を取得する


## 要件
- `I < sizeof...(Types)`であること。そうでない場合、プ�グラムは不適格となる


## 効果
- (2) : `std::variant<Types...>`の`Types...`のうち、`I`番目の型`T`を取得し、[`std::add_const_t`](/reference/type_traits/add_const.md)`<T>`をメンバ型`type`とする
- (3) : `std::variant<Types...>`の`Types...`のうち、`I`番目の型`T`を取得し、[`std::add_volatile_t`](/reference/type_traits/add_volatile.md)`<T>`をメンバ型`type`とする
- (4) : `std::variant<Types...>`の`Types...`のうち、`I`番目の型`T`を取得し、[`std::add_cv_t`](/reference/type_traits/add_cv.md)`<T>`をメンバ型`type`とする
- (6) : `std::variant<Types...>`の`Types...`のうち、`I`番目の型`T`を取得し、その型をメンバ型`type`とする


## 例
```cpp example
#include <variant>
#include <string>
#include <type_traits>

int main()
{
  // (6) CV修飾なしstd::variant型の、1番目の候補型を取得する
  static_assert(std::is_same_v<
    std::variant_alternative<
      1,
      std::variant<int, std::string, double>
    >::type,
    std::string
  >);

  // (2) const修飾付きstd::variant型の、2番目の候補型を取得する
  static_assert(std::is_same_v<
    std::variant_alternative<
      2,
      const std::variant<int, std::string, double>
    >::type,
    const double
  >);

  // (3) volatile修飾付きstd::variant型の、0番目の候補型を取得する
  static_assert(std::is_same_v<
    std::variant_alternative<
      0,
      volatile std::variant<int, std::string, double>
    >::type,
    volatile int
  >);

  // (4) const volatile修飾付きstd::variant型の、1番目の候補型を取得する
  static_assert(std::is_same_v<
    std::variant_alternative<
      1,
      const volatile std::variant<int, std::string, double>
    >::type,
    const volatile std::string
  >);

  // (5) エイリアステンプレート版
  static_assert(std::is_same_v<
    std::variant_alternative_t<
      2,
      std::variant<int, std::string, double>
    >,
    double
  >);
}
```
* std::variant_alternative[color ff0000]
* std::variant_alternative_t[color ff0000]
* std::variant[link variant.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
