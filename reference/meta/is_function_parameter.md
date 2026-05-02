# is_function_parameter
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_function_parameter(info r);
}
```
* info[link info.md]

## 概要
関数パラメータであるかを判定する。


## 戻り値
`r`が関数パラメータを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

void func(int x, double y);

int main() {
  static_assert(std::meta::is_function_parameter(
    std::meta::parameters_of(^^func)[0]));
  static_assert(std::meta::is_function_parameter(
    std::meta::parameters_of(^^func)[1]));
}
```
* std::meta::parameters_of[link parameters_of.md]

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
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
