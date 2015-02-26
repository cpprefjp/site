#ios
* ios[meta header]
* std[meta namespace]

`<ios>`ヘッダでは、入出力処理共通の基底クラスやマニピュレータ（の実体である関数）などが定義されている。

## 型と関数（マニピュレータを除く）

| 名前                                                    | 説明                                                           | 対応バージョン |
|---------------------------------------------------------|----------------------------------------------------------------|----------------|
| [`streamoff`](./ios/streamoff.md)                       | ファイルサイズの表現に適した符号付き整数型 (typedef)           |                |
| [`streamsize`](./ios/streamsize.md)                     | 入出力操作のバイト数などの表現に適した符号付き整数型 (typedef) |                |
| [`fpos`](./ios/fpos.md)                                 | ストリーム上の位置を表現する型 (class template)                |                |
| [`ios_base`](./ios/ios_base.md)                         | 入出力の最基底クラス (class)                                   |                |
| [`basic_ios`](./ios/basic_ios.md)                       | 入出力共通の基底クラス (class template)                        |                |
| [`io_errc`](./ios/io_errc.md)                           | 入出力のエラー値 (enum class)                                  | C++11          |
| [`is_error_code_enum`](./ios/is_error_code_enum.md)     | `io_errc`をエラーコードとして扱うための特殊化 (class template) | C++11          |
| [`make_error_code`](./ios/make_error_code.md)           | `io_errc`から`error_code`を生成する (function)                 | C++11          |
| [`make_error_condition`](./ios/make_error_condition.md) | `io_errc`から`error_condition`を生成する (function)            | C++11          |
| [`iostream_category`](./ios/iostream_category.md)       | `io_errc`のためのエラーカテゴリを取得する (function)           | C++11          |

## マニピュレータ

| 名前                                    | 説明                                             | 対応バージョン |
|-----------------------------------------|--------------------------------------------------|----------------|
| [`boolalpha`](./ios/boolalpha.md)       | bool値を文字列として入出力させる                 |                |
| [`noboolalpha`](./ios/noboolalpha.md)   | bool値を数値表記で入出力させる                   |                |
| [`showbase`](./ios/showbase.md)         | 基数などを表すプレフィックスを出力させる         |                |
| [`noshowbase`](./ios/noshowbase.md)     | 基数などを表すプレフィックスを出力させない       |                |
| [`showpoint`](./ios/showpoint.md)       | 小数点を常に出力させる                           |                |
| [`noshowpoint`](./ios/noshowpoint.md)   | 小数点を不要なら出力させない                     |                |
| [`showpos`](./ios/showpos.md)           | 正符号を出力させる                               |                |
| [`noshowpos`](./ios/noshowpos.md)       | 正符号を出力させない                             |                |
| [`skipws`](./ios/skipws.md)             | 書式入力操作前に空白を読み飛ばさせる             |                |
| [`noskipws`](./ios/noskipws.md)         | 書式入力操作前の空白の読み飛ばしを行わない       |                |
| [`uppercase`](./ios/uppercase.md)       | 英大文字の表記で出力                             |                |
| [`nouppercase`](./ios/nouppercase.md)   | 英小文字の表記で出力                             |                |
| [`unitbuf`](./ios/unitbuf.md)           | 出力操作の都度バッファを吐き出す                 |                |
| [`nounitbuf`](./ios/nounitbuf.md)       | 出力操作を終えても必要に応じてバッファに蓄える   |                |
| [`internal`](./ios/internal.md)         | 両端揃え                                         |                |
| [`left`](./ios/left.md)                 | 左揃え                                           |                |
| [`right`](./ios/right.md)               | 右揃え                                           |                |
| [`dec`](./ios/dec.md)                   | 十進法で入出力（整数）                           |                |
| [`hex`](./ios/hex.md)                   | 十六進法で入出力（整数）                         |                |
| [`oct`](./ios/oct.md)                   | 八進法で入出力（整数）                           |                |
| [`fixed`](./ios/fixed.md)               | 小数点数表記で出力（浮動小数点数）               |                |
| [`scientific`](./ios/scientific.md)     | 指数表記で出力（浮動小数点数）                   |                |
| [`hexfloat`](./ios/hexfloat.md)         | 十六進法での指数表記で出力（浮動小数点数）       | C++11          |
| [`defaultfloat`](./ios/defaultfloat.md) | 小数点数・指数表記の自動切り替え（浮動小数点数） | C++11          |

##バージョン
###言語
- C++98
