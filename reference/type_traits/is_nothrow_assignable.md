#is_nothrow_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_nothrow_assignable;
}
```

##概要
型`T`が型`U`から代入可能で、かつ代入操作が例外を投げないかを調べる。


##要件
型`T`および型`U`が完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_nothrow_assignable`は、型`T`が型`U`から例外を投げない保証のもとに代入可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 
[`is_assignable`](./is_assignable.md)`<T, U>::value == true`かつ、いかなる例外を投げないならば、例外を投げない代入が可能であると判断される。


##例
```cpp
#include <type_traits>

struct X {
  X& operator=(const X&) noexcept
  { return *this; }

  X& operator=(X&&) noexcept
  { return *this; }
};

static_assert(
  std::is_nothrow_assignable<int&, int>::value == true,
  "int is nothrow assignable");

static_assert(
  std::is_nothrow_assignable<X&, const X&>::value == true,
  "X is nothrow copy assignable");

static_assert(
  std::is_nothrow_assignable<X&, X&&>::value == true,
  "X is nothrow move assignable");

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

