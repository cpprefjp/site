# is_accessible
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_accessible(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
指定したアクセスコンテキストでアクセス可能かを判定する。


## 戻り値
`r`がアクセスコンテキスト`ctx`でアクセス可能である場合に`true`を返す。


## 例外
`r`が不完全なクラスのメンバ、または不完全なクラスの基底クラス関係を表す場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

class C {
  int secret;
public:
  int visible;
};

int main() {
  constexpr auto members = std::meta::nonstatic_data_members_of(
      ^^C, std::meta::access_context::unchecked());
  constexpr auto ctx = std::meta::access_context::unprivileged();
  static_assert(!std::meta::is_accessible(members[0], ctx));  // secret: private
  static_assert(std::meta::is_accessible(members[1], ctx));   // visible: public
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
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
