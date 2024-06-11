# vprint_nonunicode
* ostream[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  void vprint_nonunicode(ostream& os,
                         string_view fmt,
                         format_args args); // (1) C++23
}
```
* ostream[link basic_ostream.md]
* format_args[link /reference/format/basic_format_args.md]

## 概要
書式指定で非Unicode出力する。

- (1) : 指定した[`ostream`](basic_ostream.md)に、書式指定で非Unicode出力する

デフォルトの標準出力に出力したい場合は、[`<print>`](/reference/print.md)ヘッダの[`std::vprint_nonunicode()`](/reference/print/vprint_nonunicode.md)関数を使用すること。


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

- 文字シーケンス `[`[`out.begin()`](/reference/string/basic_string/begin.md)`,` [`out.end()`](/reference/string/basic_string/end.md)`)` を `os` に挿入する。端末への書き込みまたは `os` への挿入が失敗した場合、[`os.setstate`](/reference/ios/basic_ios.md)`(`[`ios_base`](/reference/ios/ios_base.md)`::`[`badbit`](/reference/ios/ios_base/type-iostate.md)`)` を呼び出す ([`ios_base`](/reference/ios/ios_base.md)`::`[`failure`](/reference/ios/ios_base/failure.md)が送出される可能性がある)


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
- [`std::vprint_unicode()`](vprint_unicode.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
