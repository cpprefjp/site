# charconv
* charconv[meta header]
* cpp17[meta cpp]

`<charconv>`ヘッダでは、ロケール依存なし、フォーマット解析なしの高速な文字列・数値変換を提供する。

これらの変換は以下のような特徴がある。

- フォーマットは引数で指定し、入力値のフォーマットを実行時に解析することはない
- 動的にメモリ確保を行わない
- ロケールを考慮しない（Cロケール (POSIXロケール) 固定）
- バッファオーバーランしない
- 例外を投げない（エラーは戻り値で表現、エラーと有効値は区別可能）
- 使用可能なフォーマットは最小限
    - スペースが現れた場合はそこで変換終了
    - `+`符号の指定はできない
    - `#`による小数点以下の桁数指定はできない
    - 16進数に`0x`は付けられない

## クラス

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`chars_format`](charconv/chars_format.md) | 変換時の浮動小数点フォーマット指定のための列挙体 | C++17 |
| [`to_chars_result`](charconv/to_chars_result.md) | [`to_chars`](charconv/to_chars.md)の結果型 | C++17 |
| [`from_chars_result`](charconv/from_chars_result.md) | [`from_chars`](charconv/from_chars.md)の結果型 | C++17 |

## 文字列 ⇔ 数値変換関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`to_chars`](charconv/to_chars.md) | 数値 → 文字列の変換 | C++17 |
| [`from_chars`](charconv/from_chars.md) | 文字列 → 数値の変換 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0(整数のみ)
- [GCC](/implementation.md#gcc): 8.0(整数のみ)
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7(整数のみ), update 9(full suport)

## 参照
- [C++1z ロケール依存なし、フォーマット解析なしの高速な文字列・数値変換 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/08/24/181540)
- [P0067R0 Elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0067r0.html)
- [P0067R1 Elementary string conversions, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r1.html)
- [P0067R2 Elementary string conversions, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r2.html)
- [P0067R3 Elementary string conversions, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r3.html)
- [P0067R4 Elementary string conversions, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r4.html)
- [P0067R5 Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
