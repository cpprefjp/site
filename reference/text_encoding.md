# text_encoding
* text_encoding[meta header]
* cpp26[meta cpp]

`<text_encoding>`ヘッダでは、テキストエンコーディングを識別するためのクラスおよび関数を定義する。

## 概要

C++プログラムにおけるテキストエンコーディングは、大きく以下の3種類に分けられる：

1. **リテラルエンコーディング**  : コンパイル時に決定される、文字列リテラルのエンコーディング
2. **環境エンコーディング**  : 実行時の環境（OS・シェル）が期待するエンコーディング
3. **ロケールエンコーディング**  : [`std::locale`](/reference/locale/locale.md)オブジェクトに関連付けられたエンコーディング

従来のC++では、これらのエンコーディングに関する情報はロケール経由でしか取得できず、実際の環境と一致しないことが多かった。`<text_encoding>`ヘッダは、ロケールに依存せずにエンコーディングを識別・比較する手段を提供する。

エンコーディングの識別には[IANA文字集合](https://www.iana.org/assignments/character-sets/character-sets.xhtml)レジストリを使用し、エンコーディング名・MIB番号・エイリアスによる相互運用性を確保する。

### リテラルエンコーディングとは

リテラルエンコーディング（ordinary literal encoding）とは、コンパイラが文字列リテラル（`"hello"`など）をオブジェクトファイルに書き込む際に使用するエンコーディングである。これはコンパイル時に決定され、[`std::text_encoding::literal()`](text_encoding/text_encoding/literal.md)で取得できる。`consteval`関数であるため、コンパイル時定数として使用できる。

各コンパイラにおけるリテラルエンコーディングの決定方法は以下の通り：

| コンパイラ | デフォルト | 変更方法 |
|-----------|-----------|---------|
| GCC | UTF-8 | `-fexec-charset=エンコーディング名` |
| Clang | UTF-8 | `-fexec-charset=エンコーディング名` |
| MSVC | システムのアクティブコードページ（日本語環境ではShift_JIS / CP932） | `/execution-charset:utf-8` または `/utf-8`（ソース・実行両方をUTF-8にする） |

日本語環境における注意点として、GCCおよびClangはデフォルトで UTF-8 を使用するが、MSVCは日本語Windowsのアクティブコードページ（Shift_JIS / Windows-31J, CP932）をデフォルトとする。そのため、MSVCでUTF-8リテラルを使いたい場合は明示的にオプションを指定する必要がある。

### 環境エンコーディングとは

環境エンコーディングとは、プログラムの実行環境が文字列の入出力に使用することを期待するエンコーディングである。[`std::text_encoding::environment()`](text_encoding/text_encoding/environment.md)で取得できる。

環境エンコーディングは以下のものに適用される：

- **コマンドライン引数** (`argv`)
- **環境変数** (`std::getenv()`で取得される値)
- **標準入出力** (リダイレクトされていない`stdin` / `stdout` / `stderr`)

環境エンコーディングは実行環境のプロパティであり、コンパイル環境ではない。クロスコンパイルの場合、リテラルエンコーディング（コンパイル環境で決定）と環境エンコーディング（実行環境で決定）は異なりうる。

各プラットフォームにおける環境エンコーディングの決定方法：

| プラットフォーム | 決定方法 |
|----------------|---------|
| Linux / macOS | POSIXロケール（空文字列`""`）に関連付けられたエンコーディング。環境変数`LC_CTYPE`、`LC_ALL`、`LANG`から決定される。近年のLinux / macOSでは多くの場合UTF-8 |
| Windows | `GetACP()`が返すアクティブコードページ。日本語環境ではCP932（Shift_JIS系） |

注意として、Windowsではコンソールのコードページ（`GetConsoleCP()`/`GetConsoleOutputCP()`で取得）が環境エンコーディングと異なる場合がある。`<text_encoding>`の環境エンコーディングはコンソールのコードページではなく、プロセスのアクティブコードページを返す。

[`std::text_encoding::environment()`](text_encoding/text_encoding/environment.md)は`setlocale()`の呼び出しに影響されないことが推奨されている。これは、プログラムの初期化時にCロケールが設定されることによって環境の情報が失われることを防ぐためである。

### ロケールに依存しないエンコーディング取得

従来のC++では、テキストエンコーディングの情報はロケールと結び付いていた。しかし、Unicodeモデルではエンコーディングとロケール（書式設定やテキスト変換のルール）は直交する概念である。

`std::text_encoding`クラスは、ロケールに依存せずにエンコーディングを取得・判定する手段を提供する：

- [`std::text_encoding::literal()`](text_encoding/text_encoding/literal.md)は`consteval`関数であり、ロケールとは完全に独立している
- [`std::text_encoding::environment()`](text_encoding/text_encoding/environment.md)は実行時関数だが、`setlocale()`の影響を受けない（推奨実装）
- [`std::text_encoding::environment_is()`](text_encoding/text_encoding/environment_is.md)により、特定のエンコーディングかどうかをロケール操作なしに判定できる

これにより、ロケールを変更することなく、環境が期待するエンコーディングを安全に取得できる。

## クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`text_encoding`](text_encoding/text_encoding.md) | テキストエンコーディングを識別するクラス (class) | C++26 |


## ユースケース

### C++26仕様でのユースケース

#### リテラルエンコーディングの確認

コンパイル時に文字列リテラルのエンコーディングがUTF-8であることを保証する：

```cpp example
#include <text_encoding>

// コンパイル時にリテラルエンコーディングを検証
static_assert(std::text_encoding::literal() == std::text_encoding::id::UTF8,
              "This program requires UTF-8 literal encoding");

int main() {}
```

#### 環境エンコーディングとリテラルエンコーディングの互換性確認

実行時に、リテラルエンコーディングと環境エンコーディングが一致するかを確認する：

```cpp example
#include <text_encoding>
#include <iostream>

int main() {
  if (std::text_encoding::literal() != std::text_encoding::environment()) {
    std::println(std::cerr,
                 "Warning: literal encoding ({}) differs from environment encoding ({})",
                 std::text_encoding::literal().name(),
                 std::text_encoding::environment().name());
  }
}
```

#### 外部ライブラリとの相互運用

ICU、iconv等のライブラリにエンコーディング名を渡す：

```cpp example
#include <text_encoding>
#include <format>
#include <cstdlib>

#include <iconv.h>

int main() {
  // iconvを使用してUTF-8から環境エンコーディングに変換
  iconv_t conv = iconv_open(
       std::text_encoding::environment().name(),
       "UTF-8");

  // ICUを使用する場合
  UErrorCode err;
  UConverter* converter = ucnv_open(
       std::text_encoding::environment().name(),
       &err);
}
```

#### µs表記の安全な使用

リテラルと出力先のエンコーディングがともにUTF-8である場合にのみ、µ記号を使用する：

```cpp example
#include <text_encoding>
#include <locale>
#include <print>

void print_microseconds(int count) {
  if constexpr (std::text_encoding::literal() == std::text_encoding::id::UTF8) {
    if (std::locale().encoding() == std::text_encoding::id::UTF8) {
      std::println("{}\u00B5s", count); // µs
      return;
    }
  }
  std::println("{}us", count);
}

int main() {
  print_microseconds(42);
}
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::locale::encoding()`](locale/locale/encoding.md) : ロケールに関連付けられたエンコーディングの取得


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
- [P2862R1 `text_encoding::name()` should never return null values](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2862r1.html)
- [IANA Character Sets](https://www.iana.org/assignments/character-sets/character-sets.xhtml)
- [Unicode Technical Standard #22: Unicode Character Mapping Markup Language](https://www.unicode.org/reports/tr22/)
