# is_nothrow_convertible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class From, class To>
  struct is_nothrow_convertible;

  template <class From, class To>
  inline constexpr bool is_nothrow_convertible_v
    = is_nothrow_convertible<From, To>::value;
}
```

## 概要
型`From`から型`To`に、例外を投げずに暗黙的に変換可能か調べる。


## 要件
型`From`と型`To`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_convertible`は、型`From`から型`To`に、例外を投げずに暗黙的に変換可能であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
return文による型変換、および非explicitなコンストラクタによる型変換は、暗黙的に変換可能であるとみなされる。explicitなコンストラクタによる明示的な型変換は、暗黙的に変換可能であるとは見なされない。


## 例
```cpp example
#include <type_traits>

class A {};

struct B {
  operator A() noexcept { return A(); }
};

struct C {
  operator A() { return A(); }
};

struct D {
  explicit D(int) noexcept {}
};

// 組み込み型間の暗黙の型変換は、例外送出せずに行える
static_assert(std::is_nothrow_convertible_v<int, double>);
static_assert(std::is_nothrow_convertible_v<const int, double>);
static_assert(std::is_nothrow_convertible_v<int* const, int*>);

// const_castが必要
static_assert(std::is_nothrow_convertible_v<const int*, int*> == false);

static_assert(std::is_nothrow_convertible_v<const int&, long>);
static_assert(std::is_nothrow_convertible_v<int, int>);

static_assert(std::is_nothrow_convertible_v<B, A>);
static_assert(std::is_nothrow_convertible_v<C, A> == false); // 型変換演算子がnoexcept(false)

// explicitなコンストラクタによる明示的な型変換は、変換可能とみなされない
static_assert(std::is_nothrow_convertible_v<int, D> == false);

int main() {}
```
* std::is_nothrow_convertible_v[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0758R1 Implicit conversion traits and utility functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0758r1.html)
