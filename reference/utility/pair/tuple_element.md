# tuple_element
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <size_t I, class T> class tuple_element;

  template <class T1, class T2>
  struct tuple_element<0, pair<T1, T2>> {
    using type = T1;
  };

  template <class T1, class T2>
  struct tuple_element<1, pair<T1, T2>> {
    using type = T2;
  };
}
```


## 概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<utility>`ヘッダでは、[`pair`](../pair.md)に関する特殊化を定義する。


## 例
```cpp example
#include <utility>
#include <type_traits>

int main()
{
  static_assert(std::is_same<
                  std::tuple_element<0, std::pair<int, double>>::type,
                  int
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<1, std::pair<int, double>>::type,
                  double
                >::value, "");
}
```
* std::tuple_element[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 参照
- [`tuple_element - <tuple>`](/reference/tuple/tuple_element.md)

