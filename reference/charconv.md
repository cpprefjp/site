# charconv
* charconv[meta header]
* cpp17[meta cpp]

`<tuple>`ヘッダでは、異なる型を格納できる固定サイズコレクションであるタプル型を提供する。2要素のみ格納可能な[`pair`](/reference/utility/pair.md)とは違い、[`tuple`](tuple/tuple.md)は任意の数の要素を格納できる。

## クラス

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`chars_­format`](charconv/chars_­format.md.nolink) | 変換時の浮動小数点フォーマット指定のための列挙体 | C++17 |
| [`to_chars_result`](charconv/to_chars_result.md.nolink) | [`to_chars`](charconv/to_chars.md.nolink)の結果型 | C++17 |
| [`from_chars_result`](charconv/from_chars_result.md.nolink) | [`from_chars`](charconv/from_chars.md.nolink)の結果型 | C++17 |

## 文字列⇔数値変換関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`to_chars`](charconv/to_chars.md.nolink) | 数値 → 文字列の変換 | C++17 |
| [`from_chars`](charconv/from_chars.md.nolink) | 文字列 → 数値の変換 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 15.7

## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
