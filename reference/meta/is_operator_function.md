# is_operator_function
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_operator_function(info r);
}
```
* info[link info.md]

## 概要
演算子関数（`operator+`、`operator==`など、`operator`キーワードで定義される関数）であるかを判定する。代入演算子`operator=`も演算子関数に含まれる。


## 戻り値
`r`が演算子関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  int value;
  S operator+(const S& other) const { return {value + other.value}; }
  bool operator==(const S&) const = default;
  void f() {}  // 通常のメンバ関数
};

int main() {
  template for (constexpr auto m :
      std::meta::members_of(^^S, std::meta::access_context::unchecked())) {
    if constexpr (std::meta::is_function(m) &&
                  !std::meta::is_special_member_function(m)) {
      std::println("{}: is_operator_function={}",
        std::meta::display_string_of(m),
        std::meta::is_operator_function(m));
    }
  }
}
```
* std::meta::is_operator_function[color ff0000]
* std::meta::is_function[link is_function.md]
* std::meta::is_special_member_function[link is_special_member_function.md]
* std::meta::members_of[link members_of.md]
* std::meta::display_string_of[link display_string_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
S::operator+(const S&): is_operator_function=true
S::operator==(const S&): is_operator_function=true
S::f(): is_operator_function=false
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
