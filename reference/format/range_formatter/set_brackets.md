# set_brackets
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* range_formatter[meta class]
* cpp23[meta cpp]

```cpp
constexpr void
  set_brackets(basic_string_view<charT> opening,
               basic_string_view<charT> closing) noexcept; // (1)
```

## 概要
全体の囲み文字を設定する。

このメンバ関数は、[`std::format()`](/reference/format/format.md)関数の「[Range・シーケンスコンテナの書式](/reference/format/format.md#range-format-options)」および「[連想コンテナの書式](/reference/format/format.md#assoc-format-options)」において囲み文字を変更するオプションを指定することで自動的に呼び出される。

- Range・シーケンスコンテナのデフォルトの開きカッコは`"["`、閉じカッコは`"]"`
- 連想コンテナのデフォルトの開きカッコは`"{"`、閉じカッコは`"}"`


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
- [LWG Issue 3839. `range_formatter`'s `set_separator`, `set_brackets`, and `underlying` functions should be `noexcept`](https://cplusplus.github.io/LWG/issue3839)
    - C++23で、この関数に`noexcept`が付加された
