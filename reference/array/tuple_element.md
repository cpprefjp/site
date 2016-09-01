#tuple_element
* array[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <size_t I, class T> class tuple_element; // 先行宣言

  template <size_t I, class T, size_t N>
  struct tuple_element<I, array<T, N>> {
    static_assert(I < N, implementation-defined);
    typedef T type;
  }
}
```

##概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<array>`ヘッダでは、`array`クラスに関する特殊化を定義する。
`array`の特殊化では、`tuple_element::type`は常に`T`である。


##要件
`I < N`であること。`I`が`array`の要素数以上である場合、プログラムは不適格である。


##例
```cpp
#include <array>
#include <type_traits>

int main()
{
  static_assert(std::is_same<
                  std::tuple_element<0, std::array<int, 2>>::type,
                  int
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<1, std::array<int, 2>>::type,
                  int
                >::value, "");
}
```
* tuple_element[color ff0000]


###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0

####備考
GCC 4.7、およびVisual C++ 10.0の`array`に対する`tuple_element`の特殊化では、`I`の境界チェックがない。


##参照

