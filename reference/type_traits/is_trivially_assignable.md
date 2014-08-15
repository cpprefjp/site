#is_trivially_assignable (C++11)
```cpp
namespace std {
  template <class T, class U>
  struct is_trivially_assignable;
}
```

##概要
型`T`が型`U`からトリビアルに代入可能か調べる。


##要件
型`T`と型`U`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_assignable`は、型`T`が型`U`からトリビアルに代入可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。  
「トリビアルに代入可能」とは、ユーザー定義されない代入演算子を持っているということを意味する。


##例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルな代入演算子を持っている
};

struct Y {
  // 非トリビアルな代入演算子を持っている
  Y& operator=(const Y&) { return *this; }
};

struct Z {
  // 非トリビアルな代入演算子を持つ型を包含している
  std::string s;

  // Z型は非トリビアルな代入演算子を持つ
};

// 組み込み型は全てトリビアルに代入可能
static_assert(
  std::is_trivially_assignable<int&, const int&>::value == true,
  "int is trivially assignable");

// トリビアルな代入演算子を持っている型
static_assert(
  std::is_trivially_assignable<X&, const X&>::value == true,
  "X is trivially assignable");

// 非トリビアルな代入演算子を持っている型
static_assert(
  std::is_trivially_assignable<Y&, const Y&>::value == false,
  "Y isn't trivially assignable");

// 非トリビアルな代入演算子を持つ型を包含する型
static_assert(
  std::is_trivially_assignable<Z&, const Z&>::value == false,
  "Z isn't trivially assignable");

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
- [GCC, C++0x mode](/implementation.md#gcc): 


