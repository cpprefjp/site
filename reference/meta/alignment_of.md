# alignment_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval size_t alignment_of(info r);
}
```
* info[link info.md]

## 概要
型またはデータメンバのアライメントを取得する。


## 戻り値
`r`が型を表す場合は`alignof`相当の値を、非静的データメンバを表す場合はそのメンバのアライメントを返す。


## 例外
`r`が型または非静的データメンバを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::alignment_of(^^int) == alignof(int));
  static_assert(std::meta::alignment_of(^^double) == alignof(double));
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


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
