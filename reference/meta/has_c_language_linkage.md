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
`r`が、C言語リンケージ（`extern "C"`）を持つ変数・関数・関数型を表す場合に`true`を返す。そうでなければ`false`を返す。


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
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4433. Incorrect query for C language linkage](https://cplusplus.github.io/LWG/issue4433)
    - C++26で、言語リンケージは名前ではなく変数・関数・関数型の性質であることを踏まえ、この関数が変数・関数・関数型を対象とすることが明確化された
