# is_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_assignable;

  template <class T, class U>
  inline constexpr bool is_assignable_v
    = is_assignable<T, U>::value;       // C++17
}
```

## 概要
型`T`が型`U`から代入可能か調べる


## 要件
型`T`と型`U`は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_assignable`は、型`T`が型`U`から代入可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

[`declval`](/reference/utility/declval.md)`<T>() =` [`declval`](/reference/utility/declval.md)`<U>()`という実際には評価されない式が適格ならば代入可能であると判�される。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_assignable<int&, int>::value == true, "value == true, int is assignable");
static_assert(std::is_same<std::is_assignable<int&, int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_assignable<int&, int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_assignable<int&, int>() == true, "is_assignable<int>() == true");

static_assert(std::is_assignable<const int&, int>::value == false, "value == false, s is not assignable");
static_assert(std::is_same<std::is_assignable<const int&, int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_assignable<const int&, int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_assignable<const int&, int>() == false, "is_assignable<s>() == false");

static_assert(std::is_assignable<int&, double>::value == true, "int& is assignable from double");
static_assert(std::is_assignable<int&, int&>::value == true, "int& is assignable from int&");
static_assert(std::is_assignable<int&, int&&>::value == true, "int& is assignable from int&&");
static_assert(std::is_assignable<int&, const int>::value == true, "int& is assignable from const int");
static_assert(std::is_assignable<int&, volatile int>::value == true, "int& is assignable from volatile int");

static_assert(std::is_assignable<int, int>::value == false, "int is not assignable from int");
static_assert(std::is_assignable<int, int&>::value == false, "int is not assignable from int&");
static_assert(std::is_assignable<int, int&&>::value == false, "int is not assignable from int&&");
static_assert(std::is_assignable<int&&, int>::value == false, "int&& is not assignable from int");
static_assert(std::is_assignable<int&&, int&>::value == false, "int&& is not assignable from int&");
static_assert(std::is_assignable<int&&, int&&>::value == false, "int&& is not assignable from int&&");

int main(){}
```
* std::is_assignable[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.7.0


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
