# is_literal_operator
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_literal_operator(info r);
}
```
* info[link info.md]

## 概要
リテラル演算子であるかを判定する。リテラル演算子とは、ユーザー定義リテラル（`123_km`のような接尾辞付きリテラル）を定義するための`operator"" _suffix`形式の関数である。


## 戻り値
`r`がリテラル演算子を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

// リテラル演算子
long double operator""_km(long double val) { return val * 1000.0L; }

// 通常の関数
double to_meters(double km) { return km * 1000.0; }

int main() {
  static_assert(std::meta::is_literal_operator(^^operator""_km));
  static_assert(!std::meta::is_literal_operator(^^to_meters));
}
```
* std::meta::is_literal_operator[color ff0000]

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
