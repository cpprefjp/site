# parse
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* formatter[meta class]
* cpp20[meta cpp]

```cpp
template <class ParseContext>
constexpr typename ParseContext::iterator
  parse(ParseContext& ctx);
```
* ParseContext[link /reference/format/basic_format_parse_context.md]

## 概要
書式文字列の範囲`[ctx.begin(), ctx.end())`を解析する。


## 効果
- デフォルトの`formatter`の場合、[`std::format()`](/reference/format/format.md)関数ページに記載されている「[標準のオプション書式](/reference/format/format.md#std-format-options)」を解析する
- [`std::pair`](/reference/utility/pair.md)と[`std::tuple`](/reference/tuple/tuple.md)に対する`formatter`の特殊化の場合、[`std::format()`](/reference/format/format.md)関数ページに記載されている「[pair、tupleの書式](/reference/format/format.md#tuple-format-options)」を解析する
    - このとき、書式によって以下を設定する
        - 全体の囲み文字を、[`set_brackets()`](set_brackets.md)メンバ関数で設定する
        - 要素の区切り文字を、[`set_separator()`](set_separator.md)メンバ関数で設定する
        - 各要素の`formatter`を`e`として、[`e.set_debug_format()`](set_debug_format.md)が有効な式であれば、それを呼び出してデバッグ書式を有効にする
- コンテナアダプタに対する特殊化の場合、メンバとして以下を持っているとして、
    ```cpp
    formatter<Container, charT> underlying_;
    ```

    - 以下と等価：
    ```cpp
    return underlying_.parse(ctx);
    ```


## 戻り値
`ctx`のうち、解析がおわった位置を指すイテレータを返す。


## 備考
- pair / tupleが文字・文字列を要素とする場合、デバッグ書式は常に有効となり、無効にする方法はない


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

