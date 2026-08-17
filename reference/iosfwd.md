# iosfwd
* iosfwd[meta header]

`<iosfwd>`ヘッダは、入出力ライブラリ（`<ios>`、`<streambuf>`、`<istream>`、`<ostream>`、`<sstream>`、`<spanstream>`、`<fstream>`、`<syncstream>`）で定義されるクラステンプレートおよびそれらの型の別名の、先行宣言（*forward declaration*）を提供する。

各クラスの完全な定義を必要とせず、宣言のみで十分な場面（関数の宣言や、ポインタ・参照のみを扱うヘッダなど）でこのヘッダをインクルードすることで、実体を定義するヘッダ全体をインクルードするよりもコンパイル時間を短縮できる。


## クラステンプレート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`char_traits`](string/char_traits.md) | 文字特性 (class template) | |
| [`basic_ios`](ios/basic_ios.md) | 入出力共通の基底クラス (class template) | |
| [`basic_streambuf`](streambuf/basic_streambuf.md) | ストリームバッファ (class template) | |
| [`basic_istream`](istream/basic_istream.md) | 入力ストリーム (class template) | |
| [`basic_ostream`](ostream/basic_ostream.md) | 出力ストリーム (class template) | |
| [`basic_iostream`](istream/basic_iostream.md) | 入出力ストリーム (class template) | |
| [`basic_stringbuf`](sstream/basic_stringbuf.md) | 文字列ストリームバッファ (class template) | |
| [`basic_istringstream`](sstream/basic_istringstream.md) | 入力文字列ストリーム (class template) | |
| [`basic_ostringstream`](sstream/basic_ostringstream.md) | 出力文字列ストリーム (class template) | |
| [`basic_stringstream`](sstream/basic_stringstream.md) | 入出力文字列ストリーム (class template) | |
| [`basic_spanbuf`](spanstream/basic_spanbuf.md) | `std::span`上のストリームバッファ (class template) | C++23 |
| [`basic_ispanstream`](spanstream/basic_ispanstream.md) | `std::span`上の入力ストリーム (class template) | C++23 |
| [`basic_ospanstream`](spanstream/basic_ospanstream.md) | `std::span`上の出力ストリーム (class template) | C++23 |
| [`basic_spanstream`](spanstream/basic_spanstream.md) | `std::span`上の入出力ストリーム (class template) | C++23 |
| [`basic_filebuf`](fstream/basic_filebuf.md) | ファイルストリームバッファ (class template) | |
| [`basic_ifstream`](fstream/basic_ifstream.md) | 入力ファイルストリーム (class template) | |
| [`basic_ofstream`](fstream/basic_ofstream.md) | 出力ファイルストリーム (class template) | |
| [`basic_fstream`](fstream/basic_fstream.md) | 入出力ファイルストリーム (class template) | |
| [`basic_syncbuf`](syncstream/basic_syncbuf.md) | 同期化ストリームバッファ (class template) | C++20 |
| [`basic_osyncstream`](syncstream/basic_osyncstream.md) | 同期化出力ストリーム (class template) | C++20 |
| [`istreambuf_iterator`](iterator/istreambuf_iterator.md) | 入力ストリームバッファイテレータ (class template) | |
| [`ostreambuf_iterator`](iterator/ostreambuf_iterator.md) | 出力ストリームバッファイテレータ (class template) | |
| [`fpos`](ios/fpos.md) | ストリーム上の位置を表現する型 (class template) | |


## 型の別名

`char`版と`wchar_t`版の別名が定義される。

| 名前 | 定義 | 対応バージョン |
|------|------|----------------|
| `ios` / `wios` | [`basic_ios`](ios/basic_ios.md)`<char>` / `<wchar_t>` | |
| `streambuf` / `wstreambuf` | [`basic_streambuf`](streambuf/basic_streambuf.md)`<char>` / `<wchar_t>` | |
| `istream` / `wistream` | [`basic_istream`](istream/basic_istream.md)`<char>` / `<wchar_t>` | |
| `ostream` / `wostream` | [`basic_ostream`](ostream/basic_ostream.md)`<char>` / `<wchar_t>` | |
| `iostream` / `wiostream` | [`basic_iostream`](istream/basic_iostream.md)`<char>` / `<wchar_t>` | |
| `stringbuf` / `wstringbuf` | [`basic_stringbuf`](sstream/basic_stringbuf.md)`<char>` / `<wchar_t>` | |
| `istringstream` / `wistringstream` | [`basic_istringstream`](sstream/basic_istringstream.md)`<char>` / `<wchar_t>` | |
| `ostringstream` / `wostringstream` | [`basic_ostringstream`](sstream/basic_ostringstream.md)`<char>` / `<wchar_t>` | |
| `stringstream` / `wstringstream` | [`basic_stringstream`](sstream/basic_stringstream.md)`<char>` / `<wchar_t>` | |
| `spanbuf` / `wspanbuf` | [`basic_spanbuf`](spanstream/basic_spanbuf.md)`<char>` / `<wchar_t>` | C++23 |
| `ispanstream` / `wispanstream` | [`basic_ispanstream`](spanstream/basic_ispanstream.md)`<char>` / `<wchar_t>` | C++23 |
| `ospanstream` / `wospanstream` | [`basic_ospanstream`](spanstream/basic_ospanstream.md)`<char>` / `<wchar_t>` | C++23 |
| `spanstream` / `wspanstream` | [`basic_spanstream`](spanstream/basic_spanstream.md)`<char>` / `<wchar_t>` | C++23 |
| `filebuf` / `wfilebuf` | [`basic_filebuf`](fstream/basic_filebuf.md)`<char>` / `<wchar_t>` | |
| `ifstream` / `wifstream` | [`basic_ifstream`](fstream/basic_ifstream.md)`<char>` / `<wchar_t>` | |
| `ofstream` / `wofstream` | [`basic_ofstream`](fstream/basic_ofstream.md)`<char>` / `<wchar_t>` | |
| `fstream` / `wfstream` | [`basic_fstream`](fstream/basic_fstream.md)`<char>` / `<wchar_t>` | |
| `syncbuf` / `wsyncbuf` | [`basic_syncbuf`](syncstream/basic_syncbuf.md)`<char>` / `<wchar_t>` | C++20 |
| `osyncstream` / `wosyncstream` | [`basic_osyncstream`](syncstream/basic_osyncstream.md)`<char>` / `<wchar_t>` | C++20 |
| `streampos` | [`fpos`](ios/fpos.md)`<`[`char_traits`](string/char_traits.md)`<char>::state_type>` | |
| `wstreampos` | [`fpos`](ios/fpos.md)`<`[`char_traits`](string/char_traits.md)`<wchar_t>::state_type>` | |
| `u8streampos` | [`fpos`](ios/fpos.md)`<`[`char_traits`](string/char_traits.md)`<char8_t>::state_type>` | C++20 |
| `u16streampos` | [`fpos`](ios/fpos.md)`<`[`char_traits`](string/char_traits.md)`<char16_t>::state_type>` | C++11 |
| `u32streampos` | [`fpos`](ios/fpos.md)`<`[`char_traits`](string/char_traits.md)`<char32_t>::state_type>` | C++11 |


## 備考
- このヘッダは、上記の型のデフォルトテンプレート引数を含んだ宣言を提供する。同じ既定引数は各実体定義ヘッダにも現れるが、`<iosfwd>`とそれらのヘッダを同時にインクルードしても適格である。


## バージョン
### 言語
- C++98


## 関連項目
- [`<ios>`](ios.md)
- [`<streambuf>`](streambuf.md)
- [`<istream>`](istream.md)
- [`<ostream>`](ostream.md)
- [`<sstream>`](sstream.md)
- [`<spanstream>`](spanstream.md)
- [`<fstream>`](fstream.md)
- [`<syncstream>`](syncstream.md)


## 参照
- [LWG Issue 4440. Forward declarations of entities need also in entries](https://cplusplus.github.io/LWG/issue4440)
    - C++26で、`__cpp_lib_char8_t`・`__cpp_lib_spanstream`・`__cpp_lib_syncbuf`の機能テストマクロの定義ヘッダに`<iosfwd>`が追加された（`<iosfwd>`がこれらに関連するエンティティの先行宣言を含むため）
