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

//順序付けの4種×2方向の比較演算�が使用可能であり、戻り値型がbooleanコンセプトを満たす
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
* boolean[link /reference/concepts/boolean.md]

- (1) : 以下のように定義される。

```cpp
template<class T, class Cat = partial_ordering>
concept three_way_comparable =
  weakly-equality-comparable-with<T, T> &&
  partially-ordered-with<T, T> &&
  requires(const remove_reference_t<T>& a, const remove_reference_t<T>& b) {
    { a <=> b } -> compares-as<Cat>;
  };
```
* partial_ordering[link /reference/compare/partial_ordering.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* convertible_to[link /reference/concepts/convertible_to.md]

- (2) : 以下のように定義される。

```cpp
template<class T, class U, class Cat = partial_ordering>
concept three_way_comparable_with =
  weakly-equality-comparable-with<T, U> &&
  partially-ordered-with<T, U> &&
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
* convertible_to[link /reference/concepts/convertible_to.md]
* common_reference_with[link /reference/concepts/common_reference_with.md]
* common_reference_t[link /reference/type_traits/common_reference.md]

## モデル

- (1) : `const remove_reference_t<T>`の左辺値`a, b`について次の条件を満たす場合に限って、型`T, Cat`は`three_way_comparable`のモデルである
    - `(a <=> b == 0) == bool(a == b)`が`true`であること
    - `(a <=> b != 0) == bool(a != b)`が`true`であること
    - `((a <=> b) <=> 0) == (0 <=> (a <=> b))`が�値
    - `(a <=> b < 0) == bool(a < b)`が`true`であること
    - `(a <=> b > 0) == bool(a > b)`が`true`であること
    - `(a <=> b <= 0) == bool(a <= b)`が`true`であること
    - `(a <=> b >= 0) == bool(a >= b)`が`true`であること
    - `Cat`が`strong_ordering`に変換可能ならば
        - `T`は`totally_orderd`のモデルである
  
- (2) : `const remove_reference_t<T>, const remove_reference_t<U>`の左辺値`t, u`、`C = common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>`について次の条件を満たす場合に限って、型`T, U, Cat`は`three_way_comparable_with`のモデルである
    - `t <=> u`と`u <=> t`が同じ定義域を持つ（それぞれの引数型がその順番によらず同一である）
    - `((t <=> u) <=> 0) == (0 <=> (t <=> u))`が�値
    - `(t <=> u == 0) == bool(t == u)`が`true`であること
    - `(t <=> u != 0) == bool(t != u)`が`true`であること
    - `Cat(t <=> u) == Cat(C(t) <=> C(u))`が`true`であること
    - `(t <=> u < 0) == bool(t < u)`が`true`であること
    - `(t <=> u > 0) == bool(t > u)`が`true`であること
    - `(t <=> u <= 0) == bool(t <= u)`が`true`であること
    - `(t <=> u >= 0) == bool(t >= u)`が`true`であること
    - `Cat`が`strong_ordering`に変換可能ならば
        - `T, U`は`totally_orderd_with`のモデルである

- `partially-ordered-with` : `const remove_reference_t<T>, const remove_reference_t<U>`の左辺値`t, u`について次の条件を満たす場合に限って、型`T, U, Cat`は`partially-ordered-with`のモデルである
    - `t < u, t <= u, t > u, t >= u, u < t, u <= t, u > t, u >= t`が全て同じ定義域を持つ
    - `bool(t < u) == bool(u > t)`が`true`であること
    - `bool(u < t) == bool(t > u)`が`true`であること
    - `bool(t <= u) == bool(u >= t)`が`true`であること
    - `bool(u <= t) == bool(t >= u)`が`true`であること


## 例

### three_way_comparable

```cpp example
#include <iostream>
#include <compare>

//<=>が使用可能ならそれを使用して比較結果を出力
template<std::three_way_comparable T>
void print_is_less(const T& t, const T& u) {
  std::cout << "<=> : " << ((t <=> u) < 0) << std::endl;
}

//<=>が使用可能でないなら<演算�を使用
template<typename T>
void print_is_less(const T& t, const T& u) {
  std::cout << "<   : " << (t < u) << std::endl;
}


//<演算�だけが使用可能
struct L {
  int n;
  friend bool operator<(const L& a, const L& b) { return a.n < b.n;}
};

//<=>演算�含め、全ての比較演算が可能
struct S {
  int n;

  friend auto operator<=>(const S& a, const S& b) = default;
  //friend bool operator== (const S& a, const S& b) = default;
};


int main() {
  std::cout << std::boolalpha;
  L l1{1}, l2{2};
  S s1{1}, s2{2};

  print_is_less(1, 2);
  print_is_less(-0.0, +0.0);
  print_is_less(l1, l2);
  print_is_less(s1, s2);
}
```
* std::three_way_comparable[color ff0000]

#### 出力
```
<=> : true
<=> : false
<   : true
<=> : true
```

### three_way_comparable_with

```cpp example
#include <iostream>
#include <compare>

//<=>が使用可能ならそれを使用して比較結果を出力
template<typename T, typename U>
requires std::three_way_comparable_with<T, U>
void print_is_less(const T& t, const U& u) {
  std::cout << "<=> : " << ((t <=> u) < 0) << std::endl;
}

//<=>が使用可能でないなら<演算�を使用
template<typename T, typename U>
void print_is_less(const T& t, const U& u) {
  std::cout << "<   : " << (t < u) << std::endl;
}

//共通の参照型を作るために必要
struct B {
  friend auto operator<=>(const B&, const B&) = default;
  //friend bool operator== (const B&, const B&) = default;
};

struct S1 : B {
  std::size_t s;

  friend auto operator<=>(const S1&, const S1&) = default;
  //friend bool operator== (const S1&, const S1&) = default;
};

struct S2 : B {
  std::size_t s;

  friend auto operator<=>(const S2&, const S2&) = default;
  friend bool operator== (const S2&, const S2&) = default;  //この宣言は必要

  friend bool operator== (const S1& a, const S2& b) { return a.s ==  b.s;}
  friend auto operator<=>(const S1& a, const S2& b) { return a.s <=> b.s;}
};

//std::common_referenceおよびstd::common_reference_withにアダプトする
namespace std {
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<S1, S2, TQual, UQual> {
    using type = const B&;  //const必須
  };

  //対称性のために引数順を逆にしたものも定義する
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<S2, S1, TQual, UQual> {
    using type = const B&;  //const必須
  };
}


int main() {
  std::cout << std::boolalpha;
  S1 s1{{}, 0u};
  S2 s2{{}, 2u};

  print_is_less(s1, s2);
  print_is_less(s2, s1);
}
```
* std::three_way_comparable_with[color ff0000]
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]

#### 出力
```
<=> : true
<=> : false
```

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
