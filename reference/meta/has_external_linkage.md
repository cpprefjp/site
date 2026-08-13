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
`r`が、その名前が外部リンケージを持つ変数・関数・型・テンプレート・名前空間を表す場合に`true`を返す。そうでなければ`false`を返す。


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
- [GCC](/implementation.md#gcc): [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4433. Incorrect query for C language linkage](https://cplusplus.github.io/LWG/issue4433)
    - C++26で、判定対象が「C言語外部リンケージ」ではなく「外部リンケージ」であることが明確化された（`has_c_language_linkage`の修正に伴うドライブバイ修正）
