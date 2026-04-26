# is_base_of_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_base_of_type(info type_base, info type_derived);
}
```
* info[link info.md]

## 概要
型が別の型の基底クラスであるかを判定する。[`std::is_base_of`](/reference/type_traits/is_base_of.md)に対応する。


## 戻り値
`type_base`が`type_derived`の基底クラスである場合に`true`を返す。


## 例外
`type_base`または`type_derived`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct Base {};
struct Derived : Base {};

int main() {
  static_assert(std::meta::is_base_of_type(^^Base, ^^Derived));
  static_assert(!std::meta::is_base_of_type(^^Derived, ^^Base));
}
```

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


## 関連項目
- [`std::is_base_of`](/reference/type_traits/is_base_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
