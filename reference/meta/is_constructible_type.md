# is_constructible_type
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval bool is_constructible_type(info type, R&& type_args);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
指定した引数型で構築可能かを判定する。[`std::is_constructible`](/reference/type_traits/is_constructible.md)に対応する。


## 戻り値
`type`が表す型が`type_args`で指定された引数型で構築可能な場合に`true`を返す。


## 例外
`type`または`type_args`の各要素が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <string>

int main() {
  // stringはconst char*から構築可能
  static_assert(std::meta::is_constructible_type(^^std::string, {^^const char*}));
  // intは引数なしで構築可能
  static_assert(std::meta::is_constructible_type(^^int, {}));
  // intはstring_viewから構築不可能
  static_assert(!std::meta::is_constructible_type(^^int, {^^std::string_view}));
}
```
* std::meta::is_constructible_type[color ff0000]

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
