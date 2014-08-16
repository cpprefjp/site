#is_convertible (C++11)
```cpp
namespace std {
  template <class From, class To>
  struct is_convertible;
}
```

##概要
型`From`から型`To`に変換可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_convertible`は、型`From`から型`To`に変換可能であれば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

class A {};
struct B {
  operator A() { return A(); }
};

static_assert(std::is_convertible<int, double>::value == true, "int convertible to double");
static_assert(std::is_convertible<const int, double>::value == true, "const int convertible to double");
static_assert(std::is_convertible<int* const, int*>::value == true, "int* const convertible to int*");

// const_castが必要
static_assert(std::is_convertible<const int*, int*>::value == false, "int const* not convertible to int*");

static_assert(std::is_convertible<const int&, long>::value == true, "const int& convertible to long");
static_assert(std::is_convertible<int, int>::value == true, "int convertible to int");

static_assert(std::is_convertible<B, A>::value == true, "B convertible to A");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ?



