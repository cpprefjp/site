# elifdef/elifndefのサポートを追加 [P2334R1]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、以下のプリプロセス時条件式が追加される：

- `#ifdef`に対応する`#elif`である、`#elifdef`を追加。`#if`/`#ifdef`/`#ifndef`が偽だった場合の、特定の識別子（マクロ名）が定義されているかの判定を記述できる
- `#ifndef`に対応する`#elif`である、`#elifndef`を追加。`#if`/`#ifdef`/`#ifndef`が偽だった場合の、特定の識別子（マクロ名）が定義されていないかの判定を記述できる


これまでは`#elif`において特定のマクロが定義されているかを調べるために`#elif defined(macro_name) / #elif !defined(macro_name)`と書く必要があり、`#if`に対する`#ifdef macro_name / #ifndef macro_name`のような短縮ディレクティブが用意されていなかったが、C++23からは`#if`と`#elif`の両方で`def/ndef`付きのディレクティブが利用できるようになる。

```cpp
#define FOO 2

#if FOO == 1
/* */
#elif FOO == 2
/* */
#elifdef BAR
/* */
#elifndef HOGE
/* */
#endif
```

これらのプリプロセス命令はC23でも追加されるため、C++でも同じく追加する。


## 参照
- [P2334R1 Add support for preprocessing directives elifdef and elifndef](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2334r1.pdf)
