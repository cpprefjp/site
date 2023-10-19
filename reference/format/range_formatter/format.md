# format
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* range_formatter[meta class]
* cpp23[meta cpp]

```cpp
template <ranges::input_range R, class FormatContext>
  requires formattable<ranges::range_reference_t<R>, charT> &&
           same_as<remove_cvref_t<ranges::range_reference_t<R>>, T>
typename FormatContext::iterator
  format(R&& r, FormatContext& ctx) const; // (1)
```
* FormatContext[link /reference/format/basic_format_context.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_reference_t[link /reference/ranges/range_reference_t.md]

## 概要
受け取ったRangeオブジェクト`R`を書式化する。


## 効果
- [`parse()`](parse.md)メンバ関数で解析した書式文字列の指定に基づいて、`r`の値を文字列に変換し、以下を[`ctx.out()`](/reference/format/basic_format_context/out.md)に出力する：
    - Range書式として[`s` (文字列として出力)](/reference/format/format.md#range-format-options)が指定された場合、[`basic_string`](/reference/string/basic_string.md)`<charT>(`[`from_range`](/reference/ranges/from_range_t.md)`, r)`を出力する
    - そうでなく、Range書式として[`?s` (デバッグ文字列として出力)](/reference/format/format.md#range-format-options)が指定された場合、[`basic_string`](/reference/string/basic_string.md)`<charT>(`[`from_range`](/reference/ranges/from_range_t.md)`, r)`に引用符を付け、エスケープシーケンスをエスケープして出力する
    - そうでなければ、
        - 開きカッコを出力する
        - Range `r`の各要素`e`について、
            - [`underlying()`](underlying.md)の[`formatter`](/reference/format/formatter.md)で`e`を書式化して出力する
            - 最後の要素でなければ、区切り文字を出力する
        - 閉じカッコを出力する


## 戻り値
出力がおわった位置の出力イテレータを返す。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

