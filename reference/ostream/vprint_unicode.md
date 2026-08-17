# vprint_unicode
* ostream[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  void vprint_unicode(ostream& os,
                      string_view fmt,
                      format_args args); // (1) C++23
}
```
* ostream[link /reference/ostream/basic_ostream.md]
* format_args[link /reference/format/basic_format_args.md]

## 概要
書式指定でUnicode出力する。

- (1) : 指定した[`ostream`](basic_ostream.md)に、書式指定でUnicode出力する

デフォルトの標準出力に出力したい場合は、[`<print>`](/reference/print.md)ヘッダの[`std::vprint_unicode()`](/reference/print/vprint_unicode.md)関数を使用すること。


## 効果
- `os`の書式化出力関数として振る舞うが、以下の点が異なる：
    - 出力の生成失敗は、以下で規定されるように報告される
    - [`vformat()`](/reference/format/vformat.md)関数よって送出された例外は、[`os.exceptions()`](/reference/ios/basic_ios/exceptions.md)の値に関係なく、また`os`のエラー状態として[`ios_base`](/reference/ios/ios_base.md)`::`[`badbit`](/reference/ios/ios_base/type-iostate.md)をオンにすることなく、伝播される。
- `sentry`オブジェクトを構築した後、以下のように自動変数を初期化する：
    ```cpp
    string out = vformat(fmt, args);
    ```
    * string[link /reference/string/basic_string.md]
    * vformat[link /reference/format/vformat.md]

- `os`が、ネイティブUnicode API経由でのみUnicodeを表示できる端末（実装定義の方法で判定される）を参照するストリームである場合、`os`をフラッシュしてから、ネイティブのUnicode APIを使用して`out`を端末に書き出す。`out`に無効なコードユニットが含まれる場合、その動作は未定義である
- そうでなければ、`out`を`os`に書き出す


## 例外
- [`vformat()`](/reference/format/vformat.md)関数がなんらかの例外を送出する可能性がある
- 端末かストリームへの書き込みに失敗した場合、[`system_error`](/reference/system_error/system_error.md)を送出する
- [`bad_alloc`](/reference/new/bad_alloc.md)を送出する可能性がある


## 備考
- 推奨の方式：ネイティブのUnicode APIを呼び出す際に文字コード変換が必要な場合、実装はUnicode標準 (Unicode Standard Version 14.0 - Core Specification, Chapter 3.9) に従って無効なコードユニットを「U+FFFD REPLACEMENT CHARACTER」で置き換える必要がある


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 14 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]


## 関連項目
- [`std::print()`](print.md)
- [`std::println()`](println.md)
- [`std::vprint_nonunicode()`](vprint_nonunicode.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
- [P2539R4 Should the output of `std::print` to a terminal be synchronized with the underlying stream?](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2539r4.html)
- [LWG Issue 4044. Confusing requirements for `std::print` on POSIX platforms](https://cplusplus.github.io/LWG/issue4044)
    - C++26で、ネイティブUnicode API経由でのみUnicodeを表示できる端末に限ってネイティブAPIで書き出すことを明確化し、フラッシュのタイミングと書き出し処理を統合した
