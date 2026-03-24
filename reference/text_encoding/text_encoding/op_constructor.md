# text_encoding::text_encoding
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr text_encoding() = default;                        // (1) C++26
constexpr explicit text_encoding(string_view enc) noexcept; // (2) C++26
constexpr text_encoding(id i) noexcept;                     // (3) C++26
```

## 概要
`text_encoding`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。`mib_`を[`id::unknown`](id.md)に初期化する
- (2) : エンコーディング名から構築する。IANA登録名またはエイリアスに一致する場合は対応するMIB値が設定され、一致しない場合は[`id::other`](id.md)が設定される
- (3) : MIB列挙値から構築する


## 事前条件
- (2) :
    - `enc`は基本文字集合の要素のみで構成される通常リテラルエンコーディングの文字列を表す
    - `enc.size() <= max_name_length`
    - `enc.`[`contains`](/reference/string_view/basic_string_view/contains.md)`('\0')`が`false`


## 事後条件
- (2) :
    - 既知の登録済み文字エンコーディングのプライマリ名またはエイリアス`a`が存在し、[`comp-name`](comp-name.md)`(a, enc)`が`true`となる場合、`mib_`はその登録済みエンコーディングに対応する[`id`](id.md)の列挙子の値を持つ。そうでなければ、`mib_ == id::other`
    - `enc.compare(name_) == 0`
- (3) :
    - `mib_ == i`
    - `(mib_ == id::unknown || mib_ == id::other)`が`true`の場合、`strlen(name_) == 0`。そうでなければ、[`ranges::contains`](/reference/algorithm/ranges_contains.md)`(`[`aliases()`](aliases.md)`, `[`string_view`](/reference/string_view/basic_string_view.md)`(name_))`が`true`


## 例外
投げない。


## 例
```cpp example
#include <text_encoding>
#include <cassert>
#include <string_view>

int main() {
  using namespace std::string_view_literals;

  // (1) デフォルト構築
  std::text_encoding te1;
  assert(te1.mib() == std::text_encoding::id::unknown);

  // (2) エンコーディング名から構築
  std::text_encoding te2{"utf-8"};
  assert(te2.mib() == std::text_encoding::id::UTF8);
  assert(te2.name() == "utf-8"sv);

  // (2) 登録されていないエンコーディング名
  std::text_encoding te3{"WTF-8"};
  assert(te3.mib() == std::text_encoding::id::other);

  // (3) MIB値から構築
  std::text_encoding te4{std::text_encoding::id::ShiftJIS};
  assert(te4.mib() == std::text_encoding::id::ShiftJIS);
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
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
