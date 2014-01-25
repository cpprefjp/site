#iostream
`<iostream>`ヘッダは、標準入出力オブジェクトを提供する。

このヘッダは、以下のヘッダをインクルードすることが規定されている。

- [`<ios>`](ios.md)
- `<streambuf>`
- [`<istream>`](istream.md)
- [`<ostream>`](ostream.md)

このため、入出力機能に関する基本的な型や関数（`endl`など主要なマニピュレータを含む）を使用する目的で、このヘッダをインクルードしても良いだろう。

なお、[`basic_iostream`、`iostream`、`wiostream`](istream/basic_istream.md)は[`<istream>`](istream.md)で定義されている。

##標準入出力オブジェクト

| 名前 | 説明 | 対応バージョン |
|--------------------------------|--------------------------------------------------------------------|-------|
| [`cin`](./iostream/cin.md)     | マルチバイト文字による標準入力                                     |  |
| [`cout`](./iostream/cout.md)   | マルチバイト文字による標準入力標準出力                             |  |
| [`clog`](./iostream/clog.md)   | マルチバイト文字による標準入力標準エラー出力                       |  |
| [`cerr`](./iostream/cerr.md)   | マルチバイト文字による標準入力標準エラー出力（バッファリング無し） |  |
| [`wcin`](./iostream/wcin.md)   | ワイド文字による標準入力                                           |  |
| [`wcout`](./iostream/wcout.md) | ワイド文字による標準入力標準出力                                   |  |
| [`wclog`](./iostream/wclog.md) | ワイド文字による標準入力標準エラー出力                             |  |
| [`wcerr`](./iostream/wcerr.md) | ワイド文字による標準入力標準エラー出力（バッファリング無し）       |  |

