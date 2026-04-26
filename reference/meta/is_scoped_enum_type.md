# is_scoped_enum_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_scoped_enum_type(info type);
}
```
* info[link info.md]

## 概要
スコープ付き列挙型であるかを判定する。


## 戻り値
`type`がスコープ付き列挙型（`enum class`）を表す場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

enum class ScopedEnum { a };
enum UnscopedEnum { b };

int main() {
  static_assert(std::meta::is_scoped_enum_type(^^ScopedEnum));
  static_assert(!std::meta::is_scoped_enum_type(^^UnscopedEnum));
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
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_scoped_enum`](/reference/type_traits/is_scoped_enum.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
