#is_trivially_copy_assignable (C++11)
```cpp
namespace std {
  template <class T>
  struct is_trivially_copy_assignable;
}
```

##概要
型`T`がトリビアルにコピー代入可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_copy_assignable`は、型`T`がトリビアルにコピー代入可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。  
[`is_trivially_assignable`](./is_trivially_assignable.md)`<T&, const T&>::value == true`ならば、トリビアルにコピー代入可能であると判断される。


##例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルなコピー代入演算子を持っている
};

struct Y {
  // 非トリビアルなコピー代入演算子を持っている
  Y& operator=(const Y&) { return *this; }
};

struct Z {
  // 非トリビアルなコピー代入演算子を持つ型を包含している
  std::string s;

  // Z型は非トリビアルなコピー代入演算子を持つ
};

// 組み込み型は全てトリビアルにコピー代入可能
static_assert(
  std::is_trivially_copy_assignable<int>::value == true,
  "int is trivially copy assignable");

// トリビアルなコピー代入演算子を持っている型
static_assert(
  std::is_trivially_copy_assignable<X>::value == true,
  "X is trivially copy assignable");

// 非トリビアルなコピー代入演算子を持っている型
static_assert(
  std::is_trivially_copy_assignable<Y>::value == false,
  "Y isn't trivially copy assignable");

// 非トリビアルなコピー代入演算子を持つ型を包含する型
static_assert(
  std::is_trivially_copy_assignable<Z>::value == false,
  "Z isn't trivially copy assignable");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 


