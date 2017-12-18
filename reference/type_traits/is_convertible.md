# is_convertible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class From, class To>
  struct is_convertible;

  template <class From, class To>
  constexpr bool is_convertible_v
    = is_convertible<From, To>::value; // C++17
}
```

## 概要
型`From`から型`To`に、暗黙的に変換可能か調べる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_convertible`は、型`From`から型`To`に暗黙的に変換可能であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
return文による型変換、および非explicitなコンストラクタによる型変換は、暗黙的に変換可能であるとみなされる。explicitなコンストラクタによる明示的な型変換は、暗黙的に変換可能であるとは見なされない。


## 例
```cpp example
#include <type_traits>

class A {};
struct B {
  operator A() { return A(); }
};

struct C {
  explicit C(int) {}
};

static_assert(std::is_convertible<int, double>::value == true, "int convertible to double");
static_assert(std::is_convertible<const int, double>::value == true, "const int convertible to double");
static_assert(std::is_convertible<int* const, int*>::value == true, "int* const convertible to int*");

// const_castが必要
static_assert(std::is_convertible<const int*, int*>::value == false, "int const* not convertible to int*");

static_assert(std::is_convertible<const int&, long>::value == true, "const int& convertible to long");
static_assert(std::is_convertible<int, int>::value == true, "int convertible to int");

static_assert(std::is_convertible<B, A>::value == true, "B convertible to A");

// explicitなコンストラクタによる明示的な型変換は、変換可能とみなされない
static_assert(std::is_convertible<int, C>::value == false, "int not convertible to C");

int main() {}
```
* std::is_convertible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
