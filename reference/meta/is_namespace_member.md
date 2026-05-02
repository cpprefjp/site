# is_namespace_member
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_namespace_member(info r);
}
```
* info[link info.md]

## 概要
名前空間メンバであるかを判定する。


## 戻り値
`r`が名前空間のメンバを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

namespace ns {
  int x;
}

int main() {
  static_assert(std::meta::is_namespace_member(^^ns::x));
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
