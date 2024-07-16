# is_corresponding_member
* type_traits[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class S1, class S2, class M1, class M2>
  constexpr bool is_corresponding_member(M1 S1::*m1, M2 S2::*m2) noexcept;
}
```

## 概要
2つのメンバポインタが互換な共通位置にあるかを判定する。


## 適格要件
`S1`および`S2`は完全型であること。


## 戻り値
`S1`および`S2`は[スタンダードレイアウト型](is_standard_layout.md)、`M1`および`M2`はオブジェクト型であり、`m1`と`m2`いずれもヌルポインタではなく、`m1`と`m2`が[同一の先頭のメンバの並び(common initial sequence)](is_layout_compatible.md)において対応するメンバ変数へのポインタであるときに限って`true`を返す。それ以外の場合は`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <type_traits>

struct A { int a; };
struct B { int b; };
struct C: A, B {};

int main()
{
  static_assert( std::is_corresponding_member( &A::a, &B::b ));
  static_assert( std::is_corresponding_member<A, B>( &A::a, &B::b ));

  // 見た目に反して &C::a, &C::b はそれぞれ int(A::*), int(B::*) 型を持つため、
  // このケースではS1=A, S2=Bに型推論されて前述例と同様にtrueを返す。
  static_assert( std::is_corresponding_member( &C::a, &C::b ));
  // テンプレートパラメータを明示することでクラスCのメンバ変数に対する検査となる。
  // このケースではCはスタンダードレイアウトクラスではなくfalseを返す。
  static_assert(!std::is_corresponding_member<C, C>( &C::a, &C::b ));
}
```
* std::is_corresponding_member[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`is_layout_compatible`](is_layout_compatible.md)


## 参照
- [P0466R5 Layout-compatibility and Pointer-interconvertibility Traits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0466r5.pdf)
