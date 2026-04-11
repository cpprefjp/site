# annotations_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> annotations_of(info item);
}
```
* info[link info.md]

## 概要
宣言に付加されたすべてのアノテーションのリフレクションを取得する。


## 戻り値
`item`に付加されたすべてのアノテーションのリフレクションを格納した[`std::vector`](/reference/vector/vector.md)オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

struct Label { const char* text; };

struct [[=Label{std::define_static_string("my struct")}, =42]] S {};

int main() {
  constexpr auto annots = std::meta::annotations_of(^^S);
  std::println("アノテーション数: {}", annots.size());

  template for (constexpr auto a : annots) {
    // アノテーションの型名を出力
    std::println("  型: {}", std::meta::display_string_of(std::meta::type_of(a)));

    // 型ごとに値を取り出して出力
    if constexpr (std::meta::type_of(a) == ^^Label) {
      std::println("  値: {}", [:a:].text);
    } else if constexpr (std::meta::type_of(a) == ^^int) {
      std::println("  値: {}", [:a:]);
    }
  }
}
```
* std::meta::display_string_of[link display_string_of.md]
* std::meta::type_of[link type_of.md]

### 出力
```
アノテーション数: 2
  型: Label
  値: my struct
  型: int
  値: 42
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`annotations_of_with_type`](annotations_of_with_type.md)
- [`is_annotation`](is_annotation.md)


## 参照
- [P3394R4 Annotations for Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3394r4.html)
