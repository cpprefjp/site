#is_trivially_copy_constructible (C++11)
* type_traits[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  struct is_trivially_copy_constructible;
}
```

##概要
型`T`がトリビアルにコピー構築可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_copy_constructible`は、型`T`がトリビアルにコピー構築可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。

[`is_trivially_constructible`](./is_trivially_constructible.md)`<T, const T&>::value == true`ならば、トリビアルにコピー構築可能であると判断される。


##例
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.0

