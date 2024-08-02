# tuple_element
* complex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T> class tuple_element; // 先行宣言

  template<size_t I, class T>
  struct tuple_element<I, complex<T>> {
    using type = T;
   };
}
```

## 概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<complex>`ヘッダでは、`std::complex`クラスに関する特殊化を定義する。


## 適格要件
- `I < 2`であること


## 例
```cpp example
#include <complex>
#include <type_traits>

int main()
{
  static_assert(std::is_same<
                  std::tuple_element<0, std::complex<float>>::type,
                  float
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<1, std::complex<float>>::type,
                  float
                >::value, "");
}
```
* std::tuple_element[color ff0000]

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
