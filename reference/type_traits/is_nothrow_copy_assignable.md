#is_nothrow_copy_assignable (C++11)
* type_traits[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_copy_assignable;
}
```

##概要
型`T`がコピー代入可能で、かつ代入操作が例外を投げないかを調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_nothrow_copy_assignable`は、型`T`が例外を投げない保証のもとにコピー代入可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 
[`is_nothrow_assignable`](./is_nothrow_assignable.md)`<T&, const T&>::value == true`ならば、例外を投げないコピー代入が可能であると判断される。


##例
```cpp
#include <type_traits>

// nothrow copy assignable
struct A {};

// nothrow copy assignable
struct B {
  B& operator=(const B&) noexcept
  { return *this; }
};

// not copy assignable
struct C {
  C& operator=(const C&)
  { return *this; }
};

// not nothrow copy assignable
struct D {
  D& operator=(const D&) noexcept(false)
  { return *this; }
};

static_assert(
  std::is_nothrow_copy_assignable<int>::value == true,
  "int is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<A>::value == true,
  "A is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<B>::value == true,
  "B is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<C>::value == false,
  "C is not nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<D>::value == false,
  "D is not nothrow copy assignable");

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

