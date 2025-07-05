# vprint_nonunicode_buffered
* print[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void vprint_nonunicode_buffered(
         FILE* stream,
         string_view fmt,
         format_args args); // (1) C++26
}
```
* FILE[link /reference/cstdio/file.md]
* format_args[link /reference/format/basic_format_args.md]

## 概要
確保した文字列バッファに書式指定の出力を作ってから非Unicode出力する。


## 効果
- (1) : 以下と等価：
    ```cpp
    string out = vformat(fmt, args);
    vprint_nonunicode("{}", make_format_args(out));
    ```
    * string[link /reference/string/basic_string.md]
    * vformat[link /reference/format/vformat.md]
    * vprint_nonunicode[link vprint_nonunicode.md]
    * make_format_args[link /reference/format/make_format_args.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 18 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark noimpl]


## 関連項目
- [`std::print()`](print.md)
- [`std::println()`](println.md)
- [`std::vprint_nonunicode()`](vprint_nonunicode.md)


## 参照
- [P3107R5 Permit an efficient implementation of `std::print`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3107r5.html)
- [P3235R3 `std::print` more types faster with less memory](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3235r3.html)
