#tuple_size (C++11)
```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  class tuple_size<pair<T1, T2>>
    : public integral_constant<size_t, 2> {};
}
```
* pair[link /reference/utility/pair.md]
* integral_constant[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant-true_type-false_type.md)の機能を利用してコンパイル時の定数値として取得できる。


`<utility>`ヘッダでは、[`pair`](/reference/utility/pair.md)に関する特殊化を定義する。


##例
```cpp
#include <utility>

int main()
{
  static_assert(std::tuple_size<std::pair<int, int>>::value == 2, "");
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


