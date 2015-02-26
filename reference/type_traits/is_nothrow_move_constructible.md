#is_nothrow_move_constructible (C++11)
* type_traits[meta header]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_move_constructible;
}
```

##概要
型`T`がムーブ構築でき、かつそのムーブコンストラクタが例外を投げないか調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_nothrow_move_constructible`は、型`T`が例外を投げない保証のもとにムーブ構築可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。

[`is_nothrow_constructible`](./is_nothrow_constructible.md)`<T, T&&>::value == true`の時に、ムーブ構築可能かつ例外を投げないと判断される。


##例
```cpp
#include <type_traits>

// nothrow move constructible
struct A {};

// nothrow move constructible
struct B {
  B(B&&) noexcept {}
};

// not nothrow move constructible
struct C {
  C(C&&) {}
};

// not nothrow move constructible
struct D {
  D(D&&) noexcept(false) {}
};

static_assert(
  std::is_nothrow_move_constructible<int>::value == true,
  "int is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<A>::value == true,
  "A is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<B>::value == true,
  "B is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<C>::value == false,
  "C isn't nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<D>::value == false,
  "D isn't nothrow move constructible");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3

