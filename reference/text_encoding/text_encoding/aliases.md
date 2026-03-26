# aliases
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr aliases_view aliases() const noexcept;
```

## 概要
エンコーディングのエイリアス（別名）一覧を取得する。


## 戻り値
`*this`が既知の登録済み文字エンコーディングを表す場合、以下を満たす[`aliases_view`](aliases_view.md)オブジェクト`r`を返す：

- `r.front()`はIANAレジストリで定義されたプライマリ名を返す
- `r`は登録済みエンコーディングのエイリアスを含む
- `r`は`strcmp`で比較した場合に重複する値を含まない

そうでない場合（[`id::unknown`](id.md)または[`id::other`](id.md)の場合）、空のRangeを返す。

`r`の各要素は、通常リテラルエンコーディングでエンコードされた非ヌルの空でないヌル終端バイト文字列であり、基本文字集合の文字のみで構成される。

エイリアスの順序は未規定である。


## 例外
投げない。


## 例
```cpp example
#include <text_encoding>
#include <print>

int main() {
  std::text_encoding enc{std::text_encoding::id::UTF8};
  std::println("Aliases for UTF-8:");
  for (const char* alias : enc.aliases()) {
    std::println("  {}", alias);
  }

  // 未登録エンコーディングのエイリアスは空
  std::text_encoding other{"WTF-8"};
  std::print("Aliases for WTF-8: ");
  auto aliases = other.aliases();
  if (aliases.begin() == aliases.end()) {
    std::println("(none)");
  }
}
```
* id::UTF8[link id.md]

### 出力例
```
Aliases for UTF-8:
  UTF-8
  csUTF8
Aliases for WTF-8: (none)
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
