# set_brackets
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* formatter[meta class]
* cpp23[meta cpp]

```cpp
template <class charT, formattable<charT>... Ts>
constexpr void
  formatter<pair-or-tuple<Ts...>>::set_brackets(
    basic_string_view<charT> opening,
    basic_string_view<charT> closing); // (1)
```

## 概要
全体の囲み文字を設定する。

このメンバ関数は、[`std::format()`](/reference/format/format.md)関数の「[pair、tupleの書式](/reference/format/format.md#tuple-format-options)」において囲み文字を変更するオプションを指定することで自動的に呼び出される。

デフォルトの開きカッコは`"("`、閉じカッコは`")"`である。


## 効果
`opening`を開きカッコ、`closing`を閉じカッコとして設定する。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
