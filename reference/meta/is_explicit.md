# is_explicit
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_explicit(info r);
}
```
* info[link info.md]

## 概要
`explicit`であるかを判定する。


## 戻り値
`r`が`explicit`指定されたコンストラクタまたは変換関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  explicit S(int) {}
  S(double) {}
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_constructor(m) &&
                  !std::meta::is_special_member_function(m)) {
      if constexpr (std::meta::is_explicit(m)) {
        // S(int) はexplicit
      }
    }
  }
}
```
* std::meta::is_constructor[link is_constructor.md]
* std::meta::is_special_member_function[link is_special_member_function.md]
* std::meta::members_of[link members_of.md]
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
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
