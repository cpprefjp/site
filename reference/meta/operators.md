# operators
* meta[meta header]
* std::meta[meta namespace]
* enum[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  enum class operators;
}
```

## 概要
`operators`は、C++のオーバーロード可能な演算子の種類を表すスコープ付き列挙型である。[`operator_of()`](operator_of.md)の戻り値型として使用される。

各列挙子は`std::meta`名前空間でも直接使用できる（`using enum operators;`が適用されている）。


## 列挙子

| 列挙子 | 対応する演算子 |
|--------|---------------|
| `op_new` | `operator new` |
| `op_delete` | `operator delete` |
| `op_array_new` | `operator new[]` |
| `op_array_delete` | `operator delete[]` |
| `op_co_await` | `operator co_await` |
| `op_parentheses` | `operator()` |
| `op_square_brackets` | `operator[]` |
| `op_arrow` | `operator->` |
| `op_arrow_star` | `operator->*` |
| `op_tilde` | `operator~` |
| `op_exclamation` | `operator!` |
| `op_plus` | `operator+` |
| `op_minus` | `operator-` |
| `op_star` | `operator*` |
| `op_slash` | `operator/` |
| `op_percent` | `operator%` |
| `op_caret` | `operator^` |
| `op_ampersand` | `operator&` |
| `op_pipe` | <code>operator&#124;</code> |
| `op_equals` | `operator=` |
| `op_plus_equals` | `operator+=` |
| `op_minus_equals` | `operator-=` |
| `op_star_equals` | `operator*=` |
| `op_slash_equals` | `operator/=` |
| `op_percent_equals` | `operator%=` |
| `op_caret_equals` | `operator^=` |
| `op_ampersand_equals` | `operator&=` |
| `op_pipe_equals` | <code>operator&#124;=</code> |
| `op_equals_equals` | `operator==` |
| `op_exclamation_equals` | `operator!=` |
| `op_less` | `operator<` |
| `op_greater` | `operator>` |
| `op_less_equals` | `operator<=` |
| `op_greater_equals` | `operator>=` |
| `op_spaceship` | `operator<=>` |
| `op_ampersand_ampersand` | `operator&&` |
| `op_pipe_pipe` | <code>operator&#124;&#124;</code> |
| `op_less_less` | `operator<<` |
| `op_greater_greater` | `operator>>` |
| `op_less_less_equals` | `operator<<=` |
| `op_greater_greater_equals` | `operator>>=` |
| `op_plus_plus` | `operator++` |
| `op_minus_minus` | `operator--` |
| `op_comma` | `operator,` |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator_of`](operator_of.md)
- [`symbol_of`](symbol_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
