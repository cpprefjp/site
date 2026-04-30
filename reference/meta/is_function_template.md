# is_function_template
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_function_template(info r);
}
```
* info[link info.md]

## 概要
関数テンプレートであるかを判定する。


## 戻り値
`r`が関数テンプレートを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

// 関数テンプレート
template <class T>
T add(T a, T b) { return a + b; }

// 通常の関数
int multiply(int a, int b) { return a * b; }

int main() {
  static_assert(std::meta::is_function_template(^^add));
  static_assert(!std::meta::is_function_template(^^multiply));
  static_assert(!std::meta::is_function_template(^^int));
}
```
* std::meta::is_function_template[color ff0000]

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
