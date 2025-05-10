# is_implicit_lifetime
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_implicit_lifetime;

  template <class T>
  inline constexpr bool is_implicit_lifetime_v = is_implicit_lifetime<T>::value;
}
```

## 概要
型`T`が暗黙的に構築されるかを調べる。

暗黙的な構築はC++20で取り入れられた仕様であり、次のいずれかに該当する型であれば暗黙的に構築される

1. [スカラ型](/reference/type_traits/is_scalar.md)
2. 配列型
    - 要素型は問わない
3. *implicit-lifetime class types*
    - デストラクタがユーザー定義されていない集成体型、もしくは
    - 少なくとも1つの資格のあるトリビアルコンストラクタと、トリビアルで削除されていないデストラクタを持つ型
4. 1~3のCV修飾された型


## 要件
型`T`は配列型、完全型、または`void`でなければならない。


## 効果
`is_implicit_lifetime`は、型`T`が暗黙的に構築されるのであれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>
#include <utility>

enum Enum {};
class Class {};
class NotTrivial {
public:
    ~NotTrivial() {}
};

int main() {
    int i_array[1];
    NotTrivial nt_array[1];
    
    static_assert(std::is_implicit_lifetime<int>());
    static_assert(std::is_implicit_lifetime<int*>());
    static_assert(std::is_implicit_lifetime<decltype(i_array)>());
    static_assert(std::is_implicit_lifetime<Enum>());
    static_assert(std::is_implicit_lifetime<Class>());
    static_assert(!std::is_implicit_lifetime<NotTrivial>());
    static_assert(std::is_implicit_lifetime<decltype(nt_array)>());
    static_assert(std::is_implicit_lifetime<std::pair<int, int>>());
    static_assert(!std::is_implicit_lifetime<std::pair<int, NotTrivial>>());
}
```
* std::is_implicit_lifetime[color ff0000]
* std::pair[link /reference/utility/pair.md]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2674R0 A trait for implicit lifetime types](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2674r0.pdf)
