# is_nothrow_copy_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_copy_assignable;
}
```

## 概要
型`T`がコピー代入可能で、かつ代入操作が例外を投げないかを調べる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_copy_assignable`は、型`T`が例外を投げない保証のもとにコピー代入可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、例外を投げないコピー代入が可能であると見なされる：

- C++11 : [`is_nothrow_assignable`](is_nothrow_assignable.md)`<T&, const T&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_nothrow_assignable`](is_nothrow_assignable.md)`<T&, const T&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型


## 例
```cpp
#include <type_traits>

// nothrow copy assignable
struct A {};

// nothrow copy assignable
struct B {
  B& operator=(const B&) noexcept
  { return *this; }
};

// not copy assignable
struct C {
  C& operator=(const C&)
  { return *this; }
};

// not nothrow copy assignable
struct D {
  D& operator=(const D&) noexcept(false)
  { return *this; }
};

static_assert(
  std::is_nothrow_copy_assignable<int>::value == true,
  "int is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<A>::value == true,
  "A is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<B>::value == true,
  "B is nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<C>::value == false,
  "C is not nothrow copy assignable");

static_assert(
  std::is_nothrow_copy_assignable<D>::value == false,
  "D is not nothrow copy assignable");

int main() {}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
	- 11.0～12.0には、提案時の名前である`has_nothrow_assign`, `has_nothrow_copy_assign`も存在する。


## 参照
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。

