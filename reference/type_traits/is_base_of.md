#is_base_of
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Base, class Derived>
  struct is_base_of;
}
```

##概要
型`Base`が型`Derived`の基底クラスか調べる。


##要件
`Base`と`Derived`が非共用体のクラスであり、異なる型である場合(cv修飾は無視される)、`Derived`は完全型でなければならない。


##効果
`is_base_of`は、型`Base`が型`Derived`の基底クラス (cv修飾は無視される) である、もしくは2つが同じクラス型ならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
派生時の`private`、`protected`指定は、派生関係の判定に影響しない。


##例
```cpp
#include <type_traits>

struct B {};
struct B1 : B {};
struct B2 : B {};
struct D : private B1, private B2 {};

static_assert(std::is_base_of<B, D>::value == true, "B is base of D");
static_assert(std::is_base_of<B, B>::value == true, "B is base of B");
static_assert(std::is_base_of<D, B>::value == false, "D is not base of B");

// cv修飾は無視される
static_assert(std::is_base_of<const B, const D>::value == true, "B is base of D");

// クラス型ではない
static_assert(std::is_base_of<int, char>::value == false, "int is not base of char");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ?


##参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits]
    - C++11では要件が「`Base`と`Derived`がクラスであり、異なる型である場合(cv修飾は無視される)、`Derived`は完全型でなければならない。」であったが、共用体を意図せず許容していたため、C++14で「`Base`と`Derived`が**非共用体**のクラスであり、異なる型である場合(cv修飾は無視される)、`Derived`は完全型でなければならない。」に変更した。

