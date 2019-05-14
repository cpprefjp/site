# tuple_element
* span[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T> class tuple_element; // 先行宣言

  template <std::size_t I, class ElementType, std::size_t N>
  struct tuple_element<I, span<T, N>> {
    static_assert(I < N, implementation-defined);
    using type = ElementType;
  }
}
```

## 概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<span>`ヘッダでは、`span`クラスに関する特殊化を定義する。
`span`の特殊化では、`tuple_element::type`は常に`ElementType`である。


## 適格要件
- `I < N`であること


## 例
```cpp example
#include <span>
#include <type_traits>

int main()
{
  using S = std::span<int, 3>;

  static_assert(std::is_same_v<
                  std::tuple_element<0, S>::type,
                  int
                >);

  static_assert(std::is_same_v<
                  std::tuple_element<1, S>::type,
                  int
                >);
}
```
* std::tuple_element[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
