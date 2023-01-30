# print
* print[meta header]
* cpp23[meta cpp]

`<print>`ヘッダでは、書式指定で出力する機能を定義する。

このヘッダでは、デフォルトの出力先、および`FILE*`指定のオーバーロードが定義される。[`std::ostream`](/reference/ostream/basic_ostream.md)指定のオーバーロードは[`<ostream>`](ostream.md)で定義される。


| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`print`](print/print.md) | 書式指定で出力する (function template) | C++23 |
| [`println`](print/println.md) | 書式指定で出力する。末尾改行付き (function template) | C++23 |
| [`vprint_unicode`](print/vprint_unicode.md) | 書式指定でUnicode出力する (function) | C++23 |
| [`vprint_nonunicode`](print/vprint_nonunicode.md) | 書式指定で非Unicode出力する (function) | C++23 |

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`<ostream>`](ostream.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
