# 構造化束縛でパックを導入できるようにする [P1061R10]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、構造化束縛でタプルを分解する際に、パックで受け取れるようになる。

```cpp
std::tuple<X, Y, Z> f();

auto [x, y, z] = f();          // C++23: OK, C++26: OK
auto [...xs] = f();            // C++26: OK. パックxsは長さ3でX, Y, Zが含まれる
auto [x, ...rest] = f();       // C++26: OK. xはX、パックrestは長さ2でYとZが含まれる
auto [x, y, z, ...rest] = f(); // C++26: OK. restは空のパック
auto [x, ...rest, z] = f();    // C++26: OK. xはX、パックrestは長さ1でYに対応、zはZ
auto [...a, ...b] = f();       // NG: 複数のパックは指定できない
```

### std::apply()の実装改善
タプルを展開して指定した関数の引数として転送して実行する[`std::apply()`](/reference/tuple/apply.md)関数のC++23での実装：

```cpp
namespace detail {
  template <class F, class Tuple, std::size_t... I>
  constexpr decltype(auto) apply_impl(F &&f, Tuple &&t, std::index_sequence<I...>)
  {
    return std::invoke(std::forward<F>(f),
             std::get<I>(std::forward<Tuple>(t))...);
  }
}

template <class F, class Tuple>
constexpr decltype(auto) apply(F &&f, Tuple &&t)
{
  return detail::apply_impl(
        std::forward<F>(f), std::forward<Tuple>(t),
        std::make_index_sequence<std::tuple_size_v<
          std::decay_t<Tuple>>>{});
}
```
* std::invoke[link /reference/functional/invoke.md]
* std::get[link /reference/tuple/tuple/get.md]
* std::make_index_sequence[link /reference/utility/make_index_sequence.md]
* std::tuple_size_v[link /reference/tuple/tuple_size.md]

C++26での実装：

```cpp
namespace detail {
  template <class A, class B>
  using override_ref = std::conditional_t<std::is_rvalue_reference_v<A&&>, B&&, B&>;
}

template <class F, class Tuple>
constexpr decltype(auto) apply(F &&f, Tuple &&t)
{
  auto&& [...elems] = t;
  return std::invoke(std::forward<F>(f),
        static_cast<detail::override_ref<Tuple, decltype(elems)>>(elems)...);
}
```
* std::conditional_t[link /reference/type_traits/conditional.md]
* std::is_rvalue_reference_v[link /reference/type_traits/is_rvalue_reference.md]
* std::invoke[link /reference/functional/invoke.md]


### 複数のタプルに対して畳み込み式を実行する
C++23の場合：

```cpp
template <class P, class Q>
auto dot_product(P p, Q q) {
  return std::apply([&](auto... p_elems){
    return std::apply([&](auto... q_elems){
      return (... + (p_elems * q_elems));
    }, q)
  }, p);
}
```
* std::apply[link /reference/tuple/apply.md]

C++26の場合：

```cpp
template <class P, class Q>
auto dot_product(P p, Q q) {
  // applyが必要なくなる
  auto&& [...p_elems] = p;
  auto&& [...q_elems] = q;
  return (... + (p_elems * q_elems));
}
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [P1061R10 Structured Bindings can introduce a Pack](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1061r10.html)
