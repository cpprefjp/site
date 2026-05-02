# type_order
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval strong_ordering type_order(info type_a, info type_b);
}
```
* info[link info.md]

## 概要
2つの型のリフレクション間の順序を取得する。[`std::meta::info`](info.md)は`<=>`をサポートしないが、この関数により型のリフレクション間で一貫した全順序を得ることができる。


## 戻り値
`type_a`と`type_b`が型を表す場合、それらの間の実装定義の全順序を[`strong_ordering`](/reference/compare/strong_ordering.md)として返す。


## 例外
`type_a`または`type_b`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <compare>

int main() {
  // 同じ型の比較は equal
  static_assert(std::meta::type_order(^^int, ^^int) == std::strong_ordering::equal);
  // 異なる型は less または greater（実装定義）
  static_assert(std::meta::type_order(^^int, ^^double) != std::strong_ordering::equal);
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
