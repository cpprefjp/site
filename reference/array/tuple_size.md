#tuple_size (C++11)
* array[meta header]

```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  template <class T, size_t N>
  struct tuple_size<array<T, N>>
    : integral_constant<size_t, N> {};
}
```
* integral_constant[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。
要素数は、[`integral_constant`](/reference/type_traits/integral_constant-true_type-false_type.md)の機能を利用してコンパイル時の定数値として取得できる。

`<array>`ヘッダでは、[`array`](/reference/array.md)クラスに関する特殊化を定義する。


##例
```cpp
#include <array>

int main()
{
  static_assert(std::tuple_size<std::array<int, 3>>::value == 3, "");
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
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


##参照

