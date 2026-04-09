# is_constructor
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_constructor(info r);
}
```
* info[link info.md]

## 概要
コンストラクタであるかを判定する。


## 戻り値
`r`がコンストラクタを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  S() = default;        // デフォルトコンストラクタ
  S(int) {}             // 変換コンストラクタ
  S(const S&) = default; // コピーコンストラクタ
  void f() {}           // 通常のメンバ関数
};

int main() {
  template for (constexpr auto m :
      std::meta::members_of(^^S, std::meta::access_context::unchecked())) {
    if constexpr (std::meta::is_function(m)) {
      std::println("{}: is_constructor={}",
        std::meta::display_string_of(m),
        std::meta::is_constructor(m));
    }
  }
}
```
* std::meta::members_of[link members_of.md]
* std::meta::is_function[link is_function.md]
* std::meta::display_string_of[link display_string_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

#### 出力例
```
S::S(): is_constructor=true
S::S(int): is_constructor=true
S::S(const S&): is_constructor=true
S::f(): is_constructor=false
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
