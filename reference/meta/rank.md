# rank
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval size_t rank(info type);
}
```
* info[link info.md]

## 概要
配列型の次元数を取得する。[`std::rank`](/reference/type_traits/rank.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::rank`](/reference/type_traits/rank.md)相当の値を返す。配列型でなければ`0`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::rank(^^int[3][4]) == 2);
  static_assert(std::meta::rank(^^int[3]) == 1);
  static_assert(std::meta::rank(^^int) == 0);
}
```
* std::meta::rank[color ff0000]

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
- [`extent`](extent.md)
- [`std::rank`](/reference/type_traits/rank.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
