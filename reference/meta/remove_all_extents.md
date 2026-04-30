# remove_all_extents
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info remove_all_extents(info type);
}
```
* info[link info.md]

## 概要
配列型からすべての次元を除去する。[`std::remove_all_extents`](/reference/type_traits/remove_all_extents.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::remove_all_extents`](/reference/type_traits/remove_all_extents.md)相当の変換を適用した結果の型のリフレクションを返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::remove_all_extents(^^int[3][4]) == ^^int);
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


## 関連項目
- [`std::remove_all_extents`](/reference/type_traits/remove_all_extents.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
