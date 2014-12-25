#is_trivially_copyable (C++11)
```cpp
namespace std {
  template <class T>
  struct is_trivially_copyable;
}
```

##概要
型`T`がトリビアルコピー可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_copyable`は、`T`がトリビアルコピー可能な型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。  
「トリビアルコピー可能な型」とは、「`std::memcpy()`可能な型である」と言い換えることもできる。これに分類される型は、以下の全ての条件を満たす必要がある：  

- 非トリビアルなコピーコンストラクタを持っていないこと
- 非トリビアルなムーブコンストラクタを持っていないこと
- 非トリビアルなコピー代入演算子を持っていないこと
- 非トリビアルなムーブ代入演算子を持っていないこと
- トリビアルなデストラクタを持っていること

トリビアル(trivial)な特殊関数(コンストラクタ、代入演算子、デストラクタ)とは、「ユーザー定義されない特殊関数」のことを意味する。


##例
```cpp
#include <type_traits>

struct C1 {
  // トリビアルな特殊関数を持っていない

  // 特殊関数ではないメンバ関数は持っている
  int f(int x) const { return x; }
};

struct C2 {
  // トリビアルな特殊関数(デストラクタ)を持っている
  ~C2() {}
};

// 組み込み型は全てトリビアルコピー可能
static_assert(std::is_trivially_copyable<int>::value == true, "int is trivially copyable");
static_assert(std::is_trivially_copyable<int*>::value == true, "int* is trivially copyable");

// ユーザー定義型は、ユーザー定義の特殊関数を持っていなければトリビアルコピー可能
static_assert(std::is_trivially_copyable<C1>::value == true, "C1 is trivially copyable");
static_assert(std::is_trivially_copyable<C2>::value == false, "C2 isn't trivially copyable");

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

