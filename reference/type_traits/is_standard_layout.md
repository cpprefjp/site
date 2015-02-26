#is_standard_layout (C++11)
* type_traits[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  struct is_standard_layout;
}
```

##概要
型`T`がスタンダードレイアウト型か調べる。


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


##参照
- [`is_pod`](./is_pod.md)
- [POD再考](http://faithandbrave.hateblo.jp/entry/20081127/1227777378)

