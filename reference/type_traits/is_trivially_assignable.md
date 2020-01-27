# is_trivially_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_trivially_assignable;

  template <class T, class U>
  inline constexpr bool is_trivially_assignable_v
    = is_trivially_assignable<T, U>::value;       // C++17
}
```

## 概要
型`T`が型`U`からトリビアルに代入可能か調べる。


## 要件
型`T`と型`U`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_trivially_assignable`は、型`T`が型`U`からトリビアルに代入可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

「トリビアルに代入可能」とは、ユーザー定義されない代入演算�を持っているということを意味する。


## 例
```cpp example
#include <type_traits>
#include <string>

struct X {
  // トリビアルな代入演算�を持っている
};

struct Y {
  // 非トリビアルな代入演算�を持っている
  Y& operator=(const Y&) { return *this; }
};

struct Z {
  // 非トリビアルな代入演算�を持つ型を包含している
  std::string s;

  // Z型は非トリビアルな代入演算�を持つ
};

// 組み込み型は全てトリビアルに代入可能
static_assert(
  std::is_trivially_assignable<int&, const int&>::value == true,
  "int is trivially assignable");

// トリビアルな代入演算�を持っている型
static_assert(
  std::is_trivially_assignable<X&, const X&>::value == true,
  "X is trivially assignable");

// 非トリビアルな代入演算�を持っている型
static_assert(
  std::is_trivially_assignable<Y&, const Y&>::value == false,
  "Y isn't trivially assignable");

// 非トリビアルな代入演算�を持つ型を包含する型
static_assert(
  std::is_trivially_assignable<Z&, const Z&>::value == false,
  "Z isn't trivially assignable");

int main() {}
```
* std::is_trivially_assignable[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 5.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012は、`is_assignable<T, U>`と同一の実装になっている。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
