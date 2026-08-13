# symbol_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* u8symbol_of[meta alias]

```cpp
namespace std::meta {
  consteval string_view symbol_of(operators op);
  consteval u8string_view u8symbol_of(operators op);
}
```
* operators[link operators.md]

## 概要
演算子の種類から記号文字列を取得する。


## 戻り値
演算子`op`に対応する記号文字列を返す。


## 例外
`op`の値が[`operators`](operators.md)の列挙子のいずれかに対応しない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 備考
`std::meta`名前空間の関数のうち、戻り値の型が`string_view`または`u8string_view`であるものは、NULL終端された静的記憶域上の文字列を返す、というルールがある。本関数もそれに該当する。


## 例
```cpp example
#include <meta>
#include <print>

struct S {
  bool operator==(const S&) const = default;
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_operator_function(m)) {
      std::println("演算子: {}", std::meta::symbol_of(std::meta::operator_of(m)));
    }
  }
}
```
* std::meta::members_of[link members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
* std::meta::is_operator_function[link is_operator_function.md]
* std::meta::operator_of[link operator_of.md]

### 出力
```
演算子: ==
演算子: =
演算子: =
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4556. Unclear properties of reflection strings](https://cplusplus.github.io/LWG/issue4556)
    - C++26で、`string_view`／`u8string_view`を返す`std::meta`の関数がNULL終端された静的記憶域上の文字列を返すことが明確化された
