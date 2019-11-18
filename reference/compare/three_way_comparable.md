# three_way_comparable
* compare[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

  template<class T, class Cat = partial_ordering>
  concept three_way_comparable = /*see below*/;             // (1)

  template<class T, class U, class Cat = partial_ordering>
  concept three_way_comparable_with = /*see below*/;        // (2)
}
```

## 概要
`three_way_comparable`及び`three_way_comparable_with`は、指定された型`T`もしくは`T, U`の間で`<=>`による三方比較を使用可能であり、その戻り値型が指定した比較カテゴリ型`Cat`に変換可能であることを表すコンセプトである。


## 要件

まず、説明専用のコンセプト`compares-as`及び`partially-ordered-with`を以下のように定義する。

```cpp
//Catがvoidでないなら、TとCatは比較カテゴリ型でありTはCatへ変換可能である
template<class T, class Cat>
concept compares-as = same_as<common_comparison_category_t<T, Cat>, Cat>;

//順序付けの4種×2方向の比較演算子が使用可能であり、戻り値型がbooleanコンセプトを満たす
template<class T, class U>
concept partially-ordered-with =
  requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
    { t <  u } -> boolean;
    { t >  u } -> boolean;
    { t <= u } -> boolean;
    { t >= u } -> boolean;
    { u <  t } -> boolean;
    { u >  t } -> boolean;
    { u <= t } -> boolean;
    { u >= t } -> boolean;
  };
```
* common_comparison_category_t[link /reference/compare/common_comparison_category.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* boolean[link /reference/concepts/boolean.md.nolink]

- (1) : 次のように定義される。

```cpp
template<class T, class Cat = partial_ordering>
concept three_way_comparable =
  weakly-equality-comparable-with<T, T> &&
  (!convertible_to<Cat, partial_ordering> || partially-ordered-with<T, T>) &&
  requires(const remove_reference_t<T>& a, const remove_reference_t<T>& b) {
    { a <=> b } -> compares-as<Cat>;
  };
```
* partial_ordering[link /reference/compare/partial_ordering.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* convertible_to[link /reference/concepts/convertible_to.md.nolink]

- (2) : 次のように定義される。

```cpp
template<class T, class U, class Cat = partial_ordering>
concept three_way_comparable_with =
  weakly-equality-comparable-with<T, U> &&
  (!convertible_to<Cat, partial_ordering> || partially-ordered-with<T, U>) &&
  three_way_comparable<T, Cat> &&
  three_way_comparable<U, Cat> &&
  common_reference_with<const remove_reference_t<T>&, const remove_reference_t<U>&> &&
  three_way_comparable<
    common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>, Cat> &&
  requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
    { t <=> u } -> compares-as<Cat>;
    { u <=> t } -> compares-as<Cat>;
  };
```
* partial_ordering[link /reference/compare/partial_ordering.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* convertible_to[link /reference/concepts/convertible_to.md.nolink]
* common_reference_with[link /reference/concepts/common_reference_with.md.nolink]
* common_reference_t[link /reference/type_traits/common_reference.md.nolink]

## モデル

- (1) : `const remove_reference_t<T>`の左辺値`a, b`について次の条件を満たす場合に限って、2つ組`T, Cat`は`three_way_comparable`のモデルである
    - `(a <=> b == 0) == bool(a == b)`が`true`であること
    - `(a <=> b != 0) == bool(a != b)`が`true`であること
    - `((a <=> b) <=> 0) == (0 <=> (a <=> b))`が等値
    - `Cat`が`strong_equality`に変換可能ならば
        - `T`は`equality_comparable`のモデルである
    - `Cat`が`partial_ordering`に変換可能ならば
        - `(a <=> b < 0) == bool(a < b)`が`true`であること
        - `(a <=> b > 0) == bool(a > b)`が`true`であること
        - `(a <=> b <= 0) == bool(a <= b)`が`true`であること
        - `(a <=> b >= 0) == bool(a >= b)`が`true`であること
    - `Cat`が`strong_ordering`に変換可能ならば
        - `T`は`totally_orderd`のモデルである
  
- (2) : `const remove_reference_t<T>, const remove_reference_t<U>`の左辺値`t, u`、`C = common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>`について次の条件を満たす場合に限って、3つ組`T, U, Cat`は`three_way_comparable_with`のモデルである
    - `t <=> u`と`u <=> t`が同じ定義域を持つ（それぞれの引数型がその順番によらず同一である）
    - `((t <=> u) <=> 0) == (0 <=> (t <=> u))`が等値
    - `(t <=> u == 0) == bool(t == u)`が`true`であること
    - `(t <=> u != 0) == bool(t != u)`が`true`であること
    - `Cat(t <=> u) == Cat(C(t) <=> C(u))`が`true`であること
    - `Cat`が`strong_equality`に変換可能ならば
        - `T, U`は`equality_comparable_with`のモデルである
    - `Cat`が`partial_ordering`に変換可能ならば
        - `(t <=> u < 0) == bool(t < u)`が`true`であること
        - `(t <=> u > 0) == bool(t > u)`が`true`であること
        - `(t <=> u <= 0) == bool(t <= u)`が`true`であること
        - `(t <=> u >= 0) == bool(t >= u)`が`true`であること
    - `Cat`が`strong_ordering`に変換可能ならば
        - `T, U`は`totally_orderd_with`のモデルである

- `partially-ordered-with` : `const remove_reference_t<T>, const remove_reference_t<U>`の左辺値`t, u`について次の条件を満たす場合に限って、3つ組`T, U, Cat`は`partially-ordered-with`のモデルである
    - `t < u, t <= u, t > u, t >= u, u < t, u <= t, u > t, u >= t`が全て同じ定義域を持つ
    - `bool(t < u) == bool(u > t)`が`true`
    - `bool(u < t) == bool(t > u)`が`true`
    - `bool(t <= u) == bool(u >= t)`が`true`
    - `bool(u <= t) == bool(t >= u)`が`true`


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
