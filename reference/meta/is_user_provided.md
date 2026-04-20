# is_user_provided
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_user_provided(info r);
}
```
* info[link info.md]

## 概要
ユーザー提供であるかを判定する。


## 戻り値
`r`がユーザー提供の関数を表す場合に`true`を返す。ユーザー提供とは、ユーザーが宣言し、かつ最初の宣言で`= default`も`= delete`もされていないことを意味する。


## 例
```cpp example
#include <meta>

struct S {
  S() = default;  // ユーザー宣言だがユーザー提供ではない
  void f() {}     // ユーザー提供
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_default_constructor(m)) {
      static_assert(std::meta::is_user_declared(m));
      static_assert(!std::meta::is_user_provided(m));
    }
  }
}
```
* std::meta::is_default_constructor[link is_default_constructor.md]
* std::meta::members_of[link members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
* std::meta::is_user_declared[link is_user_declared.md]

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
