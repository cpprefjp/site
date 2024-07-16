# tuple_size
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  // C++11
  struct tuple_size<std::pair<T1, T2>> {
    static constexpr std::size_t value = 2;
  };

  // C++14
  struct tuple_size<std::pair<T1, T2>>
    : public integral_constant<std::size_t, 2> {};
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。


`<utility>`ヘッダでは、[`pair`](/reference/utility/pair.md)に関する特殊化を定義する。


## 例
```cpp example
#include <utility>

int main()
{
  static_assert(std::tuple_size<std::pair<int, int>>::value == 2, "");
}
```
* std::tuple_size[color ff0000]

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
- [LWG Issue 2313. `tuple_size` should always derive from `integral_constant<size_t, N>`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2313)

