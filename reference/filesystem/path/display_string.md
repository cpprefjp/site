# display_string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
std::string display_string() const;
```

## 概要
表示に適したリテラルエンコーディングで、パス文字列を取得する。

[`std::format()`](/reference/format/format.md)や[`std::print()`](/reference/print/print.md)で出力するのに適した文字列を返す。


## 戻り値
以下と等価である：

```cpp
return std::format("{}", *this);
```
* std::format[link /reference/format/format.md]


## 備考
- 戻り値の文字列は、フォーマット ([`std::format()`](/reference/format/format.md)) や出力 ([`std::print()`](/reference/print/print.md)) で使用するのに適している
- リテラルエンコーディングがUTF-8であり、パスが妥当なUnicodeであれば (Windowsのほとんどのパスがそうである)、文字コード変換は無損失となる


## 例
```cpp example
#include <print>
#include <filesystem>
#include <string>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  std::string s = p.display_string();
  std::print("{}\n", s);
}
```
* p.display_string()[color ff0000]

### 出力
```
/usr/bin/clang
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`string()`](string.md) (システムのマルチバイト文字コードで取得する。C++26で非推奨)
- [`system_encoded_string()`](system_encoded_string.md) (システム依存エンコーディングで取得する)
- [`generic_display_string()`](generic_display_string.md) (環境非依存フォーマットで取得する)
- [`formatter`](formatter.md) ([`std::format()`](/reference/format/format.md)での書式)


## 参照
- [P2319R5 Prevent path presentation problems](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2319r5.html)
    - 表示用のリテラルエンコーディングで文字列を取得するこの関数がC++26で追加された
