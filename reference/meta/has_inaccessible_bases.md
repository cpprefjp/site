# has_inaccessible_bases
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_inaccessible_bases(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスにアクセス不可能な基底クラスがあるかを判定する。


## 戻り値
指定したアクセスコンテキストでアクセスできない基底クラスが存在する場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Base1 {};
struct Base2 {};

// Base1はprivate継承、Base2はpublic継承
class Derived : private Base1, public Base2 {};

// すべての基底クラスがpublic
class PublicDerived : public Base1, public Base2 {};

int main() {
  constexpr auto ctx = std::meta::access_context::unprivileged();

  // Derivedにはprivate基底Base1があるため、外部からはアクセス不可
  static_assert(std::meta::has_inaccessible_bases(^^Derived, ctx));

  // PublicDerivedはすべての基底クラスがpublic
  static_assert(!std::meta::has_inaccessible_bases(^^PublicDerived, ctx));
}
```
* std::meta::has_inaccessible_bases[color ff0000]
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
