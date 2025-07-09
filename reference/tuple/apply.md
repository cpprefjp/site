# apply
* tuple[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  template<class F, class Tuple>
  constexpr decltype(auto)
    apply(F&& f, Tuple&& t);                     // (1) C++20

  template<class F, tuple-like Tuple>
  constexpr decltype(auto)
    apply(F&& f, Tuple&& t) noexcept(see below); // (1) C++23
}
```
* tuple-like[link tuple-like.md]
* tuple-like[link tuple-like.md]
* see below[italic]

## 概要
タプルを展開し、関数の引数に適用してその関数を実行する。


## 要件
適用先の関数は[`Callable`](/reference/concepts/Callable.md)要件を満たす（[INVOKE](/reference/concepts/Invoke.md)操作が可能）。展開される`Tuple`型は[`std::tuple`](../tuple.md)に限定されず、[`std::array`](/reference/array/array.md)または[`std::pair`](/reference/utility/pair.md)のように、[`std::get`](/reference/array/array/get.md)と[`std::tuple_size`](/reference/array/array/tuple_size.md)をサポートする型であればよい。（C++20 まで。）C++23 では[`tuple-like`](tuple-like.md)による制約が追加されたため、使用できる型は狭まった。（[`tuple-like`](tuple-like.md)参照）


## 効果
次のような関数があるとき、

```cpp
// C++17
template<class F, class Tuple, size_t... I>
constexpr decltype(auto) apply-impl(F&& f, Tuple&& t, std::index_sequence<I...>) {
  return std::invoke(std::forward<F>(f), std::get<I>(std::forward<Tuple>(t))...);
}

// C++23
template<class F, tuple-like Tuple, size_t... I>
constexpr decltype(auto) apply-impl(F&& f, Tuple&& t, std::index_sequence<I...>) {
  return std::invoke(std::forward<F>(f), std::get<I>(std::forward<Tuple>(t))...);
}
```
* std::get[link tuple/get.md]
* std::index_sequence[link /reference/utility/index_sequence.md]
* std::invoke[link /reference/functional/invoke.md]

C++17 : 次と等価である。
```cpp
return apply-impl(std::forward<F>(f), std::forward<Tuple>(t),
                  std::make_index_sequence<std::tuple_size_v<std::decay_t<Tuple>>>{});
```
* std::tuple_size_v[link tuple_size.md]
* std::make_index_sequence[link /reference/utility/make_index_sequence.md]

C++20 : 次と等価である。
```cpp
return apply-impl(std::forward<F>(f), std::forward<Tuple>(t),
                  std::make_index_sequence<std::tuple_size_v<std::remove_reference_t<Tuple>>>{});
```
* std::tuple_size_v[link tuple_size.md]
* std::make_index_sequence[link /reference/utility/make_index_sequence.md]
* std::remove_reference_t[link /reference/type_traits/remove_reference.md]


## 戻り値
適用した関数呼び出しの戻り値


## 例外
C++23から : `I`をパラメータパック`0, 1, ..., (`[`tuple_size_v`](tuple_size.md)`<`[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<Tuple>>-1)`としたとき、例外指定の式は次と等価 : `noexcept(`[`invoke`](/reference/functional/invoke.md)`(std::forward<F>(f), get<I>(std::forward<Tuple>(t))...))`


## 例
```cpp example
#include <iostream>
#include <tuple>
#include <string>

void f(int a, double b, std::string c)
{
  std::cout << a << std::endl;
  std::cout << b << std::endl;
  std::cout << c << std::endl;
}

int main()
{
  std::tuple<int, double, std::string> args(1, 3.14, "hello");
  std::apply(f, args);
}
```
* std::apply[color ff0000]

### 出力
```
1
3.14
hello
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.9.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`make_from_tuple`](make_from_tuple.md)
- [`std::tuple`](../tuple.md)
- [INVOKE](/reference/concepts/Invoke.md)
- [`tuple-like`](tuple-like.md)


## 参照
- [N3802 `apply()` call a function with arguments from a tuple](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3802.pdf)
- [N3829 `apply()` call a function with arguments from a tuple (V2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3829.pdf)
- [N3915 `apply()` call a function with arguments from a tuple (V3)](http://isocpp.org/files/papers/N3915.pdf)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [C++1z タプルを展開して関数呼び出しするapply関数 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/08/18/184315)
- [P0777R1 Treating Unnecessary `decay`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0777r1.pdf)
    - C++20から効果説明の`decay_t`を`remove_cvref_t`へ変更。
- [P2517R1 Add a conditional `noexcept` specification to `std::apply`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2517r1.html)
    - C++23から条件付きで`noexcept`例外指定が行われる。
