#is_trivially_copyable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivially_copyable;
}
```

##概要
型`T`がトリビアルコピー可能か調べる。


##要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


##効果
`is_trivially_copyable`は、`T`がトリビアルコピー可能な型であるならば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。  
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
  // 非トリビアルな特殊関数を持っていない

  // 特殊関数ではないメンバ関数は持っている
  int f(int x) const { return x; }
};

struct C2 {
  // 非トリビアルな特殊関数(デストラクタ)を持っている
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
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
	- 11.0～12.0は、正しく実装されていない。`is_trivially_copy_constructible<T, U>`と同一の実装になっている。


##参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。

