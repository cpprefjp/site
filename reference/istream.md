# istream
* istream[meta header]

`<istream>`ヘッダでは、入力・入出力処理に関するクラスやマニピュレータ（の実体である関数）などが定義されている。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<ios>`](ios.md)
- [`<streambuf>`](streambuf.md)
- [`<istream>`](istream.md)
- [`<ostream>`](ostream.md)


## 型と関数

| 名前                                          | 説明                                             | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------|----------------|
| [`basic_istream`](istream/basic_istream.md)   | 入力ストリーム (class template)                  |                |
| [`basic_iostream`](istream/basic_iostream.md) | 入出力ストリーム (class template)                |                |
| [`ws`](istream/ws.md)                         | 空白を�み飛ばす (maniplator, function template) |                |

## バージョン
### 言語
- C++98
