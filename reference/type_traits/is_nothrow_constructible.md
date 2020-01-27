# is_nothrow_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  struct is_nothrow_constructible;

  template <class T, class... Args>
  inline constexpr bool is_nothrow_constructible_v
    = is_nothrow_constructible<T, Args...>::value; // C++17
}
```

## 概要
型`T`のコンストラクタ呼出しが適格であり、かつそのコンストラクタが例外を投げないか調べる。 
`T( Args... )`の形式のコンストラクタ呼出しが適格かつ例外を投げないか。


## 要件
型`T`およびパラメータパック`Args...`のすべての型は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_constructible`は、型`T`が例外を投げない保証のもとに構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

[`is_constructible`](is_constructible.md)`<T, Args...>::value == true`かつ、いかなる例外を投げないならば、例外を投げない構築が可能であると判�される。


## 例
```cpp example
#include <type_traits>
#include <exception>

static_assert(std::is_nothrow_constructible<int>::value == true, "value == true, ctor int() is nothrow constructible");
static_assert(std::is_same<std::is_nothrow_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_nothrow_constructible<int>() == true, "is_nothrow_constructible<int>() == true");

static_assert(std::is_nothrow_constructible<int&>::value == false, "value == false, ctor int&() is not nothrow constructible");
static_assert(std::is_same<std::is_nothrow_constructible<int&>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_constructible<int&>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_nothrow_constructible<int&>() == false, "is_nothrow_constructible<int&>() == false");

static_assert(std::is_nothrow_constructible<int, int>::value == true, "ctor int(int) is nothrow constructible");
static_assert(std::is_nothrow_constructible<int&, int&>::value == true, "ctor int&(int&) is nothrow constructible");
static_assert(std::is_nothrow_constructible<int[1]>::value == true, "ctor int[1]() is nothrow constructible");
static_assert(std::is_nothrow_constructible<std::exception>::value == true, "ctor exceptiion() is nothrow constructible");

static_assert(std::is_nothrow_constructible<int, int, int>::value == false, "ctor int(int, int) is not nothrow constructible");
static_assert(std::is_nothrow_constructible<int&, int>::value == false, "ctor int&(int) is not nothrow constructible");
static_assert(std::is_nothrow_constructible<int[]>::value == false, "ctor int[]() is not nothrow constructible");
static_assert(std::is_nothrow_constructible<void>::value == false, "ctor void() is not nothrow constructible");

int main(){}
```
* std::is_nothrow_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.7.0, 4.8.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012は、可変引数テンプレートに対応していないため、不完全な実装である。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
