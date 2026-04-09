# is_nonstatic_data_member
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_nonstatic_data_member(info r);
}
```
* info[link info.md]

## 概要
非静的データメンバであるかを判定する。


## 戻り値
`r`が非静的データメンバを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  int x;
  static int y;
};

int main() {
  static_assert(std::meta::is_nonstatic_data_member(^^S::x));
  static_assert(!std::meta::is_nonstatic_data_member(^^S::y));
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
