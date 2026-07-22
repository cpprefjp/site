# generic_string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]
* cpp26deprecated[meta cpp]

```cpp
template <class EcharT,
          class traits = std::char_traits<EcharT>,
          class Allocator = std::allocator<EcharT>>
std::basic_string<EcharT, traits, Allocator>
  generic_string(const Allocator& a = Allocator()) const; // (1)

std::string generic_string() const;                       // (2)
```

(2)は、C++26で非推奨となった。システム依存エンコーディングへの変換であることを明確にした[`generic_system_encoded_string()`](generic_system_encoded_string.md)、もしくは表示に適した[`generic_display_string()`](generic_display_string.md)を使用すること。


## 概要
- (1) : 指定された文字型に対応する文字コードで、環境非依存パスフォーマットのパス文字列を取得する
- (2) : システムのマルチバイト文字コードで、環境非依存パスフォーマットのパス文字列を取得する


## 戻り値
`*this`が保持するシステムの環境非依存フォーマットを持つパスを、指定された文字型の文字コードで返す。

(1) の場合、戻り値の文字列をメモリアロケートするために、パラメータ`a`のアロケータを使用する。


## 備考
- (1) :
    - `ECharT`が`char`の場合、システムのマルチバイト文字コードとなる (POSIXベースシステムではUTF-8、Windowsの日本語環境ではCP932)
    - `ECharT`が`wchar_t`の場合、システムのワイド文字コードとなる (WindowsではUTF-16)
    - `ECharT`が`char8_t`の場合、UTF-8エンコーディングとなる
    - `ECharT`が`char16_t`の場合、UTF-16エンコーディングとなる
    - `ECharT`が`char32_t`の場合、UTF-32エンコーディングとなる
- (2) :
    - POSIXベースシステムではUTF-8、Windowsの日本語環境ではCP932文字コードとなる


## 非推奨の詳細 (C++26)
(2)が返すシステム依存のパス名エンコーディングは、[iostream](/reference/iostream.md)・[`std::format()`](/reference/format/format.md)・[`std::print()`](/reference/print/print.md)を含むほぼすべての標準のテキスト処理・入出力機能と互換性がなく、文字化けやデータ損失の原因になりやすい。C++26ではこの問題を避けるために(2)が非推奨となり、用途に応じて以下の代替関数が追加された：

- レガシーなシステムAPIにパスを渡す場合 : [`generic_system_encoded_string()`](generic_system_encoded_string.md) ((2)と同じ動作)
- 表示・フォーマットする場合 : [`generic_display_string()`](generic_display_string.md)、[`std::format()`](/reference/format/format.md)、[`std::print()`](/reference/print/print.md)

なお、テンプレート版である(1)は非推奨となっていない。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>
#include <string>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  // (1)
  {
    const std::string s = p.generic_string<char>();
    const std::wstring ws = p.generic_string<wchar_t>();
    const std::u16string utf16s = p.generic_string<char16_t>();
    const std::u32string utf32s = p.generic_string<char32_t>();

    std::cout << s << std::endl;
  }

  // (2)
  {
    const std::string s = p.generic_string();
    std::cout << s << std::endl;
  }
}
```
* p.generic_string[color ff0000]

#### 出力
```
/usr/bin/clang
/usr/bin/clang
```


### Windowsでの例
```cpp
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "foo\\bar"; // ネイティブフォーマットのパス (ディレクトリ区切り文字がバックスラッシュ)

  // (1)
  {
    const std::string s = p.generic_string<char>();
    const std::wstring ws = p.generic_string<wchar_t>();
    const std::u16string utf16s = p.generic_string<char16_t>();
    const std::u32string utf32s = p.generic_string<char32_t>();

    std::cout << s << std::endl;
  }

  // (2)
  {
    const std::string s = p.generic_string();
    std::cout << s << std::endl;
  }
}
```
* p.generic_string[color ff0000]

#### 出力
```
foo/bar
foo/bar
```



## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 関連項目
- [`generic_system_encoded_string()`](generic_system_encoded_string.md) (システム依存エンコーディングで取得する。(2)の代替)
- [`generic_display_string()`](generic_display_string.md) (表示用のリテラルエンコーディングで取得する)


## 参照
- [P2319R5 Prevent path presentation problems](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2319r5.html)
    - 非テンプレート版の(2)がC++26で非推奨となり、[`generic_system_encoded_string()`](generic_system_encoded_string.md)・[`generic_display_string()`](generic_display_string.md)が代替として追加された
