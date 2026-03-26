# text_encoding
* text_encoding[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  struct text_encoding;
}
```

## 概要
`std::text_encoding`クラスは、IANA文字集合レジストリに基づいてテキストエンコーディングを識別するクラスである。エンコーディング名、MIB番号（Management Information Base enumeration）、およびエイリアスによるエンコーディングの識別・比較機能を提供する。

このクラスは、ロケールに依存せずにエンコーディングを取得・比較する手段を提供する。従来のC++ではエンコーディング情報はロケール経由でしか取得できなかったが、`std::text_encoding`はロケールとは独立して動作する。

- [`literal()`](text_encoding/literal.md)は`consteval`関数であり、コンパイル時にリテラルエンコーディングを取得できる
- [`environment()`](text_encoding/environment.md)は`setlocale()`の影響を受けず、プログラム起動時の環境エンコーディングを返す
- [`environment_is()`](text_encoding/environment_is.md)により、特定のエンコーディングかどうかを効率的に判定できる

`std::text_encoding`はトリビアルコピー可能な型であり、例外を送出しない。`CHAR_BIT == 8`が要求される。

IANAに登録されていないエンコーディングも、[`id::other`](text_encoding/id.md)として名前で管理できる。


## メンバ関数

### 構築

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](text_encoding/op_constructor.md) | コンストラクタ | C++26 |

### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`mib`](text_encoding/mib.md) | MIB列挙値の取得 | C++26 |
| [`name`](text_encoding/name.md) | エンコーディング名の取得 | C++26 |
| [`aliases`](text_encoding/aliases.md) | エイリアス一覧の取得 | C++26 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`literal`](text_encoding/literal.md) | リテラルエンコーディングの取得 | C++26 |
| [`environment`](text_encoding/environment.md) | 環境エンコーディングの取得 | C++26 |
| [`environment_is`](text_encoding/environment_is.md) | 環境エンコーディングが指定したエンコーディングかを判定 | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`id`](text_encoding/id.md) | MIB列挙型 (enum class) | C++26 |
| [`aliases_view`](text_encoding/aliases_view.md) | エイリアスのビュー (class) | C++26 |


## メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr size_t max_name_length = 63;` | エンコーディング名の最大長 | C++26 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](text_encoding/op_equal.md) | 等値比較 | C++26 |
| [`operator!=`](text_encoding/op_equal.md) | 非等値比較 (`==`により使用可能) | C++26 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template<> struct hash<text_encoding>` | `hash`の特殊化 | C++26 |


## 説明専用メンバ

| 名前 | 説明 |
|------|------|
| `id mib_ = id::unknown;` | MIB値を保持する |
| `char name_[max_name_length + 1] = {0};` | エンコーディング名を保持する |
| [`comp-name`](text_encoding/comp-name.md) | エンコーディング名の比較（Unicode Technical Standard #22準拠） |


## 例
### エンコーディング情報の表示
```cpp example
#include <text_encoding>
#include <print>

void print(const std::text_encoding& enc) {
  std::println("{} (IANA MIB: {})", enc.name(), static_cast<int>(enc.mib()));
  std::println("Aliases:");
  for (auto&& alias : enc.aliases()) {
    std::println("  {}", alias);
  }
}

int main() {
  std::println("Literal encoding: ");
  ::print(std::text_encoding::literal());

  std::println("Environment encoding: ");
  ::print(std::text_encoding::environment());
}
```
* name()[link text_encoding/name.md]
* mib()[link text_encoding/mib.md]
* aliases()[link text_encoding/aliases.md]
* literal()[link text_encoding/literal.md]
* environment()[link text_encoding/environment.md]

#### 出力例
```
Literal encoding: UTF-8 (IANA MIB: 106)
Aliases:
  UTF-8
  csUTF8
Environment encoding: UTF-8 (IANA MIB: 106)
Aliases:
  UTF-8
  csUTF8
```

### エンコーディング名の指定
```cpp example
#include <text_encoding>
#include <cassert>
#include <string_view>

int main() {
  using namespace std::string_view_literals;

  // エンコーディング名から構築
  std::text_encoding my_utf8{"utf8"};
  assert(my_utf8.name() == "utf8"sv);
  assert(my_utf8.mib() == std::text_encoding::id::UTF8);

  // MIB値から構築
  std::text_encoding my_utf8_2{std::text_encoding::id::UTF8};
  assert(my_utf8_2.mib() == std::text_encoding::id::UTF8);

  // 異なる名前でも同じエンコーディングなら等値
  assert(my_utf8 == my_utf8_2);

  // 未登録のエンコーディングもサポート
  std::text_encoding wtf8{"WTF-8"};
  assert(wtf8.name() == "WTF-8"sv);
  assert(wtf8.mib() == std::text_encoding::id::other);
  // otherのMIBを持つエンコーディングは名前で比較される
  assert(wtf8 == std::text_encoding{"___wtf8__"});
}
```
* name()[link text_encoding/name.md]
* mib()[link text_encoding/mib.md]
* id::UTF8[link text_encoding/id.md]
* id::other[link text_encoding/id.md]

#### 出力
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
- [P2862R1 `text_encoding::name()` should never return null values](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2862r1.html)
- [IANA Character Sets](https://www.iana.org/assignments/character-sets/character-sets.xhtml)
