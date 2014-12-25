#is_trivially_move_constructible (C++11)
```cpp
namespace std {
  template <class T>
  struct is_trivially_move_constructible;
}
```

##概要
型`T`がトリビアルにムーブ構築可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_move_constructible`は、型`T`がトリビアルにムーブ構築可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。

[`is_trivially_constructible`](./is_trivially_constructible.md)`<T, T&&>::value == true`ならば、トリビアルにムーブ構築可能であると判断される。


##例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルなムーブコンストラクタを持っている
};

struct Y {
  // 非トリビアルなムーブコンストラクタを持っている
  Y(Y&&) {}
};

struct Z {
  // 非トリビアルなムーブコンストラクタを持つ型を包含している
  std::string s;

  // Z型は非トリビアルなムーブコンストラクタを持つ
};

// 組み込み型は全てトリビアルにムーブ構築可能
static_assert(
  std::is_trivially_move_constructible<int>::value == true,
  "int is trivially move constructible");

// トリビアルなムーブコンストラクタを持っている型
static_assert(
  std::is_trivially_move_constructible<X>::value == true,
  "X is trivially move constructible");

// 非トリビアルなムーブコンストラクタを持っている型
static_assert(
  std::is_trivially_move_constructible<Y>::value == false,
  "Y isn't trivially move constructible");

// 非トリビアルなムーブコンストラクタを持つ型を包含する型
static_assert(
  std::is_trivially_move_constructible<Z>::value == false,
  "Z isn't trivially move constructible");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 5.0

###備考
Clang 3.0から3.2は、上記例の`Y`クラスがトリビアルにムーブ構築可能と判定される。Clang 3.3から修正されている。

