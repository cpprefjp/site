# UTF-8エンコーディングされた文字の型として`char8_t`を追加 [P0482R6]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

UTF-8でエンコードされた文字を格納することを想定した型として、符号なし文字型`char8_t`型を追加する。

`char8_t`型は`unsigned char`型と同じ大きさ、アライメント、整数変換順位であるが、独立した型となっており、`char`や`unsigned char`とはオーバーロードで区別される。

`u8`プレフィックスの付いた文字/（生）文字列リテラルの型も`char`/`const char [n]`から`char8_t`/`const char8_t [n]`に変更になる。

[`<string>`](/reference/string.md)ヘッダには[`std::basic_string`](/reference/string/basic_string.md)`<char8_t>`の別名である[`std::u8string`](/reference/string/basic_string.md)型が追加される。同様にして[`<string_view>`](/reference/string_view.md)ヘッダには[`std::basic_string_view`](/reference/string_view/basic_string_view.md)`<char8_t>`の別名である[`std::u8string_view`](/reference/string_view/basic_string_view.md)型が追加される。

[`std::filesystem::path`](/reference/filesystem/path.md)クラスのコンストラクタに`char8_t`版のオーバーロードが追加され、代わりに必要なくなった[`std::filesystem::u8path()`](/reference/filesystem/u8path.md)関数は非推奨となる。

または破壊的変更として、以下の関数は、戻り値として`char`から`char8_t`の文字列を扱うよう変更される：

- [`std::filesystem::path::u8string()`](/reference/filesystem/path/u8string.md)
- [`std::filesystem::path::generic_u8string()`](/reference/filesystem/path/generic_u8string.md)
- [`std::basic_string`](/reference/string/basic_string.md)のリテラル演算子[`operator ""s`](/reference/string/basic_string/op_s.md)
- [`std::basic_string_view`](/reference/string_view/basic_string_view.md)のリテラル演算子[`operator ""sv`](/reference/string_view/basic_string_view/op_sv.md)

`char`系の(ナローマルチバイト)文字列と`char8_t`系の(UTF-8)文字列の変換のために、`<cuchar>`ヘッダに`std::mbrtoc8()`/`std::c8rtomb()`関数が追加される。

ただし、`basic_ostream<char>::operator<<()`と`basic_istream<char>::operator>>()`に対して`char8_t`のオーバーロードは追加されない。これは現状`char16_t`/`char32_t`型に対しても存在していないためである。正規表現も同様。


## 備考

[機能テストマクロ](../../lang/cpp20/feature_test_macros.md)は以下の通り。

| マクロ名            | 値       |
|---------------------|----------|
| `__cpp_char8_t`     | `201811` |
| `__cpp_lib_char8_t` | `201811` <br/> `201907` （P1423R3によって更新） |

## 例
```cpp example
#include <iostream>

template<typename> struct ct;
template<> struct ct<char> {
  using type = char;
};

int main()
{

  const auto *u8s = u8"text";   // u8sの型はC++17まではconst char *だったが、C++20からはconst char8_t *になる
  const char *ps = u8s;         // C++17までは適格だったがC++20からは不適格

  const auto *u8rs = u8R"(text)";   // u8rsの型はC++17まではconst char *だったが、C++20からはconst char8_t *になる
  const char *prs = u8rs;           // C++17までは適格だったがC++20からは不適格

  auto u8c = u8'c';             // u8cの型はC++17まではcharだったが、C++20からはchar8_tになる
  char *pc = &u8c;              // C++17までは適格だったがC++20からは不適格

  std::string s = u8"text";     // C++17までは適格だったがC++20からは不適格

  void f(const char *s);
  f(u8"text");                  // C++17までは適格だったがC++20からは不適格

  ct<decltype(u8'c')>::type x;  // C++17までは適格だったがC++20からは不適格
}
```

### 出力
```
```

## この機能が必要になった背景・経緯

C++の元になったC言語がISOで標準規格になる前から文字を格納する型として`char`型ないし`int`型が存在した。C++もこれを整理しつつ受け継いだ。

一方で8bitでは文字が収まらない文字エンコードも複数登場していた。日本語UNIX環境の開発から生まれたDEC漢字、その後Unixで普及したEUC、そしてUnicodeである。

C言語が初めて標準化された1989年、まだUnicodeはこんにちほど普及しておらず、どの文字エンコードが広く普及するのか、あるいは統一されることはないのか、見通すことはできない状況にあった。

結果としてANSI C89/ISO C90では`wchar_t`型を導入するものの、どのようなエンコードを扱うかは未規定とされた。C++98もこれを継承した。

2001年、Unicode側から`utf16_t`型を追加する提案があった。UTF-16に絞っているのはメモリー効率が良いこと、すでに当時、WindowsやJava、データベースがUTF-16に対応しており、UTF-16を保証する型が必要とされたからであった。これは採用されなかった。

その後絵文字の普及なども後押ししてUnicodeが世界中に普及した。

C++11では`char16_t`/`char32_t`型が追加された。しかしこの時UTF-8を保証する`char8_t`型は提案されなかった。下に示す江添亮氏の解説によればUTF-8は`char`型に格納すればよろしい、という考えによるものだ。

>[本の虫: C++標準化委員会の文書: P0370R1-P0379R0](https://cpplover.blogspot.com/2016/09/c-p0370r1-p0379r0.html)
>
>C++11のときにchar8_tが必要だと訴えたら、charは古典的にバイト列を表現する型なので十分だ。char型以外の型があるのは混乱する。などと理解のないUnicodeの世界に生きていない名だたる委員達から散々に批判された。

2017年11月にW3Techsによって行われた調査によれば90%を超えるWebサイトの文字エンコードにUTF-8が用いられるようになった。

一方でC++でUTF-8を扱うには問題があった。UTF-8のcode unitの値域は128 (0x80)から255 (0xFF)の範囲 (8ビット目) にも及んでいる一方で、C++の`char`型は符号の有無が未規定である。そのため、次のコードは意図した挙動を示さない可能性がある。

```cpp example
#include <iostream>

bool is_utf8_multibyte_code_unit(char c) {
  return c >= 0x80;
}

int main()
{
  std::cout << std::boolalpha << is_utf8_multibyte_code_unit(u8"あ"[0]) << std::endl;// => trueにならない可能性がある
}
```

この問題を回避するため、UTF-8の8ビット目の範囲を扱う必要がある場合は、`static_cast`で符号なし文字型に変換して扱わなければならなかった。

```cpp example
#include <iostream>

bool is_utf8_multibyte_code_unit(char c) {
  return static_cast<unsigned char>(c) >= 0x80;
}

int main()
{
    std::cout << std::boolalpha << is_utf8_multibyte_code_unit(u8"あ"[0]) << std::endl;// => true
}
```

またC++11で文字列リテラルに対して、C++17で文字リテラルに対して`u8`プレフィックスが使えるようになり、これはUTF-8でエンコードされることを保証したが、その文字型としては依然として`char`型が使われた。`char`型ではどのようなエンコードの文字が格納されているか型レベルで判断できず、例としてC++17で追加されたファイルシステムライブラリの[`path`](/reference/filesystem/path.md)クラスでは、UTF-8でエンコードされたパス文字列を受け取るためにコンストラクタと代入演算子でオーバーロードができず、[`u8path()`](/reference/filesystem/u8path.md)という関数を追加せざるをえなかった。

UTF-8の利用が広く利用されていく中で、C++でもUTF-8を扱う上で障害となる仕様を改める必要があった。そのために`char8_t`型が必要となった。


## 検討されたほかの選択肢

提案文書N3398では以下のように`char8_t`型を`unsigned char`型の別名にすることが提案されていた。

```cpp
typedef unsigned char char8_t;
```

以下のように`enum class`を利用する選択肢もあったが、提案文書P0372R0は`char8_t`型を使うためにヘッダのインクルードが必要になることは望ましくないと述べている。

```cpp
enum class char8_t : unsigned char {};
```


## <a id="relative-page" href="#relative-page">関連項目</a>

- [char16_tとchar32_t](/lang/cpp11/char16_32.md)
- [UTF-8文字列リテラル](/lang/cpp11/utf8_string_literals.md)
- [UTF-8文字リテラル](/lang/cpp17/utf8_character_literals.md)
- [`u8path`](/reference/filesystem/u8path.md)
- [`path::u8string`](/reference/filesystem/path/u8string.md)
- [`path::generic_u8string`](/reference/filesystem/path/generic_u8string.md)
- [`operator ""s`](/reference/string/basic_string/op_s.md)
- [`operator ""sv`](/reference/string_view/basic_string_view/op_sv.md)
- [`operator<<`](/reference/ostream/basic_ostream/op_ostream_free.md)

## 参照

### `char8_t`型を追加する提案文書

- [N3398: String Interoperation Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3398.html)
- [P0372R0: A type for utf-8 data](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0372r0.html)
- [P0482R0: char8_t: A type for UTF-8 characters and strings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0482r0.html)
- [P0482R1: char8_t: A type for UTF-8 characters and strings (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r1.html)
- [P0482R2: char8_t: A type for UTF-8 characters and strings (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r2.html)
- [P0482R3: char8_t: A type for UTF-8 characters and strings (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r3.html)
- [P0482R4: char8_t: A type for UTF-8 characters and strings (Revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r4.html)
- [P0482R5: char8_t: A type for UTF-8 characters and strings (Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r5.html)
- [P0482R6: char8_t: A type for UTF-8 characters and strings (Revision 6)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r6.html)


### その他

- [P1423R3: char8_t backward compatibility remediation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1423r3.html)
- [Proposal for a C/C++ language extension to support portable UTF-16](http://web.archive.org/web/20140701223639/http://www.unicode.org/~asmus/stdc-utf-16.txt)
- [char8_tによせて - なるせにっき](https://naruse.hateblo.jp/entry/2018/12/24/013446)