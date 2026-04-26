# is_nothrow_assignable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_nothrow_assignable_type(info type_dst, info type_src);
}
```
* info[link info.md]

## 概要
例外を送出せずに代入可能かを判定する。[`std::is_nothrow_assignable`](/reference/type_traits/is_nothrow_assignable.md)に対応する。


## 戻り値
`type_dst`と`type_src`が表す型について、例外を送出せずに代入可能な場合に`true`を返す。


## 例外
`type_dst`または`type_src`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct A {};
struct B {
  B& operator=(const A&) noexcept { return *this; }
};
struct C {
  C& operator=(const A&) noexcept(false) { return *this; }
};

int main() {
  static_assert(std::meta::is_nothrow_assignable_type(^^int&, ^^int));
  // B::operator=(const A&)はnoexcept
  static_assert(std::meta::is_nothrow_assignable_type(^^B&, ^^const A&));
  // C::operator=(const A&)はnoexcept(false)
  static_assert(!std::meta::is_nothrow_assignable_type(^^C&, ^^const A&));
}
```
* std::meta::is_nothrow_assignable_type[color ff0000]

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
