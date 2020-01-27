# is_nothrow_move_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_move_assignable;

  template <class T>
  inline constexpr bool is_nothrow_move_assignable_v
    = is_nothrow_move_assignable<T>::value;          // C++17
}
```

## 概要
型`T`がムーブ代入可能で、かつ代入操作が例外を投げないかを調べる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_move_assignable`は、型`T`が例外を投げない保証のもとにムーブ代入可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、例外を投げないムーブ代入が可能であると見なされる：

- C++11 : [`is_nothrow_assignable`](is_nothrow_assignable.md)`<T&, T&&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_nothrow_assignable`](is_nothrow_assignable.md)`<T&, T&&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型


## 例
```cpp example
#include <type_traits>

// nothrow move assignable
struct A {};

// nothrow move assignable
struct B {
  B& operator=(B&&) noexcept
  { return *this; }
};

// not move assignable
struct C {
  C& operator=(C&&)
  { return *this; }
};

// not nothrow move assignable
struct D {
  D& operator=(D&&) noexcept(false)
  { return *this; }
};

static_assert(
  std::is_nothrow_move_assignable<int>::value == true,
  "int is nothrow move assignable");

static_assert(
  std::is_nothrow_move_assignable<A>::value == true,
  "A is nothrow move assignable");

static_assert(
  std::is_nothrow_move_assignable<B>::value == true,
  "B is nothrow move assignable");

static_assert(
  std::is_nothrow_move_assignable<C>::value == false,
  "C is not nothrow move assignable");

static_assert(
  std::is_nothrow_move_assignable<D>::value == false,
  "D is not nothrow move assignable");

int main() {}
```
* std::is_nothrow_move_assignable[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.3
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013には、提案時の名前である`has_nothrow_move_assign`も�在する。
	- 2012は、`int`などの組込型において、誤って`false_type`になっている。


## 参照
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
