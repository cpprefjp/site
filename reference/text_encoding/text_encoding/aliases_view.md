# text_encoding::aliases_view
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
struct text_encoding::aliases_view : ranges::view_interface<text_encoding::aliases_view> {
  constexpr implementation-defined begin() const;
  constexpr implementation-defined end() const;
};
```

## 概要
`aliases_view`は、エンコーディングのエイリアス（別名）一覧を提供するビュークラスである。

このクラスは以下のコンセプトをモデル化する：

- [`copyable`](/reference/concepts/copyable.md)
- [`ranges::view`](/reference/ranges/view.md)
- [`ranges::random_access_range`](/reference/ranges/random_access_range.md)
- [`ranges::borrowed_range`](/reference/ranges/borrowed_range.md)

[`ranges::range_value_t`](/reference/ranges/range_value_t.md)`<text_encoding::aliases_view>`および[`ranges::range_reference_t`](/reference/ranges/range_reference_t.md)`<text_encoding::aliases_view>`はともに`const char*`を表す。


## 例
```cpp example
#include <text_encoding>
#include <print>
#include <ranges>

int main() {
  std::text_encoding enc{std::text_encoding::id::ShiftJIS};
  auto aliases = enc.aliases();

  // プライマリ名
  if (aliases.begin() != aliases.end()) {
    std::println("Primary name: {}", aliases.front());
  }

  // すべてのエイリアスを表示
  std::println("All aliases:");
  for (const char* alias : aliases) {
    std::println("  {}", alias);
  }

  // random_access_rangeなのでサイズも取得可能
  std::println("Number of aliases: {}", std::ranges::distance(aliases));
}
```

### 出力例
```
Primary name: Shift_JIS
All aliases:
  Shift_JIS
  MS_Kanji
  csShiftJIS
Number of aliases: 3
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
