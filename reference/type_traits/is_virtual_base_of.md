# is_virtualbase_of
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class Base, class Derived>
  struct is_virtual_base_of;

  template <class Base, class Derived>
  inline constexpr bool is_virtual_base_of_v = is_virtual_base_of<Base, Derived>::value;
}
```

## 概要
型`Base`が型`Derived`の仮想基底クラスか調べる。


## 要件
`Base`と`Derived`が非共用体のクラスであり、異なる型である場合(cv修飾は無視される)、`Derived`は完全型でなければならない。


## 効果
`is_virtual_base_of`は、型`Base`が型`Derived`の仮想基底クラス (cv修飾は無視される) であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
派生時の`private`、`protected`指定は、派生関係の判定に影響しない。


## 例
```cpp example
#include <type_traits>

struct B {};
struct B1 : virtual public B {};
struct B2 : virtual public B {};
struct D : public B1, public B2 {};

static_assert(std::is_virtual_base_of_v<B, D> == true);
static_assert(std::is_virtual_base_of_v<B, B1> == true);
static_assert(std::is_virtual_base_of_v<B, B2> == true);

// cv修飾は無視される
static_assert(std::is_virtual_base_of_v<const B, const D> == true);

// クラス型ではない
static_assert(std::is_virtual_base_of_v<int, char> == false);

int main() {}
```
* std::is_virtual_base_of[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21.0 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 参照
- [P2985R0 A type trait for detecting virtual base classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2985r0.html)
