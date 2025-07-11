# is_scoped_enum
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_scoped_enum;

  template <class T>
  inline constexpr bool is_scoped_enum_v
    = is_scoped_enum<T>::value;
}
```

## 概要
型`T`がスコープ付きの列挙型か調べる。


## 要件
`is_scoped_enum`は、型`T`がスコープ付きの列挙型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

enum class E1 {};
enum E2 {};

int main() {
  static_assert(std::is_scoped_enum_v<E1>);

  static_assert(!std::is_scoped_enum_v<E2>);
  static_assert(!std::is_scoped_enum_v<int>);
}
```
* std::is_scoped_enum[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 12.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
