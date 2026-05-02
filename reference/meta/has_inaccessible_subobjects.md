# has_inaccessible_subobjects
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_inaccessible_subobjects(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスにアクセス不可能なサブオブジェクト（基底クラスまたはメンバ変数）があるかを判定する。

[`has_inaccessible_bases`](has_inaccessible_bases.md)と[`has_inaccessible_nonstatic_data_members`](has_inaccessible_nonstatic_data_members.md)を合わせたもので、指定したアクセスコンテキストでアクセスできない基底クラスまたはメンバ変数のいずれかが存在するかを判定する。


## 効果
以下と等価：

```cpp
return has_inaccessible_bases(r, ctx)
    || has_inaccessible_nonstatic_data_members(r, ctx);
```
* has_inaccessible_bases[link has_inaccessible_bases.md]
* has_inaccessible_nonstatic_data_members[link has_inaccessible_nonstatic_data_members.md]


## 戻り値
指定したアクセスコンテキストでアクセスできない基底クラスまたはメンバ変数が存在する場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Base {};

class Derived : private Base {
  int secret;
public:
  int visible;
};

class CleanDerived : public Base {
public:
  int x;
  int y;
};

int main() {
  constexpr auto ctx = std::meta::access_context::unprivileged();

  // Derivedはprivate基底Baseとprivateメンバsecretがあるためtrue
  static_assert(std::meta::has_inaccessible_subobjects(^^Derived, ctx));

  // CleanDerivedはすべてpublic
  static_assert(!std::meta::has_inaccessible_subobjects(^^CleanDerived, ctx));
}
```
* std::meta::has_inaccessible_subobjects[color ff0000]
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


## 関連項目
- [`has_inaccessible_bases`](has_inaccessible_bases.md)
- [`has_inaccessible_nonstatic_data_members`](has_inaccessible_nonstatic_data_members.md)
- [`subobjects_of`](subobjects_of.md)


## 参照
- [P3293R3 Splicing a base class subobject](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3293r3.html)
