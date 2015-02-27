#is_standard_layout (C++11)
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  struct is_standard_layout;
}
```

##概要
型`T`がスタンダードレイアウト型か調べる。


##要件
型[`remove_all_extents`](./remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


##効果
`is_standard_layout`は、型`T`がスタンダードレイアウト型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。

スタンダードレイアウト型は、以下の全てを満たす型を指す：

- 非スタンダードレイアウト型の非静的データメンバもしくは参照を持たない
- 仮想関数を持たず、仮想基本クラスを持たない
- 非スタンダードレイアウト型の基本クラスを持たない
- 最派生クラスに非静的データメンバを持つ場合、基底クラスに非静的データメンバを持たない
- 最初の非静的データメンバと同じ基本クラスを持たない


##備考
スタンダードレイアウト型と[トリビアル型](./is_trivial.md)の、両方の条件を満たす型を「[POD型](./is_pod.md)」という。  
この型分類は、C++11で行われたPOD型の細分化によって導入されたものである。


##例
```cpp
#include <type_traits>

struct X {
  int n;
  char c;
};

// 組み込み型は全てスタンダードレイアウト型
static_assert(
  std::is_standard_layout<int>::value == true,
  "int is standard-layout type");

// スタンダードレイアウト型のデータメンバのみを
// 持つ型はスタンダードレイアウト型
static_assert(
  std::is_standard_layout<X>::value == true,
  "X is standard-layout type");

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
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.4


##関連項目
- [`is_pod`](./is_pod.md)


##参照
- [POD再考](http://faithandbrave.hateblo.jp/entry/20081127/1227777378)
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](./remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。

