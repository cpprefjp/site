# C99互換で導入された定義済みマクロ
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
定義済みマクロの値が、以下のように更新された：

| マクロ名          | 説明                    |
|-------------------|-------------------------|
| `__STDC_HOSTED__` | 実装がホスト実装である場合は`1`、そうでない場合（つまり、フリースタンディング実装である場合）は`0`として定義される |
| `__STDC_VERSION__` | 標準Cのバージョンを表す値（C95 では `199409L`、C99 では `199901L`、C11 では `201112L`、C90 では定義されていない）。<br/>このマクロが定義されているか否か、および、定義されている場合の値は実装依存である。 |
| `__STDC_ISO_10646__` | `wchar_t`の文字が、Unicodeの規格であるISO/IEC 10646の、yyyymm年の仕様を満たしている場合に定義される。<br/>このマクロの値は、`yyyymmL`の形式の整数値として定義される。yは年、mは月を表す。yとmそれぞれの個数は、桁数を表す。 |


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 更新された定義済みマクロ](predefined_macros.md)


## 参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)
- [CWG Issue 630. Equality of narrow and wide character values in the basic character set](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#630)