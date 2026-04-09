# has_parent
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_parent(info r);
}
```
* info[link info.md]

## 概要
リフレクションが親スコープを持つかどうかを判定する。


## 戻り値
`r`が親スコープを持つ場合は`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <meta>

namespace ns {
  struct S {};
}

int main() {
  static_assert(std::meta::has_parent(^^ns::S));
  static_assert(std::meta::parent_of(^^ns::S) == ^^ns);
}
```
* std::meta::parent_of[link parent_of.md]

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
