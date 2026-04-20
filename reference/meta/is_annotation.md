# is_annotation
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_annotation(info r);
}
```
* info[link info.md]

## 概要
リフレクションがアノテーションであるかを判定する。


## 戻り値
`r`がアノテーションを表す場合に`true`を返す。そうでなければ`false`を返す。


## 例
```cpp example
#include <meta>

struct Tag {};

struct [[=Tag{}]] S {};

consteval bool check() {
  auto annots = std::meta::annotations_of(^^S);
  return annots.size() == 1 && std::meta::is_annotation(annots[0]);
}

int main() {
  static_assert(check());
}
```
* std::meta::annotations_of[link annotations_of.md]

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


## 関連項目
- [`annotations_of`](annotations_of.md)
- [`annotations_of_with_type`](annotations_of_with_type.md)


## 参照
- [P3394R4 Annotations for Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3394r4.html)
