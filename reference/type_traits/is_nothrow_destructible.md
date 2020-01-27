# is_nothrow_destructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_destructible;

  template <class T>
  inline constexpr bool is_nothrow_destructible_v
    = is_nothrow_destructible<T>::value;          // C++17
}
```

## 概要
型`T`が破棄でき、かつそのデストラクタが例外を投げないか調べる


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_destructible`は、型`T`が例外を投げない保証のもとに破棄可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
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
* std::is_nothrow_destructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.8.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012は、�しく実装されていない。常に`true_type`になっている。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
