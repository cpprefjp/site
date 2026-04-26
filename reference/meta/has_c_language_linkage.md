# has_c_language_linkage
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_c_language_linkage(info r);
}
```
* info[link info.md]

## 概要
C言語リンケージを持つかを判定する。


## 戻り値
`r`がC言語リンケージ（`extern "C"`）を持つエンティティを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

extern "C" void c_func();
void cpp_func();
extern "C" int c_var;

int main() {
  static_assert(std::meta::has_c_language_linkage(^^c_func));
  static_assert(!std::meta::has_c_language_linkage(^^cpp_func));
  static_assert(std::meta::has_c_language_linkage(^^c_var));
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
