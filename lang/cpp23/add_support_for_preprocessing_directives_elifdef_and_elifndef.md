# elif/elifdef/elifndefのサポートを追加
* cpp23[meta cpp]

## 概要
C++23では、以下のプリプロセス時条件式が追加される：

- `#if`に対応する`#elif`を追加。`#if`/`#ifdef`/`#ifndef`が偽だった場合の条件式を記述できる
- `#ifdef`に対応する`#elifdef`を追加。`#if`/`#ifdef`/`#ifndef`が偽だった場合の、特定の識別子が定義されているかの判定を記述できる
- `#ifndef`に対応する`#elifndef`を追加。`#if`/`#ifdef`/`#ifndef`が偽だった場合の、特定の識別子が定義されていないかの判定を記述できる

これまでは`#if`が偽だった場合のさらなる条件式を記述するためには`#else`にネストして`#if`を記述する必要があったが、そのような条件分岐が書きやすくなる。

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
