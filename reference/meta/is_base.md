# is_base
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_base(info r);
}
```
* info[link info.md]

## 概要
基底クラス関係であるかを判定する。


## 戻り値
`r`が直接基底クラス関係を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Base {};
struct Derived : Base {};

consteval bool check() {
  auto bases = std::meta::bases_of(
      ^^Derived, std::meta::access_context::unchecked());
  return bases.size() == 1 && std::meta::is_base(bases[0]);
}

int main() {
  static_assert(check());
}
```
* std::meta::bases_of[link bases_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

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
