# extent
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::size_t extent(info type, unsigned int i = 0);
}
```
* info[link info.md]

## 概要
配列型の指定次元の要素数を取得する。[`std::extent`](/reference/type_traits/extent.md)に対応する。


## 戻り値
`type`が表す型に対して、`i`番目の次元の[`std::extent`](/reference/type_traits/extent.md)相当の値を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::extent(^^int[3][4], 0) == 3);
  static_assert(std::meta::extent(^^int[3][4], 1) == 4);
  static_assert(std::meta::extent(^^int[3]) == 3);
}
```
* std::meta::extent[color ff0000]

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
- [`rank`](rank.md)
- [`std::extent`](/reference/type_traits/extent.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
