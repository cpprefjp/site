# is_special_member_function
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_special_member_function(info r);
}
```
* info[link info.md]

## 概要
特殊メンバ関数であるかを判定する。


## 戻り値
`r`が特殊メンバ関数（デフォルトコンストラクタ、コピー/ムーブコンストラクタ、コピー/ムーブ代入演算子、デストラクタ）を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  S() = default;              // 特殊メンバ関数
  S(const S&) = default;     // 特殊メンバ関数
  S(S&&) = default;          // 特殊メンバ関数
  S& operator=(const S&) = default; // 特殊メンバ関数
  S& operator=(S&&) = default;      // 特殊メンバ関数
  ~S() = default;            // 特殊メンバ関数
  S(int) {}                  // 特殊メンバ関数ではない
  void f() {}                // 特殊メンバ関数ではない
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_function(m)) {
      std::println("{}: is_special_member_function={}",
        std::meta::display_string_of(m),
        std::meta::is_special_member_function(m));
    }
  }
}
```
* std::meta::is_special_member_function[color ff0000]
* std::meta::is_function[link is_function.md]
* std::meta::members_of[link members_of.md]
* std::meta::display_string_of[link display_string_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
S::S(): is_special_member_function=true
S::S(const S&): is_special_member_function=true
S::S(S&&): is_special_member_function=true
S::operator=(const S&): is_special_member_function=true
S::operator=(S&&): is_special_member_function=true
S::~S(): is_special_member_function=true
S::S(int): is_special_member_function=false
S::f(): is_special_member_function=false
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
