# add_cv
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info add_cv(info type);
}
```
* info[link info.md]

## 概要
型にCV修飾（`const`と`volatile`）を付加する。[`std::add_cv`](/reference/type_traits/add_cv.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::add_cv`](/reference/type_traits/add_cv.md)相当の変換を適用した結果の型のリフレクションを返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::add_cv(^^int) == ^^const volatile int);
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
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::add_cv`](/reference/type_traits/add_cv.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
