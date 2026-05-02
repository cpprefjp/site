# is_operator_function_template
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_operator_function_template(info r);
}
```
* info[link info.md]

## 概要
演算子関数テンプレートであるかを判定する。演算子関数テンプレートとは、`template <class T> bool operator==(const T&)`のようなテンプレート化された演算子関数のことである。


## 戻り値
`r`が演算子関数テンプレートを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  bool operator==(const S&) const = default;  // 演算子関数
  template <class T>
  S operator+(const T& other) const { return *this; }  // 演算子関数テンプレート
  void f() {}  // 通常のメンバ関数
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_operator_function_template(m)) {
      // template <class T> operator+(const T&) のみがここに到達する
      static_assert(std::meta::is_template(m));
      static_assert(!std::meta::is_operator_function(m));
    }
  }
}
```
* std::meta::is_operator_function_template[color ff0000]
* std::meta::is_template[link is_template.md]
* std::meta::is_operator_function[link is_operator_function.md]
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
