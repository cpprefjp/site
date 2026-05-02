# is_nothrow_convertible_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_nothrow_convertible_type(info type_src, info type_dst);
}
```
* info[link info.md]

## 概要
型が別の型に例外を送出せずに変換可能かを判定する。[`std::is_nothrow_convertible`](/reference/type_traits/is_nothrow_convertible.md)に対応する。


## 戻り値
`type_src`が`type_dst`に例外を送出せずに変換可能な場合に`true`を返す。


## 例外
`type_src`または`type_dst`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct A {};
struct B {
  B(const A&) noexcept {}
};
struct C {
  C(const A&) noexcept(false) {}
};

int main() {
  static_assert(std::meta::is_nothrow_convertible_type(^^int, ^^double));
  static_assert(std::meta::is_nothrow_convertible_type(^^A, ^^B));
  static_assert(!std::meta::is_nothrow_convertible_type(^^A, ^^C));
}
```
* std::meta::is_nothrow_convertible_type[color ff0000]

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


## 関連項目
- [`std::is_nothrow_convertible`](/reference/type_traits/is_nothrow_convertible.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
