# has_external_linkage
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_external_linkage(info r);
}
```
* info[link info.md]

## 概要
外部リンケージを持つかを判定する。


## 戻り値
`r`が外部リンケージを持つエンティティを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

int global_var;                  // 外部リンケージ
static int internal_var;         // 内部リンケージ
namespace { int anon_var; }      // 内部リンケージ

int main() {
  static_assert(std::meta::has_external_linkage(^^global_var));
  static_assert(!std::meta::has_external_linkage(^^internal_var));
  static_assert(!std::meta::has_external_linkage(^^anon_var));
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
