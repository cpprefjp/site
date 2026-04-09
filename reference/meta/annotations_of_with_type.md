# annotations_of_with_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> annotations_of_with_type(info item, info type);
}
```
* info[link info.md]

## 概要
宣言に付加された指定した型のアノテーションのみを取得する。


## 戻り値
`item`に付加されたアノテーションのうち、型が`type`に一致するもののリフレクションを格納した[`std::vector`](/reference/vector/vector.md)オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

struct Name { const char* value; };

struct [[=Name{"点"}, =42]] Point {
  [[=Name{"x座標"}]] int x;
  [[=Name{"y座標"}]] int y;
};

int main() {
  constexpr auto annots = std::meta::annotations_of_with_type(^^Point, ^^Name);
  static_assert(annots.size() == 1);
  std::println("{}", [:annots[0]:].value);
}
```

### 出力
```
点
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
- [`is_annotation`](is_annotation.md)


## 参照
- [P3394R4 Annotations for Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3394r4.html)
