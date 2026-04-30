# has_linkage
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_linkage(info r);
}
```
* info[link info.md]

## 概要
リンケージを持つかを判定する。


## 戻り値
`r`がなんらかのリンケージを持つエンティティを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

int global_var;                  // 外部リンケージ
static int internal_var;         // 内部リンケージ

int main() {
  int local_var;                 // リンケージなし
  static_assert(std::meta::has_linkage(^^global_var));
  static_assert(std::meta::has_linkage(^^internal_var));
  static_assert(!std::meta::has_linkage(^^local_var));
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
