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
クラスにアクセス不可能なメンバ変数があるかを判定する。


## 戻り値
指定したアクセスコンテキストでアクセスできないメンバ変数が存在する場合に`true`を返す。


## 例外
以下のいずれかの場合、[`std::meta::exception`](exception.md)例外を送出する：

- [`nonstatic_data_members_of`](nonstatic_data_members_of.md)`(r, `[`access_context`](access_context.md)`::`[`unchecked()`](access_context/unchecked.md)`)`の評価が例外を送出する場合
- `r`がクロージャ型を表す場合


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
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4428. Metafunctions should not be defined in terms of constant subexpressions](https://cplusplus.github.io/LWG/issue4428)
    - C++26で、この関数がエラー報告を例外ベースに移行したことに伴い、例外を送出する条件（Throws節）の文言が明確化された
