#C99互換で導入された定義済みマクロ
* cpp11[meta cpp]

##概要
定義済みマクロの値が、以下のように更新された：

| マクロ名          | 説明                    |
|-------------------|-------------------------|
| `__STDC_HOSTED__` | 標準規格に準拠した処理系である場合は`1`、そうでない場合は`0`として定義される |
| `__STDC_MB_MIGHT_NEQ_WC__` | このマクロが整数型の定数`1`として定義されている場合、基本文字集合に含まれる文字のリテラルが、`char`と`wchar_t`で異なる値を持つ可能性がある。例: このマクロが定義されない場合には`'x' == L'x'`が`true`であることが保証され、そうでなければされない。 |
| `__STDC_VERSION__` | 実装定義の標準Cのバージョン値 |
| `__STDC_ISO_10646__` | `wchar_t`の文字が、Unicodeの規格であるISO/IEC 10646の、yyyymm年の仕様を満たしている場合に定義される。このマクロの値は、yyyymmLの形式の整数値として定義される。yは年、mは月を表す。yとmそれぞれの個数は、桁数を表す。 |


##参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)
- [CWG Issue 630. Equality of narrow and wide character values in the basic character set](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#630)

