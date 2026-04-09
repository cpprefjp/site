# is_assignable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_assignable_type(info type_dst, info type_src);
}
```
* info[link info.md]

## 概要
式`declval<T>() = declval<U>()`が有効かどうかで代入可能かを判定する。[`std::is_assignable`](/reference/type_traits/is_assignable.md)に対応する。


## 戻り値
`type_dst`と`type_src`が表す型について、代入が可能な場合に`true`を返す。


## 例外
`type_dst`または`type_src`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct A {};
struct B {
  B& operator=(const A&) { return *this; }
};

int main() {
  // int&にintを代入可能
  static_assert(std::meta::is_assignable_type(^^int&, ^^int));
  // intにintは代入不可（左辺が左辺値参照でない）
  static_assert(!std::meta::is_assignable_type(^^int, ^^int));
  // const int&にintは代入不可
  static_assert(!std::meta::is_assignable_type(^^const int&, ^^int));

  // BにはAからの代入演算子が定義されている
  static_assert(std::meta::is_assignable_type(^^B&, ^^const A&));
  // AにはBからの代入演算子が定義されていない
  static_assert(!std::meta::is_assignable_type(^^A&, ^^const B&));
}
```
* std::meta::is_assignable_type[color ff0000]

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
