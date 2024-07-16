# is_pointer_interconvertible_with_class
* type_traits[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class S, class M>
  constexpr bool is_pointer_interconvertible_with_class(M S::*m) noexcept;
}
```

## 概要
メンバポインタ`m`がクラス`S`のポインタの間でポインタ相互交換可能かを判定する。


## 適格要件
`S`は完全型であること。


## 戻り値
`S`は[スタンダードレイアウト型](is_standard_layout.md)、`M`はオブジェクト型であり、`m`はヌルポインタではなく、型`S`のオブジェクト`s`がサブオブジェクト`s.*m`と[ポインタ相互交換可能](is_pointer_interconvertible_base_of.md)であるときに限って`true`を返す。それ以外の場合は`false`を返す。


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
  static_assert( std::is_pointer_interconvertible_with_class<A>( &A::a ));
  static_assert( std::is_pointer_interconvertible_with_class<B>( &B::b ));

  // 見た目に反して &C::b は int(B::*) 型を持つためS=Bに型推論されてしまう。
  static_assert( std::is_pointer_interconvertible_with_class( &C::b ));
  // テンプレートパラメータS=Cを明示することで M(C::*) の検査となる。
  // このケースではCはスタンダードレイアウトクラスではなくfalseとなる。
  static_assert(!std::is_pointer_interconvertible_with_class<C>( &C::b ));
}
```
* std::is_pointer_interconvertible_with_class[color ff0000]

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
- [`is_pointer_interconvertible_base_of`](is_pointer_interconvertible_base_of.md)


## 参照
- [P0466R5 Layout-compatibility and Pointer-interconvertibility Traits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0466r5.pdf)
