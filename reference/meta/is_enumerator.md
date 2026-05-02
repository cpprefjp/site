# is_enumerator
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_enumerator(info r);
}
```
* info[link info.md]

## 概要
列挙子であるかを判定する。


## 戻り値
`r`が列挙子を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

enum Color { red, green, blue };

int main() {
  static_assert(std::meta::is_enumerator(^^Color::red));
  static_assert(!std::meta::is_enumerator(^^Color));
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
