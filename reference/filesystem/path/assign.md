# assign
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& assign(string_type&& source);                    // (1)

template <class Source>
path& assign(const Source& source);                    // (2)

template <class InputIterator>
path& assign(InputIterator first, InputIterator last); // (3)
```

## 概要
- (1) : 内部表現としての文�列オブジェクトを代入する
- (2) : あらゆる文�型・文�コードの文�配列、文�列オブジェクトを代入する
- (3) : あらゆる文�型・文�コードの文�範囲を代入する


## 要件
- 文�型`char`、`wchar_t`、`char8_t`、`char16_t`、`char32_t`を`EcharT`として、
- (2) : `Source`型は、以下の要件を満たすこと
    - [`std::basic_string`](/reference/string/basic_string.md)<EcharT, traits, Allocator>`
    - [`std::basic_string_view`](/reference/string_view/basic_string_view.md)`<EcharT, traits>`
    - `ECharT`型を要素とする文�配列と、文�配列へのポインタ
    - これらの要件を満たさない場合、この関数はオーバー�ード解決の候補から除外される
    - `source`はヌルポインタであってはならない
- (3) : `InputIterator`が指す値型は`EcharT`であること


## 効果
- (1) : `source`のパスフォーマットを検出して内部用に変換し、`*this`にムーブ代入する。この関数を呼び出したあと、`source`は「有効だが未規定の状態」となる
- (2) : `source`のパスフォーマットを検出して内部用に変換し、`*this`にそのパスのコピーを保持する
- (3) : 範囲`[first, last)`を`path source{first, last};`として、`source`のパスフォーマットを検出して内部用に変換し、`*this`にそのパスのコピーを保持する


## 戻り値
`*this`


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // (1)
  // 内部表現形式のbasic_stringを代入。
  // この文�列は、システムのファイルシステムが規定する文�コードを持つこと。
  // POSIXではstd::string、Windowsではstd::wstring。
  // ここではPOSIX環境であるとしてstd::stringを使用する
  {
    std::string raw_path = "a/b/c";

    fs::path p;
    p.assign(std::move(raw_path));
    assert(p.generic_string() == "a/b/c");
  }

  // (2)
  // 文�コード規定の文�配列、文�列オブジェクトを代入。
  // Windows環境では、この方法ではUTF-8文�列を代入してはならない
  // (std::filesystem::u8path()関数で変換したパスを代入すること)
  {
    fs::path p1;
    p1.assign("a/b/c"); // システムのマルチバイト文�コードの文�配列を代入

    fs::path p2;
    p2.assign(L"a/b/c"); // システムのワイド文�コードの文�配列を代入

    fs::path p3;
    p3.assign(u"a/b/c"); // UTF-16エンコーディングの文�配列を代入

    fs::path p4;
    p4.assign(U"a/b/c"); // UTF-32エンコーディングの文�配列を代入

    std::string p5_base = "a/b/c";
    fs::path p5;
    p5.assign(p5_base); // システムのマルチバイト文�コードのstringオブジェクトを代入

    std::wstring p6_base = L"a/b/c";
    fs::path p6;
    p6.assign(p6_base); // システムのワイド文�コードのwstringオブジェクトを代入

    std::u16string p7_base = u"a/b/c";
    fs::path p7;
    p7.assign(p7_base); // u16stringオブジェクトを代入

    std::u32string p8_base = U"a/b/c";
    fs::path p8;
    p8.assign(p8_base); // u32stringオブジェクトを代入

    std::string_view p9_base = "a/b/c";
    fs::path p9;
    p9.assign(p9_base); // システムのマルチバイト文�コードの文�列を参照するstring_viewオブジェクトを代入

    std::wstring_view p10_base = L"a/b/c";
    fs::path p10;
    p10.assign(p10_base); // システムのワイド文�コードの文�列を参照するwstring_viewオブジェクトを代入

    std::u16string_view p11_base = u"a/b/c";
    fs::path p11;
    p11.assign(p11_base); // UTF-16エンコーディングの文�列を参照するu16string_viewオブジェクトを代入

    std::u32string_view p12_base = U"a/b/c";
    fs::path p12;
    p12.assign(p12_base); // UTF-32エンコーディングの文�列を参照するu32string_viewオブジェクトを代入
  }

  // (3)
  // 文�範囲を代入
  {
    // システムのマルチバイト文�コードの文�範囲を代入
    std::string p1_base = "a/b/c";
    fs::path p1;
    p1.assign(p1_base.begin(), p1_base.end());

    const char* p2_base = "a/b/c";
    fs::path p2;
    p2.assign(p2_base, p2_base + std::char_traits<char>::length(p2_base));
  }
}
```
* assign[color ff0000]
* std::move[link /reference/utility/move.md]
* p.generic_string()[link generic_string.md]
* p1_base.begin()[link /reference/string/basic_string/begin.md]
* p1_base.end()[link /reference/string/basic_string/end.md]
* length[link /reference/string/char_traits/length.md]
* std::filesystem::u8path()[link /reference/filesystem/u8path.md]

#### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
