# tuple_cat
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Tuples>
  tuple<Ctypes ...> tuple_cat(Tuples&&...);                // C++11

  template <class... Tuples>
  constexpr tuple<Ctypes ...> tuple_cat(Tuples&&...);      // C++14

  template <tuple-like... Tuples>
  constexpr tuple<Ctypes ...> tuple_cat(Tuples&&... tpls); // C++23
}
```
* tuple[link tuple.md]
* tuple-like[link tuple-like.md]

## 概要
複数の[`tuple`](tuple.md)を繋ぎ合わせ、1つの[`tuple`](tuple.md)にする。C++23 からは[`tuple-like`](tuple-like.md)である型を対象に繋ぎ合わせることが可能。


## 要件
- C++20まで :
    - `Tuples...`の全ての型が[`std::tuple`](tuple.md)`<Args...>`であること。
    - `Tuples...`の各型が左辺値参照であればその要素型`Args...`の各型はコピー構築可能、そうでなければムーブ構築可能であること。
- C++23から :
    - 本関数の戻り値の[`tuple`](tuple.md)のテンプレートパラメーターパックを`Ctypes`とし、`Ctypes`の全ての要素について、引数`tpls`において対応する要素の型から構築可能であること。
    - より厳密には、次のように定義を行い、`(`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<CTypes, decltype(celems)> && ...) == true`であること。
        - `n`を`sizeof...(Tuples)`とし、`i`を範囲`[0, n)`における整数値とする
        - `T(i)`を`Tuples`の`i`番目とする
        - `U(i)`を[`remove_cvref_t<T(i)>`](/reference/type_traits/remove_cvref.md) とする
        - `tp(i)`をパラメータパック`tpls`の`i`番目とする
        - `S(i)`を[`tuple_size_v<U(i)>`](/reference/tuple/tuple_size.md)とする
        - `E(i,k)`を[`tuple_element_t<k, U(i)>`](/reference/tuple/tuple_element.md)とする
        - `e(i,k)`を`get<k>(`[`std::forward`](/reference/utility/forward.md)`<T(i)>(tp(i)))`とする
        - `Elems(i)`を型パラメータパック`E(i,0), ..., E(i,Si-1)`とする
        - `elems(i)`をパラメータパック`e(i,0), ..., e(i,Si-1)`とする
        - `Ctypes`を型パラメーターパック`Elems(0)..., Elems(1)..., ..., Elems(n-1)...`とする
        - `celems`をパラメーターパック`elems(0)..., elems(1), ..., elems(n-1)...`とする


## 戻り値
`Tuples...`の全ての`tuple`型の要素型全てを取り出し、`std::`[`forward`](/reference/utility/forward.md)`<T>(x)`して構築される1つの[`tuple`](tuple.md)`オブジェクト。


## 備考
実装によっては、`Tuples...` パラメータパックに含めることのできる型として、他のタプルライクな型（[`pair`](/reference/utility/pair.md)や[`array`](/reference/array/array.md)のような）を追加的にサポートする可能性がある。（C++23からは[`tuple-like`](tuple-like.md)を満たす型をサポートする。）


## 例
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, std::string> t1(1, "Hello");
  std::tuple<char, double> t2('a', 3.14);
  std::tuple<std::string> t3("World");

  // 3つのtupleを繋ぎ合わせる
  std::tuple<int, std::string, char, double, std::string> result =
      std::tuple_cat(t1, t2, t3);

  std::cout << std::get<0>(result) << std::endl;
  std::cout << std::get<1>(result) << std::endl;
  std::cout << std::get<2>(result) << std::endl;
  std::cout << std::get<3>(result) << std::endl;
  std::cout << std::get<4>(result) << std::endl;
}
```
* std::tuple_cat[color ff0000]
* std::get[link tuple/get.md]

### 出力
```
1
Hello
a
3.14
World
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
