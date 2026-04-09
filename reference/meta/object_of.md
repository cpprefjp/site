# object_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info object_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションが表す変数のオブジェクトのリフレクションを取得する。


## 戻り値
`r`が変数または構造化束縛を表す場合、そのオブジェクトのリフレクションを返す。


## 例外
`r`が静的記憶域期間を持つオブジェクト、またはそのようなオブジェクトを宣言・参照する変数を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

static int global_var = 42;

int main() {
  constexpr auto obj = std::meta::object_of(^^global_var);
  static_assert(std::meta::is_object(obj));
}
```
* std::meta::is_object[link is_object.md]

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
