# is_reflection
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_reflection;

  template <class T>
  inline constexpr bool is_reflection_v = is_reflection<T>::value;
}
```

## 概要
型`T`がリフレクション型（[`std::meta::info`](/reference/meta/info.md)）であるかを判定する。


## 効果
`is_reflection`は、型`T`が[`std::meta::info`](/reference/meta/info.md)（CV修飾を許容する）であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>
#include <meta>

int main() {
  static_assert(std::is_reflection_v<std::meta::info>);
  static_assert(std::is_reflection_v<const std::meta::info>);
  static_assert(!std::is_reflection_v<int>);
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
- [`std::meta::is_reflection_type`](/reference/meta/is_reflection_type.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
