# is_assignment
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_assignment(info r);
}
```
* info[link info.md]

## 概要
代入演算子（コピー代入演算子およびムーブ代入演算子）であるかを判定する。


## 戻り値
`r`が代入演算子を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  S& operator=(const S&) = default;  // コピー代入演算子
  S& operator=(S&&) = default;       // ムーブ代入演算子
  S& operator=(int) { return *this; } // 代入演算子ではない（通常のoperator=）
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_function(m)) {
      std::println("{}: is_assignment={}",
        std::meta::display_string_of(m),
        std::meta::is_assignment(m));
    }
  }
}
```
* std::meta::members_of[link members_of.md]
* std::meta::is_function[link is_function.md]
* std::meta::display_string_of[link display_string_of.md]

#### 出力例
```
constexpr S& S::operator=(const S&): is_assignment=true
constexpr S& S::operator=(S&&): is_assignment=true
S& S::operator=(int): is_assignment=true
constexpr S::S(): is_assignment=false
constexpr S::S(const S&): is_assignment=false
constexpr S::~S(): is_assignment=false
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
