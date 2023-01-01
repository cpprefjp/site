# unhandled_exception
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
suspend_always yield_value(yielded val) noexcept; // (1)

auto yield_value(const remove_reference_t<yielded>& lval)
  requires is_rvalue_reference_v<yielded> &&
    constructible_from<remove_cvref_t<yielded>, const remove_reference_t<yielded>&>;  // (2)

template<class T2, class V2, class Alloc2, class Unused>
  requires same_as<typename generator<T2, V2, Alloc2>::yielded, yielded>
auto yield_value(ranges::elements_of<generator<T2, V2, Alloc2>&&, Unused> g) noexcept; // (3)

template<ranges::input_range Rng, class Alloc>
  requires convertible_to<ranges::range_reference_t<Rng>, yielded>
auto yield_value(ranges::elements_of<Rng, Alloc> r) noexcept; // (4)
```
* generator[link ../../generator.md]
* yielded[link ../../generator.md]
* suspend_always[link /reference/coroutine/suspend_always.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::elements_of[link /reference/ranges/elements_of.md]
* ranges::range_reference_t[link /reference/ranges/range_reference_t.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* is_rvalue_reference_v[link /reference/type_traits/is_rvalue_reference.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* same_as[link /reference/concepts/same_as.md]
* convertible_to[link /reference/concepts/convertible_to.md]


## 概要
ジェネレータコルーチンにおける[co_yield式](/lang/cpp20/coroutines.md)の動作を制御する。


## 事前条件
（執筆中）


## 効果
（執筆中）


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
