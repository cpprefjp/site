# コンストラクタ
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path() noexcept;                                      // (1)
path(const path& p);                                  // (2)
path(path&& p) noexcept;                              // (3)
path(string_type&& source, format fmt = auto_format); // (4)

template <class Source>
path(const Source& source, format fmt = auto_format); // (5)

template <class InputIterator>
path(InputIterator first, InputIterator last,
     format fmt = auto_format);                       // (6)

template <class Source>
path(const Source& source, const locale& loc,
     format fmt = auto_format);                       // (7)

template <class InputIterator>
path(InputIterator first, InputIterator last,
     const locale& loc, format fmt = auto_format);    // (8)
```
* format[link format.md]
* auto_format[link format.md]
* locale[link /reference/locale/locale.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : 内部表現としての文字列オブジェクトを代入する
- (5) : あらゆる文字型・文字コードの文字配列、文字列オブジェクトを代入する
- (6) : あらゆる文字型・文字コードの文字範囲を代入する
- (7) : ロケールを考慮して、あらゆる文字型・文字コードの文字配列、文字列オブジェクトを代入する
- (8) : ロケールを考慮して、あらゆる文字型・文字コードの文字配列、文字列オブジェクトを代入する


## 要件
- 文字型`char`、`wchar_t`、`char8_t`, `char16_t`、`char32_t`を`EcharT`として、
- (5), (7) : `Source`型は、以下の要件を満たすこと
    - [`std::basic_string`](/reference/string/basic_string.md)`<EcharT, traits, Allocator>`
    - [`std::basic_string_view`](/reference/string_view/basic_string_view.md)`<EcharT, traits>`
    - `ECharT`型を要素とする文字配列と、文字配列へのポインタ
    - これらの要件を満たさない場合、この関数はオーバーロード解決の候補から除外される
    - `source`はヌルポインタであってはならない
- (6), (8) : `InputIterator`が指す値型は`EcharT`であること
- (7), (8) : 要素となる文字型が`char`であること


## 効果
- (1) : 空のパスを生成する
- (2) : `p`の保持するパスを`*this`にコピーする
- (3) : `p`の保持するパスを`*this`に移動する。このコンストラクタ呼び出しのあと、`p`は「有効だが未規定の状態」となる
- (4) : 必要であればパスのフォーマットを変換し、`source`を`*this`に移動する。このコンストラクタ呼び出しのあと、`source`は「有効だが未規定の状態」となる
- (5) : 必要であればパスのフォーマットを変換し、`source`を`*this`にコピーする
- (6) : イテレータ範囲`[first, last)`をパス文字列とし、必要であればパスのフォーマットを変換て、そのコピーを`*this`にコピーする
- (7) :
    - `path`クラスの`value_type`が`wchar_t`であれば、[`std::codecvt`](/reference/locale/codecvt.md)`<wchar_t, char, mbstate_t>`ファセットを使用して、`source`をシステムのワイド文字コードに変換をする。そうでなければ、同ファセットを使用して、システムのマルチバイト文字コードに変換をする
    - さらに必要であればパスのフォーマットを変換し、その結果を`*this`にコピーする
- (8) :
    - `path`クラスの`value_type`が`wchar_t`であれば、[`std::codecvt`](/reference/locale/codecvt.md)`<wchar_t, char, mbstate_t>`ファセットを使用して、イテレータ範囲`[first, last)`のパス文字列をシステムのワイド文字コードに変換をする。そうでなければ、同ファセットを使用して、システムのマルチバイト文字コードに変換をする
    - さらに必要であればパスのフォーマットを変換し、その結果を`*this`にコピーする


## 事後条件
- (1) : [`empty()`](empty.md) `== true`


## 備考
- C++17までは、これらのコンストラクタにUTF-8エンコーディング（`u8""`リテラル等）でパス文字列を指定してはならない。そのような用途には、[`std::filesystem::u8path()`](/reference/filesystem/u8path.md)関数を使用すること
    - C++20以降は、`char8_t`型として型によって文字のエンコーディングを判別できるようになったため、`char8_t`文字列によって表現されたUTF-8エンコーディングのパス文字列からの構築をサポートしている
- (1) : このクラスはメンバ変数として`string_type`型のオブジェクトを持つ。[`std::basic_string`](/reference/string/basic_string.md)クラスのデフォルトのアロケータである[`std::allocator`](/reference/memory/allocator.md)クラスは、デフォルトコンストラクタで例外を送出しない。そのため、`path`クラスのデフォルトコンストラクタもまた例外を決して送出しない


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // (1)
  // デフォルト構築
  {
    fs::path p{};
    assert(p.empty());
  }

  // (2)
  // コピー構築
  {
    fs::path p = "a/b/c";
    fs::path q = p;
    assert(p == q);
  }

  // (3)
  // ムーブ構築
  {
    fs::path p = "a/b/c";
    fs::path q = std::move(p);
    assert(q.generic_string() == "a/b/c");
  }

  // (4)
  // 内部表現形式のbasic_stringで構築。
  // この文字列は、システムのファイルシステムが規定する文字コードを持つこと。
  // POSIXではstd::string、Windowsではstd::wstring。
  // ここではPOSIX環境であるとしてstd::stringを使用する
  {
    std::string raw_path = "a/b/c";
    fs::path p = std::move(raw_path);
    assert(p.generic_string() == "a/b/c");
  }

  // (5)
  // 文字コード規定の文字配列、文字列オブジェクトから構築。
  // Windows環境では、この方法ではUTF-8文字列を代入してはならない
  // (std::filesystem::u8path()関数で変換したパスを代入すること)
  {
    fs::path p1 = "a/b/c";  // システムのマルチバイト文字コードの文字配列を代入
    fs::path p2 = L"a/b/c"; // システムのワイド文字コードの文字配列を代入
    fs::path p3 = u"a/b/c"; // UTF-16エンコーディングの文字配列を代入
    fs::path p4 = U"a/b/c"; // UTF-32エンコーディングの文字配列を代入

    std::string p5_base = "a/b/c";
    fs::path p5 = p5_base; // システムのマルチバイト文字コードのstringオブジェクトを代入

    std::wstring p6_base = L"a/b/c";
    fs::path p6 = p6_base; // システムのワイド文字コードのwstringオブジェクトを代入

    std::u16string p7_base = u"a/b/c";
    fs::path p7 = p7_base; // u16stringオブジェクトを代入

    std::u32string p8_base = U"a/b/c";
    fs::path p8 = p8_base; // u32stringオブジェクトを代入

    std::string_view p9_base = "a/b/c";
    fs::path p9 = p9_base; // システムのマルチバイト文字コードの文字列を参照するstring_viewオブジェクトを代入

    std::wstring_view p10_base = L"a/b/c";
    fs::path p10 = p10_base; // システムのワイド文字コードの文字列を参照するwstring_viewオブジェクトを代入

    std::u16string_view p11_base = u"a/b/c";
    fs::path p11 = p11_base; // UTF-16エンコーディングの文字列を参照するu16string_viewオブジェクトを代入

    std::u32string_view p12_base = U"a/b/c";
    fs::path p12 = p12_base; // UTF-32エンコーディングの文字列を参照するu32string_viewオブジェクトを代入

    // C++20以降
    std::u8string_view p13_base = u8"a/b/c";
    fs::path p13 = p13_base; // UTF-8エンコーディングの文字列を参照するu8string_viewオブジェクトを代入
  }

  // (6)
  // 文字範囲から構築
  {
    // システムのマルチバイト文字コードの文字範囲を代入
    std::string p1_base = "a/b/c";
    fs::path p1 {p1_base.begin(), p1_base.end()};

    const char* p2_base = "a/b/c";
    fs::path p2 {p2_base, p2_base + std::char_traits<char>::length(p2_base)};
  }
}
```
* std::move[link /reference/utility/move.md]
* p.generic_string()[link generic_string.md]
* p1_base.begin()[link /reference/string/basic_string/begin.md]
* p1_base.end()[link /reference/string/basic_string/end.md]
* length[link /reference/string/char_traits/length.md]
* std::filesystem::u8path()[link /reference/filesystem/u8path.md]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 関連項目
- [`u8path()`](/reference/filesystem/u8path.md)
