# operator=
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& operator=(const path& p);        // (1)
path& operator=(path&& p) noexcept;    // (2)
path& operator=(string_type&& source); // (3)

template <class Source>
path& operator=(const Source& source); // (4)
```

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 内部表現としての文�列オブジェクトを代入する
- (4) : あらゆる文�型・文�コードの文�配列、文�列オブジェクトを代入する


## 要件
- (4) : `Source`型は、以下の要件を満たすこと
    - 文�型`char`、`wchar_t`、`char8_t`、`char16_t`、`char32_t`を`EcharT`として、
    - [`std::basic_string`](/reference/string/basic_string.md)<EcharT, traits, Allocator>`
    - [`std::basic_string_view`](/reference/string_view/basic_string_view.md)`<EcharT, traits>`
    - `ECharT`型を要素とする文�配列と、文�配列へのポインタ
    - これらの要件を満たさない場合、この関数はオーバー�ード解決の候補から除外される
    - `source`はヌルポインタであってはならない


## 効果
- (1) : `*this`と`p`が同じオブジェクトである場合は、なにもしない。そうでなければ、`*this`が現在保持しているパスを破棄して、`p`をコピーして`*this`に保持する
- (2) : `*this`と`p`が同じオブジェクトである場合は、なにもしない。そうでなければ、[`swap`](swap.md)`(p)`を呼び出す。この関数を呼び出したあと、`p`は「有効だが未規定の状態」となる
- (3) : `source`のパスフォーマットを検出して内部用に変換し、`*this`にムーブ代入する。この関数を呼び出したあと、`source`は「有効だが未規定の状態」となる
- (4) : `source`のパスフォーマットを検出して内部用に変換し、`*this`にそのパスのコピーを保持する


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
  // コピー代入
  {
    fs::path p = "a/b/c";
    fs::path q;
    q = p;
    assert(p == q);
  }

  // (2)
  // ムーブ代入
  {
    fs::path p = "a/b/c";
    fs::path q;
    q = std::move(p);
    assert(q.generic_string() == "a/b/c");
  }

  // (3)
  // 内部表現形式のbasic_stringを代入。
  // この文�列は、システムのファイルシステムが規定する文�コードを持つこと。
  // POSIXではstd::string、Windowsではstd::wstring。
  // ここではPOSIX環境であるとしてstd::stringを使用する
  {
    std::string raw_path = "a/b/c";

    fs::path p;
    p = std::move(raw_path);
    assert(p.generic_string() == "a/b/c");
  }

  // (4)
  // 文�コード規定の文�配列、文�列オブジェクトを代入。
  // Windows環境では、この方法ではUTF-8文�列を代入してはならない
  // (std::filesystem::u8path()関数で変換したパスを代入すること)
  {
    fs::path p1;
    p1 = "a/b/c"; // システムのマルチバイト文�コードの文�配列を代入

    fs::path p2;
    p2 = L"a/b/c"; // システムのワイド文�コードの文�配列を代入

    fs::path p3;
    p3 = u"a/b/c"; // UTF-16エンコーディングの文�配列を代入

    fs::path p4;
    p4 = U"a/b/c"; // UTF-32エンコーディングの文�配列を代入

    std::string p5_base = "a/b/c";
    fs::path p5;
    p5 = p5_base; // システムのマルチバイト文�コードのstringオブジェクトを代入

    std::wstring p6_base = L"a/b/c";
    fs::path p6;
    p6 = p6_base; // システムのワイド文�コードのwstringオブジェクトを代入

    std::u16string p7_base = u"a/b/c";
    fs::path p7;
    p7 = p7_base; // u16stringオブジェクトを代入

    std::u32string p8_base = U"a/b/c";
    fs::path p8;
    p8 = p8_base; // u32stringオブジェクトを代入

    std::string_view p9_base = "a/b/c";
    fs::path p9;
    p9 = p9_base; // システムのマルチバイト文�コードの文�列を参照するstring_viewオブジェクトを代入

    std::wstring_view p10_base = L"a/b/c";
    fs::path p10;
    p10 = p10_base; // システムのワイド文�コードの文�列を参照するwstring_viewオブジェクトを代入

    std::u16string_view p11_base = u"a/b/c";
    fs::path p11;
    p11 = p11_base; // UTF-16エンコーディングの文�列を参照するu16string_viewオブジェクトを代入

    std::u32string_view p12_base = U"a/b/c";
    fs::path p12;
    p12 = p12_base; // UTF-32エンコーディングの文�列を参照するu32string_viewオブジェクトを代入
  }
}
```
* std::move[link /reference/utility/move.md]
* p.generic_string()[link generic_string.md]

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
