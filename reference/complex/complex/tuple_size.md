# tuple_size
* complex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  template <class T>
  struct tuple_size<complex<T>>
    : integral_constant<std::size_t, 2> {};
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。

`<complex>`ヘッダでは、[`std::complex`](/reference/complex/complex.md)クラスに関する特殊化を定義する。


## 例
```cpp example
#include <complex>

int main()
{
  static_assert(std::tuple_size<std::complex<float>>::value == 2, "");
}
```
* std::tuple_size[color ff0000]


### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 参照
- [P2819R2 Add tuple protocol to complex](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2819r2.pdf)
    - C++26から`std::complex`にタプルインタフェースがサポートされた
