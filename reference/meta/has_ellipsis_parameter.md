# has_ellipsis_parameter
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_ellipsis_parameter(info r);
}
```
* info[link info.md]

## 概要
関数が可変長引数（`...`）を持つかを判定する。


## 戻り値
`r`が関数または関数型を表し、そのパラメータリストが省略記号（`...`）で終わる場合に`true`を返す。そうでなければ`false`を返す。


## 例
```cpp example
#include <meta>

int printf(const char* fmt, ...);
void normal(int x);

int main() {
  static_assert(std::meta::has_ellipsis_parameter(^^printf));
  static_assert(!std::meta::has_ellipsis_parameter(^^normal));
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
- [GCC](/implementation.md#gcc): 16 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
