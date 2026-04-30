# template_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info template_of(info r);
}
```
* info[link info.md]

## 概要
テンプレートの特殊化からテンプレート自体のリフレクションを取得する。


## 戻り値
`r`がテンプレートの特殊化を表す場合、そのテンプレートのリフレクションを返す。[`has_template_arguments`](has_template_arguments.md)`(r)`が`true`であることが事前条件となる。


## 例外
[`has_template_arguments`](has_template_arguments.md)`(r)`が`false`の場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <vector>

int main() {
  static_assert(std::meta::template_of(^^std::vector<int>) == ^^std::vector);
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


## 関連項目
- [`template_arguments_of`](template_arguments_of.md)
- [`substitute`](substitute.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
