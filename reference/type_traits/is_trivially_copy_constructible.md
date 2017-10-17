# is_trivially_copy_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivially_copy_constructible;

  template <class T>
  constexpr bool is_trivially_copy_constructible_v
    = is_trivially_copy_constructible<T>::value;   // C++17
}
```

## 概要
型`T`がトリビアルにコピー構築可能か調べる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_trivially_copy_constructible`は、型`T`がトリビアルにコピー構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、トリビアルにコピー構築可能であると見なされる：

- C++11 : [`is_trivially_constructible`](is_trivially_constructible.md)`<T, const T&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_trivially_constructible`](is_trivially_constructible.md)`<T, const T&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型


## 例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルなコピーコンストラクタを持っている
};

struct Y {
  // 非トリビアルなコピーコンストラクタを持っている
  Y(const Y&) {}
};

struct Z {
  // 非トリビアルなコピーコンストラクタを持つ型を包含している
  std::string s;

  // Z型は非トリビアルなコピーコンストラクタを持つ
};

// 組み込み型は全てトリビアルにコピー構築可能
static_assert(
  std::is_trivially_copy_constructible<int>::value == true,
  "int is trivially copy constructible");

// トリビアルなコピーコンストラクタを持っている型
static_assert(
  std::is_trivially_copy_constructible<X>::value == true,
  "X is trivially copy constructible");

// 非トリビアルなコピーコンストラクタを持っている型
static_assert(
  std::is_trivially_copy_constructible<Y>::value == false,
  "Y isn't trivially copy constructible");

// 非トリビアルなコピーコンストラクタを持つ型を包含する型
static_assert(
  std::is_trivially_copy_constructible<Z>::value == false,
  "Z isn't trivially copy constructible");

int main() {}
```
* std::is_trivially_copy_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 参照
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
