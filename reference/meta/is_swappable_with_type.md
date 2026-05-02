# is_swappable_with_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_swappable_with_type(info type_dst, info type_src);
}
```
* info[link info.md]

## 概要
指定した2つの型の間でswap可能かを判定する。[`std::is_swappable_with`](/reference/type_traits/is_swappable_with.md)に対応する。


## 戻り値
`type_dst`と`type_src`が表す型の間でswap可能な場合に`true`を返す。


## 例外
`type_dst`または`type_src`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::is_swappable_with_type(^^int&, ^^int&));
}
```
* std::meta::is_swappable_with_type[color ff0000]

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
