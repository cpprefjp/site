# is_unbounded_array
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_unbounded_array;

  template <class T>
  inline constexpr bool is_unbounded_array_v = is_unbounded_array<T>::value;
}
```

## 概要
型`T`が要素数の不明な配列型かを調べる。

要素数の不明な配列型とは、`T[N]`や`T*`を含まない`T[]`形式の配列型である。


## 効果
`is_unbounded_array`は、`T`が要素型の不明な配列型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

int main()
{
  static_assert(std::is_unbounded_array<int[]>::value);
  static_assert(std::is_unbounded_array<int[3]>::value == false);
  static_assert(std::is_unbounded_array<int*>::value == false);

  // CV修飾してもよい
  static_assert(std::is_unbounded_array_v<const int[]>);

  // 参照はダメ
  static_assert(std::is_unbounded_array_v<int(&)[]> == false);
}
```
* std::is_unbounded_array[color ff0000]
* std::is_unbounded_array_v[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1357R1 Traits for [Un]bounded Arrays](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1357r1.pdf)
