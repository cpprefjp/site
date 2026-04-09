# is_enumerable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_enumerable_type(info r);
}
```
* info[link info.md]

## 概要
型が列挙可能型であるかを判定する。列挙可能型とは、[`enumerators_of()`](enumerators_of.md)で列挙子を取得できる列挙型である。


## 戻り値
`r`が列挙可能な列挙型を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

enum Color { red, green, blue };

int main() {
  static_assert(std::meta::is_enumerable_type(^^Color));
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


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
