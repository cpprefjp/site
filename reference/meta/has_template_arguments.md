# has_template_arguments
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_template_arguments(info r);
}
```
* info[link info.md]

## 概要
テンプレート引数を持つかを判定する。


## 戻り値
`r`がテンプレートの特殊化（明示的・暗黙的を含む）を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <vector>

int main() {
  static_assert(std::meta::has_template_arguments(^^std::vector<int>));
  static_assert(!std::meta::has_template_arguments(^^std::vector));
  static_assert(!std::meta::has_template_arguments(^^int));
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
