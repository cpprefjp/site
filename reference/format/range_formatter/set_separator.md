# set_separator
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* range_formatter[meta class]
* cpp23[meta cpp]

```cpp
constexpr void
  set_separator(basic_string_view<charT> sep) noexcept; // (1)
```

## 概要
要素の区切り文字を設定する。

このメンバ関数は、[`std::format()`](/reference/format/format.md)関数の「[Range・シーケンスコンテナの書式](/reference/format/format.md#range-format-options)」および「[連想コンテナの書式](/reference/format/format.md#assoc-format-options)」において区切り文字を変更するオプションを指定することで自動的に呼び出される。

デフォルトの区切り文字は`", "`である。


## 効果
`sep`を区切り文字として設定する。


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
