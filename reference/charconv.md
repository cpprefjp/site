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


## 導入された経緯

XMLやJSONに代表されるテキストベースのデータを利用するケースが増えており、C++においてそれを利用するケースも増加している。
それらは多くの場合コンピュータによって生成されコンピュータによって読まれるため国際化対応の必要がなく、生成する側でも読む側でもロケールに非依存であり、考慮するべきではない。  
そして、これらのデータは多くの場合通信に利用されており高いスループットを要求される。

しかし、C++17未満の環境で利用可能であった文字列変換法はいずれもロケールに依存しておりロケール非依存な変換が提供されていない。  
また、いずれの手法も動的なフォーマットの解析・指定や動的メモリ確保、エラー報告の不足などの問題がある。
動的なフォーマット解析はコンパイル時のフォーマットチェック及びコンパイル時フォーマット選択を妨げ、外部からの動的なフォーマット指定はフォーマット状態のスレッド間共有の必要性が生じることから好ましくない。  
さらに、浮動小数点数を10進文字列→2進浮動小数点数→10進文字列と変換した時に最初と最後の文字列が一致する保証がある変換方法も提供されていない。

各変換方法とその問題点

| 関数                       | 欠点                                  |
| -------------------------- | ------------------------------------- |
| `sprintf`                  | ロケール依存、フォーマットの動的解析、バッファオーバーランの危険性     |
| `snprintf`                 | ロケール依存、フォーマットの動的解析                    |
| `sscanf`                   | ロケール依存、フォーマットの動的解析                    |
| `atol`                     | ロケール依存、エラー報告の不足                       |
| `strtol`                   | ロケール依存、先頭ホワイトスペース・0xの無視               |
| `strstream`                | ロケール依存、先頭ホワイトスペースの無視                  |
| `stringstream`             | ロケール依存、先頭ホワイトスペースの無視、動的メモリ確保          |
| `num_put / num_get facets` | ロケール依存、仮想関数                           |
| `to_string`                | ロケール依存、動的メモリ確保                        |
| `stoi`等                   | ロケール依存、動的メモリ確保、先頭ホワイトスペース・0xの無視、例外の送出 |


これらの問題がなく高速な文字列・数値変換を提供するために、本ヘッダ及び`to_chars, from_chars`関数が導入された。各関数の特徴は冒頭及び個別のページを参照のこと。

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
- [N4412: Shortcomings of iostreams](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4412.html)
