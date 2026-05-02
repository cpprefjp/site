# has_static_storage_duration
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_static_storage_duration(info r);
}
```
* info[link info.md]

## 概要
静的記憶域期間を持つかを判定する。


## 戻り値
`r`が静的記憶域期間を持つ変数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

static int s;
int g;

int main() {
  int local;
  static_assert(std::meta::has_static_storage_duration(^^s));
  static_assert(std::meta::has_static_storage_duration(^^g));
  static_assert(!std::meta::has_static_storage_duration(^^local));
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
