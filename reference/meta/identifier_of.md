# identifier_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* u8identifier_of[meta alias]

```cpp
namespace std::meta {
  consteval string_view identifier_of(info r);
  consteval u8string_view u8identifier_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションの識別子を文字列で取得する。


## 戻り値
`r`の識別子を返す。`has_identifier(r)`が`true`であり、識別子が返す文字エンコーディングで表現可能であることが事前条件となる。


## 例外
[`has_identifier`](has_identifier.md)`(r)`が`false`の場合、または返される識別子が文字エンコーディングで表現できない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 備考
`std::meta`名前空間の関数のうち、戻り値の型が`string_view`または`u8string_view`であるものは、NULL終端された静的記憶域上の文字列を返す、というルールがある。本関数もそれに該当する。


## 例
```cpp example
#include <meta>
#include <print>

struct Point {
  int x;
  int y;
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(^^Point,
          std::meta::access_context::unchecked()))) {
    std::println("{}", std::meta::identifier_of(m));
  }
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

### 出力
```
x
y
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
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
- [LWG Issue 4556. Unclear properties of reflection strings](https://cplusplus.github.io/LWG/issue4556)
    - C++26で、`string_view`／`u8string_view`を返す`std::meta`の関数がNULL終端された静的記憶域上の文字列を返すことが明確化された
