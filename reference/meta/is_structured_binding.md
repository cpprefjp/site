# is_structured_binding
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_structured_binding(info r);
}
```
* info[link info.md]

## 概要
構造化束縛であるかを判定する。


## 戻り値
`r`が構造化束縛を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <utility>

int main() {
  auto [a, b] = std::pair{1, 2};
  static_assert(std::meta::is_structured_binding(^^a));
  static_assert(std::meta::is_structured_binding(^^b));
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
