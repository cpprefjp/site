# common_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class... Types>
  struct common_reference {
    using type = …;
  };

  template <class... Types>
  using common_reference_t = typename common_reference<Types...>::type;
}
```

## 概要

与えられた型を全て参照可能な、共通の参照型を取得する。


## 要件

`Types...`の全ての型は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果

（執筆中）

`Types...`に含まれる全ての型を参照可能な参照型を、メンバ型`type`として定義する。ただし、`type`は必ずしも参照型であるとは限らない。

より詳細には、次のように決定される。

`N = sizeof...(Types)`として

- `N == 0` : メンバ型`type`は定義されない。

- `N == 1` : `Types...`内の唯一の型を`T`とすると、`type = T;`

- `N == 2` : `Types...`の１、2番目の型を`T1, T2`とすると
    - `T1, T2`は共に参照型であり、`COMMON-REF(T1, T2)`が有効ならば、`type = COMMON-REF(T1, T2);`
	- `basic_common_reference<remove_cvref_t<T1>, remove_cvref_t<T2>,XREF(T1), XREF(T2)>::type`が有効ならば、メンバ型`type`はその型
	- `COND-RES(T1, T2)`が有効ならば、`type = COND-RES(T1, T2);`
	- `common_type_t<T1, T2>`が有効ならば、`type = common_type_t<T1, T2>;`
	- そうでなければ、メンバ型`type`は定義されない。
- `N >= 3` : `Types...`の１、2番目の型を`T1, T2`、残りのパラメータパックを`Rest`、`C = common_reference<T1, T2>`とすると
    - 型`C`が存在する場合、`type = common_reference<C, Rest...>;`のようにメンバ型``type`を定義。
    - そうでなければ、メンバ型`type`は定義されない。

## 例
（執筆中）

```cpp example
#include <iostream>
#include <type_traits>

int main()
{
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3

## 関連項目

- [`basic_common_reference`](basic_common_reference.md)
- [`common_reference_with`](/reference/concepts/common_reference_with.md.nolink)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
