#tuple_element
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
* implementation-defined[italic]

##概要

`tuple_element`は、タプルとして見なせる型から、I番目の要素型を取得するためのクラスである。
`<array>`ヘッダでは、`array`に関する特殊化を定義する。
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
* tuple_element[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
GCC 4.7、およびVisual C++ 10.0のarrayに対するtuple_elementの特殊化では、Iの境界チェックがない。



##実装例

```cpp
```

##参照
```