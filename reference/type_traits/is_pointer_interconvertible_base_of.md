# is_pointer_interconvertible_base_of
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Base, class Derived>
  struct is_pointer_interconvertible_base_of;

  template<class Base, class Derived>
  inline constexpr bool is_pointer_interconvertible_base_of_v
    = is_pointer_interconvertible_base_of<Base, Derived>::value;
}
```

## 概要
基底クラス`Base`と派生クラス`Derived`の間でポインタ相互交換可能かを判定する。


## 要件
`Base`と`Derived`が非共用体のクラスであり、異なる型である場合(cv修飾は無視される)、`Derived`は完全型でなければならない。


## 効果
`is_pointer_interconvertible_base_of`は、(cv修飾を無視して)`Derived`が`Base`から曖昧さなく派生しかつ型`Derived`のオブジェクトが`Base`サブオブジェクトとポインタ相互交換可能(pointer-interconvertible)である、もしくは`Base`と`Derived`が非共用体の(cv修飾を無視した)同一クラス型を指すならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

2つオブジェクト`a`, `b`が下記条件のいずれかを満たすとき、ポインタ相互交換可能(pointer-interconvertible)である。

- 両者が同一オブジェクトである。
- 一方が共用体オブジェクトであり、他方が共用体オブジェクトの非静的メンバ変数である。
- 一方が[スタンダードレイアウト](is_standard_layout.md)クラスオブジェクトであり他方が同オブジェクトの先頭の非静的メンバ変数、または同オブジェクトが非静的メンバ変数を持たなければ同オブジェクトの基底クラスサブオブジェクトである。
- `a`とポインタ相互交換可能(pointer-interconvertible)なオブジェクト`c`が存在し、`c`と`b`がポインタ相互交換可能(pointer-interconvertible)である。

2つのオブジェクトがポインタ相互交換可能(pointer-interconvertible)であれば、両者は同一のアドレス値を持ち、`reinterpret_cast`によって一方から他方のポインタへ変換可能である。（配列オブジェクトとその先頭要素は、同一のアドレスを持つにもかかわらずポインタ相互交換可能(pointer-interconvertible)ではない。）


## 例
```cpp example
#include <type_traits>

struct B { int m; };
struct D : B {};

int main()
{
  // スタンダードレイアウト派生クラスDは非静的メンバ変数をもたず、
  // スタンダードレイアウト基底クラスBから曖昧さなく派生しているため、
  // 基底クラスBと派生クラスDはポインタ相互交換可能である。
  static_assert(std::is_pointer_interconvertible_base_of_v<B, D>);
  // 同一クラス同士は(自明に)ポインタ相互交換可能である。
  static_assert(std::is_pointer_interconvertible_base_of_v<D, D>);
}
```
* std::is_pointer_interconvertible_base_of_v[color ff0000]

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
- [`is_pointer_interconvertible_with_class`](is_pointer_interconvertible_with_class.md)


## 参照
- [P0466R5 Layout-compatibility and Pointer-interconvertibility Traits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0466r5.pdf)
