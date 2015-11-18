#is_trivially_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  struct is_trivially_constructible;
}
```

##概要
型`T`がトリビアルに構築可能か調べる。`T( Args... )` の形式のコンストラクタ呼び出しがトリビアルに可能であるか。


##要件
型`T`および、`Args...`の全ての型は、完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_constructible`は、`T( Args... )`の形式のコンストラクタ呼出しがトリビアルに可能であるならば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。

「トリビアルに構築可能」とは、ユーザー定義されないコンストラクタを持っていることを意味する。


##例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルなコンストラクタを持っている
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

// 組み込み型は全てトリビアルに構築可能
static_assert(
  std::is_trivially_constructible<int, const int&>::value == true,
  "int is trivially constructible");

// トリビアルなコンストラクタを持っている型
static_assert(
  std::is_trivially_constructible<X, const X&>::value == true,
  "X is trivially constructible");

// 非トリビアルなコンストラクタを持っている型
static_assert(
  std::is_trivially_constructible<Y, const Y&>::value == false,
  "Y isn't trivially constructible");

// 非トリビアルなコンストラクタを持つ型を包含する型
static_assert(
  std::is_trivially_constructible<Z, const Z&>::value == false,
  "Z isn't trivially constructible");

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

####備考


