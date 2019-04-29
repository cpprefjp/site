# apply
* tuple[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  template<class F, class Tuple>
  constexpr decltype(auto) apply(F&& f, Tuple&& t);
}
```

## 概要
タプルを展開し、関数の引数に適用してその関数を実行する。


## 要件
適用先の関数は[`Callable`](/reference/concepts/Callable.md)要件を満たす（[INVOKE](/reference/concepts/Invoke.md)操作が可能）。展開されるものは、[`std::tuple`](../tuple.md)、[`std::array`](/reference/array/array.md)または[`std::pair`](/reference/utility/pair.md)のように、[`std::get`](/reference/array/array/get.md)と[`std::tuple_size`](/reference/array/array/tuple_size.md)をサポートする必要がある。


## 効果
次のような関数があるとき、

```cpp
template<class F, class Tuple, size_t... I>
constexpr decltype(auto) apply-impl(F&& f, Tuple&& t, std::index_sequence<I...>) {
  return std::invoke(std::forward<F>(f), std::get<I>(std::forward<Tuple>(t))...);
}
```
* std::index_sequence[link /reference/utility/index_sequence.md]
* std::invoke[link /reference/functional/invoke.md]
* std::forward[link /reference/utility/forward.md]

次と等価である。

```cpp
return apply-impl(std::forward<F>(f), std::forward<Tuple>(t),
                  std::make_index_sequence<std::tuple_size_v<std::remove_reference_t<Tuple>>>{});
```
* std::make_index_sequence[link /reference/utility/make_index_sequence.md]
* std::remove_reference_t[link /reference/type_traits/remove_reference.md]

## 戻り値
適用した関数の戻り値である。


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
- [Clang](/implementation.md#clang): 3.9.1
- [GCC](/implementation.md#gcc): 7.1.0 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [make_from_tuple](../tuple/make_from_tuple.md)
- [`std::tuple`](../tuple.md)
- [INVOKE](/reference/concepts/Invoke.md)


## 参照
- [N3802 `apply()` call a function with arguments from a tuple](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3802.pdf)
- [N3829 `apply()` call a function with arguments from a tuple (V2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3829.pdf)
- [N3915 `apply()` call a function with arguments from a tuple (V3)](http://isocpp.org/files/papers/N3915.pdf)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [C++1z タプルを展開して関数呼び出しするapply関数 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/08/18/184315)
