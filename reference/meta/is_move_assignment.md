# is_move_assignment
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_move_assignment(info r);
}
```
* info[link info.md]

## 概要
ムーブ代入演算子であるかを判定する。


## 戻り値
`r`がムーブ代入演算子を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  S& operator=(const S&) = default;  // コピー代入演算子
  S& operator=(S&&) = default;       // ムーブ代入演算子
};

int main() {
  template for (constexpr auto m :
      std::meta::members_of(^^S, std::meta::access_context::unchecked())) {
    if constexpr (std::meta::is_move_assignment(m)) {
      static_assert(!std::meta::is_copy_assignment(m));
      static_assert(std::meta::is_assignment(m));
    }
  }
}
```
* std::meta::is_copy_assignment[link is_copy_assignment.md]
* std::meta::is_assignment[link is_assignment.md]
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
