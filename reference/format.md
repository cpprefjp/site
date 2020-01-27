# format

* format[meta header]
* cpp20[meta cpp]

`<format>`ヘッダでは、書式文�列を使って引数をフォーマットする、いわゆる`printf`スタイルのフォーマット関数を提供する。
このフォーマット関数は型安全であり、ユーザー定義型への拡張も可能である。

書式文�列については[`format`](format/format.md)を参照。

## フォーマット関数

| 名前                                                 | 説明                                                                                                                 | 対応バージョン |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|----------------|
| [`format`](format/format.md)                         | 書式文�列を使って引数をフォーマットした文�列を返す (function template)                                             | C++20          |
| [`format_to`](format/format_to.md)                   | 書式文�列を使って引数をフォーマットし、出力イテレーターに出力する (function template)                               | C++20          |
| [`format_to_n`](format/format_to_n.md)               | 書式文�列を使って引数をフォーマットし、指定した文�数を超えないように出力イテレーターに出力する (function template) | C++20          |
| [`format_to_n_result`](format/format_to_n_result.md) | `format_to_n`の結果を表す (class template)                                                                           | C++20          |
| [`formatted_size`](format/formatted_size.md)         | 書式文�列を使って引数をフォーマットした文�列を保�するのに必要な文�数を返す (function template)                   | C++20          |
| [`vformat`](format/vformat.md)                       | [`format`](format/format.md)の非テンプレート版 (function)                                                            | C++20          |
| [`vformat_to`](format/vformat_to.md)                 | [`format_to`](format/format_to.md)の非テンプレート版 (function)                                                      | C++20          |

## フォーマッター

| 名前                                                                 | 説明                                                                        | 対応バージョン |
|----------------------------------------------------------------------|-----------------------------------------------------------------------------|----------------|
| [`formatter`](format/formatter.md)                                   | 引数の型に対応する書式文�列の解析、値のフォーマットを担う (class template) | C++20          |
| [`basic_format_parse_context`](format/basic_format_parse_context.md) | 書式文�列の解析のコンテ�スト (class template)                             | C++20          |
| [`format_parse_context`](format/basic_format_parse_context.md)       | `basic_format_parse_context`のマルチバイト文�列版 (type-alias)             | C++20          |
| [`wformat_parse_context`](format/basic_format_parse_context.md)      | `basic_format_parse_context`のワイド文�列版 (type-alias)                   | C++20          |
| [`basic_format_context`](format/basic_format_context.md)             | 引数のフォーマットのコンテ�スト (class template)                           | C++20          |
| [`format_context`](format/basic_format_context.md)                   | `basic_format_context`のマルチバイト文�列版 (type-alias)                   | C++20          |
| [`wformat_context`](format/basic_format_context.md)                  | `basic_format_context`のワイド文�列版 (type-alias)                         | C++20          |

## 引数

| 名前                                               | 説明                                                                                             | 対応バージョン |
|----------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------|
| [`basic_format_arg`](format/basic_format_arg.md)   | 引数1つへのアクセスを提供する (class template)                                                   | C++20          |
| [`visit_format_arg`](format/visit_format_arg.md)   | `basic_format_arg`オブジェクトが現在保持している型に対応する関数を呼び出す (function template)   | C++20          |
| [`make_format_args`](format/make_format_args.md)   | 可変長引数から`basic_format_arg`の列を構築する (function template)                               | C++20          |
| [`make_wformat_args`](format/make_format_args.md)  | `make_wformat_args`のワイド文�列版 (function template)                                          | C++20          |
| [`basic_format_args`](format/basic_format_args.md) | 引数列へのアクセスを提供する (class template)                                                    | C++20          |
| [`format_args`](format/basic_format_args.md)       | `basic_format_args`のマルチバイト文�列版 (type-alias)                                           | C++20          |
| [`wformat_args`](format/basic_format_args.md)      | `basic_format_args`のワイド文�列版 (type-alias)                                                 | C++20          |
| [`format_args_t`](format/basic_format_args.md)     | `basic_format_args`の第1テンプレート引数を`basic_format_context`にした別名 (type-alias)          | C++20          |

## 例外

| 名前                                     | 説明                                       | 対応バージョン |
|------------------------------------------|--------------------------------------------|----------------|
| [`format_error`](format/format_error.md) | フォーマットの失敗を表す例外クラス (class) | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
