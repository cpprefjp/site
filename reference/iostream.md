# iostream
* iostream[meta header]

`<iostream>`ヘッダは、標準入出力オブジェクトを提供する。

このヘッダは、以下のヘッダをインクルードすることが規定されている。

- [`<ios>`](ios.md)
- [`<streambuf>`](streambuf.md)
- [`<istream>`](istream.md)
- [`<ostream>`](ostream.md)

このため、入出力機能に関する基本的な型や関数（[`endl`](ostream/endl.md)など主要なマニピュレータを含む）を使用する目的で、このヘッダをインクルードしても良いだろう。

なお、[`basic_iostream`](istream/basic_iostream.md)、[`iostream`](istream/basic_iostream.md)、[`wiostream`](istream/basic_iostream.md)は[`<istream>`](istream.md)で定義されている。

## 標準入出力オブジェクト

| 名前                         | 説明                                                               | 対応バージョン |
|------------------------------|--------------------------------------------------------------------|----------------|
| [`cin`](iostream/cin.md)     | マルチバイト文字による標準入力                                     |                |
| [`cout`](iostream/cout.md)   | マルチバイト文字による標準入力標準出力                             |                |
| [`clog`](iostream/clog.md)   | マルチバイト文字による標準入力標準エラー出力                       |                |
| [`cerr`](iostream/cerr.md)   | マルチバイト文字による標準入力標準エラー出力（バッファリング無し） |                |
| [`wcin`](iostream/cin.md)    | ワイド文字による標準入力                                           |                |
| [`wcout`](iostream/cout.md)  | ワイド文字による標準入力標準出力                                   |                |
| [`wclog`](iostream/clog.md)  | ワイド文字による標準入力標準エラー出力                             |                |
| [`wcerr`](iostream/cerr.md)  | ワイド文字による標準入力標準エラー出力（バッファリング無し）       |                |
