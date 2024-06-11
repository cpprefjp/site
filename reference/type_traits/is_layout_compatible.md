# is_layout_compatible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_layout_compatible;

  template <class T, class U>
  inline constexpr bool is_layout_compatible_v
    = is_layout_compatible<T, U>::value;
}
```

## 概要
2つの型`T`, `U`にレイアウト互換があるかを判定する。


## 要件
型`T`および型`U`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_layout_compatible`は、型`T`と型`U`にレイアウト互換性があるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する


2つの型`T0`, `U0`は、トップレベルの`const`/`volatile`修飾を取り除いた型`T1`, `U1`が下記条件のいずれかを満たすとき、レイアウト互換な型(layout-compatible type)となる。

- `T1`と`U1`が同一の型である。
- `T1`と`U1`がレイアウト互換な列挙型(layout-compatible enumerations)である。
    - つまり、2つの列挙型`T1`, `U1`の[基底型](underlying_type.md)が同一の型をもつ。
- `T1`と`U1`が[スタンダードレイアウト](is_standard_layout.md)かつレイアウト互換なクラス(layout-compatible class)である。
    - つまり、2つのスタンダードレイアウトなクラス`T1`, `U1`に含まれる全てのメンバ変数およびビットフィールドが、同一の先頭のメンバの並び(common initial sequence)を構成している。
    - 2つ型の同一の先頭のメンバの並びとは、各クラスにおける非静的メンバ変数およびビットフィールドの宣言順序において、対応するエンティティがレイアウト互換な型であり、両エンティティともに[`no_unique_address`属性](/lang/cpp20/language_support_for_empty_objects.md)の指定有無が同一であり、かつ両エンティティが同一幅ビットフィールドもしくは（ビットフィールドではなく）非静的メンバ変数という条件を満たす、先頭からの最長の並びを指す。


## 例
```cpp example
#include <type_traits>

enum class E0 : int { A, B, C };
enum class E1 : int { X, Y, Z };
enum class E2 : char { A, B, C };

struct X { int a; };
struct Y { const int b; };
struct Z { char c; };
struct X1 { static int s; int m; };

int main()
{
  static_assert(    std::is_layout_compatible_v<int, int>);
  static_assert(not std::is_layout_compatible_v<char, unsigned char>);

  static_assert(    std::is_layout_compatible_v<E0, E1>);
  static_assert(not std::is_layout_compatible_v<E0, E2>);
  static_assert(not std::is_layout_compatible_v<E0, int>);

  static_assert(    std::is_layout_compatible_v<X, Y>);
  static_assert(not std::is_layout_compatible_v<X, Z>);
  static_assert(    std::is_layout_compatible_v<X, X1>);
}
```
* std::is_layout_compatible_v[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`is_corresponding_member`](is_corresponding_member.md)


## 参照
- [P0466R5 Layout-compatibility and Pointer-interconvertibility Traits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0466r5.pdf)
