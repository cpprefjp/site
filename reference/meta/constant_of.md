# constant_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info constant_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションが表す定数のリフレクションを取得する。


## 戻り値
`r`が定数式を表す場合、その定数値のリフレクションを返す。


## 例外
`r`のスプライスが有効なスプライス式でない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

constexpr int value = 42;

int main() {
  constexpr auto c = std::meta::constant_of(^^value);
  static_assert(std::meta::extract<int>(c) == 42);
}
```
* std::meta::extract[link extract.md]

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
