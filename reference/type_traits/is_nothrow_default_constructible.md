# is_nothrow_default_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_default_constructible;

  template <class T>
  inline constexpr bool is_nothrow_default_constructible_v
    = is_nothrow_default_constructible<T>::value;          // C++17
}
```

## 概要
型`T`がデフォルト構築でき、かつそのデフォルトコンストラクタが例外を投げないか調べる


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_default_constructible`は、型`T`が例外を投げない保証のもとにデフォルト構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

[`is_nothrow_constructible`](is_nothrow_constructible.md)`<T>::value == true`の場合に、例外を投げないデフォルト構築が可能であると判�される。


## 例
```cpp example
#include <type_traits>

struct s {
  s() {
    throw 0;
  }
};

struct t {
  t() = delete;
};

static_assert(std::is_nothrow_default_constructible<int>::value == true, "value == true, int is nothrow default constructible");
static_assert(std::is_same<std::is_nothrow_default_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_default_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_nothrow_default_constructible<int>() == true, "is_copy_nothrow default constructible<int>() == true");

static_assert(std::is_nothrow_default_constructible<s>::value == false, "value == false, s is not nothrow default constructible");
static_assert(std::is_same<std::is_nothrow_default_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_default_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_nothrow_default_constructible<s>() == false, "is_copy_nothrow default constructible<s>() == false");

static_assert(std::is_nothrow_default_constructible<unsigned>::value == true, "unsigned is nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<const int>::value == true, "const int is nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<int[1]>::value == true, "int[1] is not nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<void*>::value == true, "void* is nothrow default constructible");

static_assert(std::is_nothrow_default_constructible<t>::value == false, "t is not nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<int&>::value == false, "int& is not nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<int[]>::value == false, "int[] is not nothrow default constructible");
static_assert(std::is_nothrow_default_constructible<void>::value == false, "void is not nothrow default constructible");

int main(){}
```
* std::is_nothrow_default_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.8.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013には、提案時の名前である`has_nothrow_constructor`, `has_nothrow_default_constructor`も�在する。
	- 2012は`void`において、誤って`false_type`になっている。
	- 2013までは`std::is_default_constructible<int[]>`のような要素数の指定がない配列型において、誤って`false_type`になっている。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
