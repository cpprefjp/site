#tuple_size (C++11)
* tuple[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T> class tuple_size; // 宣言のみで定義なし

  template <class T> class tuple_size<const T>;
  template <class T> class tuple_size<volatile T>;
  template <class T> class tuple_size<const volatile T>;

  template <class... Types>
  class tuple_size<tuple<Types...>>
    : public integral_constant<size_t, sizeof...(Types)> {};
}
```
* tuple[link ./tuple.md]
* integral_constant[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。 
要素数は、[`integral_constant`](/reference/type_traits/integral_constant-true_type-false_type.md)の機能を利用してコンパイル時の定数値として取得できる。

- `template <class T> class tuple_size;`

特殊化のための先行宣言。特殊化されていない型の場合、定義が行われないため要素数を取得しようとする段階でコンパイルエラーとなる。

- `template <class T> class tuple_size<const T>;`
- `template <class T> class tuple_size<volatile T>;`
- `template <class T> class tuple_size<const volatile T>;`

CV修飾された型からも要素数を取得できるようにするための部分特殊化。

- `template <class... Types> class tuple_size<tuple<Types...>>;`

`std::tuple`の要素数を取得できるようにするための部分特殊化。


##例

```cpp
#include <tuple>

int main()
{
  static_assert(std::tuple_size<               std::tuple<int, int, int>>::value == 3, "");
  static_assert(std::tuple_size<const          std::tuple<int, int, int>>::value == 3, "");
  static_assert(std::tuple_size<volatile       std::tuple<int, int, int>>::value == 3, "");
  static_assert(std::tuple_size<const volatile std::tuple<int, int, int>>::value == 3, "");
}
```
* tuple_size[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
