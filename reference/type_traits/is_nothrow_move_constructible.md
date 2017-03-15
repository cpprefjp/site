# is_nothrow_move_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_move_constructible;
}
```

## 概要
型`T`がムーブ構築でき、かつそのムーブコンストラクタが例外を投げないか調べる。

これを使用することにより、特定の条件を満たすことで、例外を投げない強い保証をする関数・クラスを実装できる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_move_constructible`は、型`T`が例外を投げない保証のもとにムーブ構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、例外を投げないムーブ構築が可能であると見なされる：

- C++11 : [`is_nothrow_constructible`](is_nothrow_constructible.md)`<T, T&&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_nothrow_constructible`](is_nothrow_constructible.md)`<T, T&&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型


## 例
```cpp
#include <type_traits>

// nothrow move constructible
struct A {};

// nothrow move constructible
struct B {
  B(B&&) noexcept {}
};

// not nothrow move constructible
struct C {
  C(C&&) {}
};

// not nothrow move constructible
struct D {
  D(D&&) noexcept(false) {}
};

static_assert(
  std::is_nothrow_move_constructible<int>::value == true,
  "int is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<A>::value == true,
  "A is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<B>::value == true,
  "B is nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<C>::value == false,
  "C isn't nothrow move constructible");

static_assert(
  std::is_nothrow_move_constructible<D>::value == false,
  "D isn't nothrow move constructible");

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
	- 11.0は、すべてのクラス型において`true_type`になるかのような挙動を示した。上記例のクラス`C`の場合に、`true_type`となった。


## 関連項目
- [move_if_noexcept](/reference/utility/move_if_noexcept.md)


## 参照
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。

