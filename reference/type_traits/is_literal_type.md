# is_literal_type
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_literal_type;

  template <class T>
  inline constexpr bool is_literal_type_v = is_literal_type<T>::value; // C++17
}
```

この機能は、C++17から非推奨となり、C++20で削除された。

## 概要
型`T`がリテラル型か調べる。


## 要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果
`is_literal_type`は、型`T`がリテラル型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

リテラル型とは、以下のいずれかの条件を満たす型である：

- [スカラ型](is_scalar.md)
- リテラル型への参照
- リテラル型の配列
- 以下の全ての特性を持つクラス型
	- [トリビアルなデストラクタを持つ](is_trivially_destructible.md)
	- 全てのコンストラクタが、定数式で初期化できること
	- 集成体であること、もしくは一つ以上の`constexpr`コンストラクタ、もしくはコピー／ムーブコンストラクタ以外のコンストラクタテンプレートを持っていること
	- 全てのデータメンバおよび基底クラスがリテラル型であること
- `void` (C++14から)

リテラル型は、`constexpr`関数のパラメータおよび戻り値の型に対する制約として使用されている。


## 非推奨・削除の詳細
この型特性は、ジェネリックコードにおいて特定の型が`constexpr`に振る舞えるかを判定する機能を持つが、ユーザー定義型の場合には「少なくとも一つ以上の`constexpr`コンストラクタを持つこと」という条件になっていた。しかし、いずれかのコンストラクタが`constexpr`で、それ以外が`constexpr`コンストラクタではなく、それに意味がある場合に、この型特性は使いにくかった。

実際に必要となるのは、特定の型が`constexpr`に振る舞えるかではなく、特定の構築処理で定数初期化ができるかであるため、リテラル型という考え方は廃�すべきである、という結論になった。


## 例
```cpp example
#include <type_traits>

struct X {
  int value;

  constexpr X(int value)
    : value(value) {}
};

static_assert(std::is_literal_type<int>::value, "int is literal type");
static_assert(std::is_literal_type<void>::value, "void is literal type");
static_assert(std::is_literal_type<X>::value, "X is literal type");

int main() {}
```
* std::is_literal_type[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013は、C++11の定義に基づく実装となっている。すなわち、テンプレート実引数として`void`を渡すと`std::false_type`からの派生になる。

### 備考
Clang 3.0では、上記サンプルにおける`X`型が、リテラル型と見なされない。この問題は、Clang 3.1で修�されている。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
