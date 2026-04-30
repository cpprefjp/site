# is_public
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_public(info r);
}
```
* info[link info.md]

## 概要
`public`アクセスであるかを判定する。


## 戻り値
`r`がクラスメンバまたは基底クラス関係を表し、かつ`public`アクセスである場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  int pub;
protected:
  int prot;
private:
  int priv;
};

consteval bool check() {
  auto members = std::meta::nonstatic_data_members_of(
      ^^S, std::meta::access_context::unchecked());
  return std::meta::is_public(members[0])
      && std::meta::is_protected(members[1])
      && std::meta::is_private(members[2]);
}

int main() {
  static_assert(check());
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::is_protected[link is_protected.md]
* std::meta::is_private[link is_private.md]
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
