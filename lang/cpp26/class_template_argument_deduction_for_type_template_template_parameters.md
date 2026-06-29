# テンプレートテンプレートパラメータに対するクラステンプレートパラメータ引数推論 [P3865R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
クラステンプレートのテンプレート引数推論 (CTAD, class template argument deduction) を、テンプレートテンプレートパラメータでも使用できるようにする。

C++23までは、テンプレートテンプレートパラメータに対してテンプレート引数推論を行えるかが規格上は規定されていなかった。実際にはC++23の[`std::ranges::to()`](/reference/ranges/to.md)関数がこの機能に依存しており、すべての主要なコンパイラもテンプレートテンプレートパラメータのテンプレート引数推論を行えるよう実装されていた。C++26では、これを欠陥報告 (DR) として修正し、テンプレートテンプレートパラメータに対するクラステンプレートのテンプレート引数推論を正式に許可する。欠陥扱いであったため、この機能はC++23時点で使用できることが期待できる。

```cpp
template <typename T>
struct C {
  C(T);
};

template <template <typename> class X>
void f()
{
  X x(1); // xの型はC<int>と推論される
}

template void f<C>();
```


## 仕様
テンプレートテンプレートパラメータに対するプレースホルダーの推論は、そのテンプレートテンプレートパラメータを、同じテンプレートパラメータをもつ「テンプレートテンプレート引数を表すエイリアステンプレート」に置き換えたものとして行われる。

これはエイリアステンプレートに対するCTADと同じ仕組みであり、単純にテンプレートテンプレート引数を代入する方式とは異なる。この方式によって、以下の2点が保証される。

- テンプレートテンプレートパラメータに指定されたデフォルトテンプレート引数が尊重される
- テンプレートテンプレートパラメータの名前では書けない型は推論されない (不適格となる)

### テンプレートテンプレートパラメータの名前で書けない型は推論されない
```cpp
template <typename... T>
struct C {
  C(T...);
};

template <template <typename> class X>
void f()
{
  X x1{1};    // OK: C<int>と推論される
  X x2{1, 2}; // エラー: C<int, int>はXの名前では書けないため、推論に失敗する
}

template void f<C>();
```

`X`は型パラメータを1つだけとるため、`C<int, int>`のような型は`X`の名前では表現できない。そのため`x2`の推論は不適格となる。これはエイリアステンプレートに対するCTADと同様の「推論可能性 (deducible) 」の制約による。


### デフォルトテンプレート引数が尊重される
```cpp
template <typename T = int>
struct C {
  C(int);
};

template <template <typename = long> class X>
void f()
{
  X x{1}; // xの型はC<long>と推論される (Xのデフォルト引数longが使われる)
}

template void f<C>();
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)
- [`std::ranges::to`](/reference/ranges/to.md)


## 参照
- [P3865R3 Class template argument deduction (CTAD) for type template template parameters](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3865r3.pdf)
