# has_default_member_initializer
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_default_member_initializer(info r);
}
```
* info[link info.md]

## 概要
デフォルトメンバ初期化子を持つかを判定する。


## 戻り値
`r`がデフォルトメンバ初期化子を持つメンバ変数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  int x;
  int y = 42;
};

int main() {
  static_assert(!std::meta::has_default_member_initializer(^^S::x));
  static_assert(std::meta::has_default_member_initializer(^^S::y));
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
