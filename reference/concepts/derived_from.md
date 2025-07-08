# derived_from
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Derived, class Base>
  concept derived_from =
    is_base_of_v<Base, Derived> &&
    is_convertible_v<const volatile Derived*, const volatile Base*>;
}
```
* is_base_of_v[link /reference/type_traits/is_base_of.md]
* is_convertible_v[link /reference/type_traits/is_convertible.md]


## 概要

`derived_from`は、型`Derived`が`Base`から派生していることを表すコンセプトである。

## 備考

`derived_from<Derived, Base>`は以下のどちらかの場合にのみ満たすことができる。

- `Base`は`Derived`の曖昧ではない`public`継承されたクラスである
- `Base`と`Derived`はCV修飾の違いを除いて同じクラス型である

`Derived`が`Base`を公開継承しない場合、[`std::is_base_of<Base, Derived>`](/reference/type_traits/is_base_of.md)の判定とは異なる結果となる。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<typename T, typename U>
requires std::derived_from<T, U>
void check_derived() {
  std::cout << "U is base class of T" << std::endl;
}

template<typename T, typename U>
void check_derived() {
  std::cout << "U is not base class of T" << std::endl;
}

struct Base {};

//public継承
struct Derived1 : Base {};
//private継承
struct Derived2 : private Base {};
//protected継承
struct Derived3 : protected Base {};
//曖昧な継承
struct Derived4 : Base, Derived1 {};
//仮想継承
struct Derived5 : virtual public Base {};
struct Derived6 : virtual public Base {};
struct Derived7 : Derived5, Derived6 {};
//継承の継承
struct Derived8 : Derived1 {};

int main()
{
  check_derived<int, int>();
  check_derived<Base, const Base>();
  check_derived<Derived1, Base>();
  check_derived<Derived2, Base>();
  check_derived<Derived3, Base>();
  check_derived<Derived4, Base>();
  check_derived<Derived5, Base>();
  check_derived<Derived7, Base>();
  check_derived<Derived8, Base>();
}
```
* std::derived_from[color ff0000]

### 出力
```
U is not base class of T
U is base class of T
U is base class of T
U is not base class of T
U is not base class of T
U is not base class of T
U is base class of T
U is base class of T
U is base class of T
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
