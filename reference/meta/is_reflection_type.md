# is_reflection_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_reflection_type(info type);
}
```
* info[link info.md]

## 概要
リフレクション型であるかを判定する。


## 戻り値
`type`がリフレクション型（`std::meta::info`）を表す場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
int main() {
  static_assert(std::meta::is_reflection_type(^^std::meta::info));
  static_assert(!std::meta::is_reflection_type(^^int));
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
