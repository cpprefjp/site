# is_literal_operator_template
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_literal_operator_template(info r);
}
```
* info[link info.md]

## 概要
リテラル演算子テンプレートであるかを判定する。

リテラル演算子テンプレートとは、`template <char...> operator""_suffix()`のようなテンプレート化されたユーザー定義リテラル演算子のことである。


## 戻り値
`r`がリテラル演算子テンプレートを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

// リテラル演算子（テンプレートではない）
long double operator""_km(long double val) { return val * 1000.0L; }

// リテラル演算子テンプレート
template <char... Chars>
constexpr unsigned operator""_b() {
  unsigned result = 0;
  for (char c : {Chars...}) {
    result = result * 2 + (c - '0');
  }
  return result;
}

int main() {
  static_assert(std::meta::is_literal_operator_template(^^operator""_b));
  static_assert(!std::meta::is_literal_operator_template(^^operator""_km));

  // どちらもリテラル演算子ではある
  static_assert(std::meta::is_literal_operator(^^operator""_km));
}
```
* std::meta::is_literal_operator[link is_literal_operator.md]

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
