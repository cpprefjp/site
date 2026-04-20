# is_conversion_function
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_conversion_function(info r);
}
```
* info[link info.md]

## 概要
変換関数であるかを判定する。

変換関数とは、クラスのオブジェクトを別の型に暗黙的または明示的に変換するための`operator T()`形式のメンバ関数である。


## 戻り値
`r`が変換関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  int value;
  operator int() const { return value; } // 変換関数
  explicit operator bool() const { return value != 0; } // 変換関数
  void f() {}  // 通常のメンバ関数
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_conversion_function(m)) {
      std::println("{}", std::meta::display_string_of(m));
    }
  }
}
```
* std::meta::members_of[link members_of.md]
* std::meta::is_conversion_function[color ff0000]
* std::meta::display_string_of[link display_string_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
S::operator int()
S::operator bool()
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
