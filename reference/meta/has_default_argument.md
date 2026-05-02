# has_default_argument
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_default_argument(info r);
}
```
* info[link info.md]

## 概要
関数パラメータがデフォルト引数を持つかを判定する。


## 戻り値
`r`が関数パラメータを表し、そのパラメータが到達可能な宣言のいずれかでデフォルト引数を持つ場合に`true`を返す。そうでなければ`false`を返す。


## 例
```cpp example
#include <meta>

void func(int x, int y = 10);

int main() {
  static_assert(!std::meta::has_default_argument(
    std::meta::parameters_of(^^func)[0]));  // x
  static_assert(std::meta::has_default_argument(
    std::meta::parameters_of(^^func)[1]));   // y = 10
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
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
