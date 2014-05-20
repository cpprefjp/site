#is_nothrow_destructible (C++11)
```cpp
namespace std {
  template <class T>
  struct is_nothrow_destructible;
}
```

##概要
型`T`が破棄でき、かつそのデストラクタが例外を投げないか調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_nothrow_destructible`は、型`T`が例外を投げない保証のもとに破棄可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 


##例
```cpp
#include <type_traits>

struct X {
  ~X() {} // noexcept(true)
};

struct Y {
  ~Y() noexcept {}
};

struct Z {
  ~Z() noexcept(false) {}
};

static_assert(
  std::is_nothrow_destructible<int>::value == true,
  "int is nothrow destructible");

static_assert(
  std::is_nothrow_destructible<X>::value == true,
  "X is nothrow destructible");

static_assert(
  std::is_nothrow_destructible<Y>::value == true,
  "Y is nothrow destructible");

static_assert(
  std::is_nothrow_destructible<Z>::value == false,
  "Z isn't nothrow destructible");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.8.1


