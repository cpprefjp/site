# has_identifier
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_identifier(info r);
}
```
* info[link info.md]

## 概要
リフレクションが識別子を持つかどうかを判定する。


## 戻り値
`r`が識別子を持つ場合は`true`、そうでなければ`false`を返す。名前のない関数パラメータや、異なる宣言間でパラメータ名が一致しない場合は`false`となる。


## 例
```cpp example
#include <meta>

void func(int x, int);

int main() {
  static_assert(std::meta::has_identifier(
    std::meta::parameters_of(^^func)[0]));   // "x"という名前がある
  static_assert(!std::meta::has_identifier(
    std::meta::parameters_of(^^func)[1]));  // 名前がない
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
