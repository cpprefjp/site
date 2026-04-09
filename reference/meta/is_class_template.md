# is_class_template
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_class_template(info r);
}
```
* info[link info.md]

## 概要
クラステンプレートであるかを判定する。


## 戻り値
`r`がクラステンプレートを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>
#include <vector>

int main() {
  static_assert(std::meta::is_class_template(^^std::vector));
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
