# is_bit_field
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_bit_field(info r);
}
```
* info[link info.md]

## 概要
ビットフィールドであるかを判定する。


## 戻り値
`r`がビットフィールドを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Flags {
  unsigned a : 1;
  unsigned b : 3;
  unsigned c;
};

int main() {
  constexpr auto members = std::meta::nonstatic_data_members_of(
      ^^Flags, std::meta::access_context::unchecked());
  static_assert(std::meta::is_bit_field(members[0]));   // a
  static_assert(std::meta::is_bit_field(members[1]));   // b
  static_assert(!std::meta::is_bit_field(members[2]));  // c
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
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
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
