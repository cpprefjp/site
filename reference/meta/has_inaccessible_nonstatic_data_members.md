# has_inaccessible_nonstatic_data_members
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_inaccessible_nonstatic_data_members(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスにアクセス不可能な非静的データメンバがあるかを判定する。


## 戻り値
指定したアクセスコンテキストでアクセスできない非静的データメンバが存在する場合に`true`を返す。


## 例
```cpp example
#include <meta>

class C {
  int secret;
public:
  int visible;
};

int main() {
  constexpr auto ctx = std::meta::access_context::unprivileged();
  static_assert(std::meta::has_inaccessible_nonstatic_data_members(^^C, ctx));
}
```
* std::meta::access_context[link access_context.md]
* unprivileged[link access_context/unprivileged.md]

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
