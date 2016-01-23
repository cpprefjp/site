#is_trivially_move_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivially_move_assignable;
}
```

##概要
型`T`がトリビアルにムーブ代入可能か調べる。


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_trivially_move_assignable`は、型`T`がトリビアルにムーブ代入可能であるならば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。

以下の条件が`true`である場合に、トリビアルにムーブ代入可能であると見なされる：

- C++11 : [`is_trivially_assignable`](is_trivially_assignable.md)`<T&, T&&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_trivially_assignable`](is_trivially_assignable.md)`<T&, T&&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型

##例
```cpp
#include <type_traits>
#include <string>

struct X {
  // トリビアルなムーブ代入演算子を持っている
};

struct Y {
  // 非トリビアルなムーブ代入演算子を持っている
  Y& operator=(Y&&) { return *this; }
};

struct Z {
  // 非トリビアルなムーブ代入演算子を持つ型を包含している
  std::string s;

  // Z型は非トリビアルなムーブ代入演算子を持つ
};

// 組み込み型は全てトリビアルにムーブ代入可能
static_assert(
  std::is_trivially_move_assignable<int>::value == true,
  "int is trivially move assignable");

// トリビアルなムーブ代入演算子を持っている型
static_assert(
  std::is_trivially_move_assignable<X>::value == true,
  "X is trivially move assignable");

// 非トリビアルなムーブ代入演算子を持っている型
static_assert(
  std::is_trivially_move_assignable<Y>::value == false,
  "Y isn't trivially move assignable");

// 非トリビアルなムーブ代入演算子を持つ型を包含する型
static_assert(
  std::is_trivially_move_assignable<Z>::value == false,
  "Z isn't trivially move assignable");

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
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0

###備考
Clang 3.0から3.2は、上記例の`Y`クラスがトリビアルにムーブ代入可能と判定される。Clang 3.3から修正されている。


##参照
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。

