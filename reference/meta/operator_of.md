# operator_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval operators operator_of(info r);
}
```
* info[link info.md]
* operators[link operators.md]

## 概要
演算子のリフレクションから演算子の種類を取得する。


## 戻り値
`r`が演算子関数またはリテラル演算子を表すリフレクションである場合、対応する[`operators`](operators.md)列挙値を返す。


## 例外
`r`が演算子関数または演算子関数テンプレートを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


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
* std::meta::symbol_of[link symbol_of.md]

### 出力
```
演算子: ==
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
