# parse
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* range_formatter[meta class]
* cpp23[meta cpp]

```cpp
template <class ParseContext>
constexpr typename ParseContext::iterator
  parse(ParseContext& ctx);
```
* ParseContext[link /reference/format/basic_format_parse_context.md]

## 概要
書式文字列の範囲`[ctx.begin(), ctx.end())`を解析する。


## 効果
- [`std::format()`](/reference/format/format.md)関数ページに記載されている「[Range・シーケンスコンテナの書式](/reference/format/format.md#range-format-options)」および「[連想コンテナの書式](/reference/format/format.md#assoc-format-options)」を解析する
    - このとき、書式によって以下を設定する
        - `n`オプション (囲み文字をなくす) が指定されなければ、全体の囲み文字を、[`set_brackets()`](set_brackets.md)メンバ関数で設定する
        - 要素の区切り文字を、[`set_separator()`](set_separator.md)メンバ関数で設定する
        - 要素に対する書式が空でなければ、各要素の[`formatter`](/reference/format/formatter.md)を`e`として、[`e.set_debug_format()`](/reference/format/formatter/set_debug_format.md)が有効な式であれば、それを呼び出してデバッグ書式を有効にする


## 戻り値
`ctx`のうち、解析がおわった位置を指すイテレータを返す。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

