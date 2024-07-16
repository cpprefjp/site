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

`Types...`に含まれる全ての型を参照可能な参照型を、メンバ型`type`として定義する。ただし、`type`は必ずしも参照型であるとは限らない。

より詳細には、次のように決定される。

`N = sizeof...(Types)`として

- `N == 0` : メンバ型`type`は定義されない。

- `N == 1` : `Types...`内の唯一の型を`T`とすると、`type = T;`

- `N == 2` : `Types...`の１、2番目の型を`T1, T2`とすると
    - `T1, T2`は共に参照型であり、`COMMON-REF(T1, T2)`が有効ならば、`type = COMMON-REF(T1, T2);`
	- [`basic_common_reference`](basic_common_reference.md)`<remove_cvref_t<T1>, remove_cvref_t<T2>, XREF(T1), XREF(T2)>::type`が有効ならば、メンバ型`type`はその型
	- `COND-RES(T1, T2)`が有効ならば、`type = COND-RES(T1, T2);`
	- [`common_type_t`](common_type.md)`<T1, T2>`が有効ならば、`type = common_type_t<T1, T2>;`
	- そうでなければ、メンバ型`type`は定義されない。
- `N >= 3` : `Types...`の１、2番目の型を`T1, T2`、残りのパラメータパックを`Rest`、`C = common_reference<T1, T2>`とすると
    - 型`C`が存在する場合、`type = common_reference<C, Rest...>;`のようにメンバ型`type`を定義。
    - そうでなければ、メンバ型`type`は定義されない。

`COMMON-REF`や`XREF`はそれぞれ次のように定義される型を表す説明専用のものである

- `XREF(A)`
    - 参照ではなくCV修飾もされていない型`U`を引数に取り、`A`の参照・CV修飾をそのまま`U`にコピーした型を示すエイリアステンプレート`T<U>`
    - このような`T<U>`は、[`basic_common_reference`](basic_common_reference.md)の要件指定で使用される
- `COND-RES(X, Y)`
    - `decltype(false ? declval<X(&)()>()() : declval<Y(&)()>()())`
- `COPYCV(FROM, TO)`
    - 型`FROM`の最上位のCV修飾をそのまま`TO`へコピーした型を示すエイリアス
- `COMMON-REF(A, B)`
    - `X = remove_reference_t<A>`, `Y = remove_reference_t<B>`として、以下のように定義される
        1. `A, B`が共に左辺値参照型の場合、`COND-RES(COPYCV(X, Y) &, COPYCV(Y, X) &)`が有効であり参照型ならばその型
        2. `A, B`が共に右辺値参照型の場合、`C = remove_reference_t<COMMON-REF(X, Y)>&&`（1に委譲）が有効であり、`is_convertible_v<A, C> && is_convertible_v<B, C> == true`ならば、型`C`
        3. `A`が右辺値参照型で`B`が左辺値参照型の場合、`D = COMMON-REF(const X&, Y&)`（1に委譲）が有効であり、`is_convertible_v<A, D> == true`ならば、型`D`
        4. `B`が右辺値参照型で`A`が左辺値参照型の場合、`COMMON-REF(B, A)`として3に委譲
        5. それ以外の場合及び、上位のいずれかによる結果として不適格な型が生成された場合は、`COMMON-REF(A, B)`は不適格

## 備考

本メタ関数`common_reference`は、より一般的なイテレータの`value_type`と`reference`との間の関係性を定義するために導入された。

ポインタ型やC++17までの標準ライブラリにおける普通のイテレータ型では、その`reference`型は`value_type&`の別名として定義されるという関係性がある。そのため、`value_type`と`reference`はどちらも`const`左辺値参照を付加することで`const value_type&`に変換できる（ことが期待される）。

しかし、C++20から追加される`range`ライブラリの元となった`range-v3`ライブラリにおける`zip_view`（標準ライブラリへはC++23で導入される）のプロキシイテレータのように、特殊なイテレータではそのような関係性が必ずしも成り立つとは限らない。

このような関係性を持つ型があるとジェネリックなアルゴリズムをより簡易に書くことができるようになるなどメリットがあるため、そのような型を求めるために`common_reference`が導入された。

他にも、2つの型の間で定義されるコンセプトにおいて、その2つの型の間で上記のような関係性が自然に要求される場合に、[`common_reference_with`](/reference/concepts/common_reference_with.md)コンセプトを通じて利用される。

## 例

```cpp example
#include <string>
#include <vector>
#include <type_traits>

int main()
{
  static_assert(std::same_as<std::common_reference_t<std::size_t&, int&>, std::size_t>);
  static_assert(std::same_as<std::common_reference_t<const std::size_t&, int&>, std::size_t>);
  static_assert(std::same_as<std::common_reference_t<long double&, double&>, long double>);
  static_assert(std::same_as<std::common_reference_t<long double&, const double&>, long double>);
  static_assert(std::same_as<std::common_reference_t<std::string&, std::string_view&>, std::string_view>);
  static_assert(std::same_as<std::common_reference_t<const std::vector<int>, std::vector<int>&>, const std::vector<int>>);
}
```
* std::common_reference_t[color ff0000]
* std::same_as[link /reference/concepts/same_as.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [`basic_common_reference`](basic_common_reference.md)
- [`common_reference_with`](/reference/concepts/common_reference_with.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [What is the purpose of C++20 std::common_reference? - stackoverflow](https://stackoverflow.com/questions/59011331/what-is-the-purpose-of-c20-stdcommon-reference)
