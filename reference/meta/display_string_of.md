# display_string_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* u8display_string_of[meta alias]

```cpp
namespace std::meta {
  consteval string_view display_string_of(info r);
  consteval u8string_view u8display_string_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションの表示用文字列を取得する。


## 戻り値
`r`の人間可読な表示文字列を返す。結果は実装定義である。


## 備考
`std::meta`名前空間の関数のうち、戻り値の型が`string_view`または`u8string_view`であるものは、NULL終端された静的記憶域上の文字列を返す、というルールがある。本関数もそれに該当する。


## 例
```cpp example
#include <meta>
#include <print>
#include <vector>

int main() {
  std::println("{}", std::meta::display_string_of(^^int));
  std::println("{}", std::meta::display_string_of(^^std::vector));
}
```

#### 出力例
```
int
template<class _Tp, class _Alloc> class std::vector
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
