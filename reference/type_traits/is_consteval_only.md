# is_consteval_only
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_consteval_only;

  template <class T>
  inline constexpr bool is_consteval_only_v = is_consteval_only<T>::value;
}
```

## 概要
型`T`がconsteval-only型であるかを判定する。

consteval-only型とは、コンパイル時にのみ存在でき、実行時には存在できない型である。[`std::meta::info`](/reference/meta/info.md)やそれを含む複合型が該当する。


## 要件
`remove_all_extents_t<T>`が完全型であるか、CV修飾された`void`であること。


## 効果
`is_consteval_only`は、型`T`がconsteval-only型であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>
#include <meta>

struct S {
  std::meta::info r;  // consteval-only型のメンバを持つ
};

int main() {
  static_assert(std::is_consteval_only_v<std::meta::info>);
  static_assert(std::is_consteval_only_v<S>);
  static_assert(!std::is_consteval_only_v<int>);
}
```

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 静的リフレクション](/lang/cpp26/reflection.md)
- [`std::meta::info`](/reference/meta/info.md)
- [`is_reflection`](is_reflection.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
