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
型が列挙可能型であるかを判定する。

列挙可能型とは、次のいずれかを満たす型である：

- クラス型であり、完全型である
- 列挙型であり、その宣言に到達可能である（[`enumerators_of()`](enumerators_of.md)で列挙子を取得できる）
    - ただし、その列挙型の宣言内では列挙可能型にならない


## 戻り値
`r`が列挙可能型を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

enum class Color;
static_assert(!std::meta::is_enumerable_type(^^Color));
enum class Color { red, green, blue };
static_assert( std::meta::is_enumerable_type(^^Color));

class S {};
static_assert( std::meta::is_enumerable_type(^^S));  // 完全なクラス型も列挙可能型

enum class E {
  FALSE, TRUE,
  A = std::meta::is_enumerable_type(^^E) ? TRUE : FALSE
};
static_assert(E::A == E::FALSE);  // 列挙型自身の宣言内では、列挙可能型にならない

int main() {}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
