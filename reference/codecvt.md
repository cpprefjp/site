# codecvt
* codecvt[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

`<codecvt>`ヘッダでは、文字コード変換のためのファセットクラスを定義する。

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------|-------|
| [`codecvt_mode`](codecvt/codecvt_mode.md) | 文字コード変換の設定をするための列挙型(enum) | C++11 |
| [`codecvt_utf8`](codecvt/codecvt_utf8.md) | UTF-8への文字コード変換(class template) | C++11 |
| [`codecvt_utf16`](codecvt/codecvt_utf16.md) | UTF-16への文字コード変換(class template) | C++11 |
| [`codecvt_utf8_utf16`](codecvt/codecvt_utf8_utf16.md) | UTF-8とUTF-16間での文字コード変換(class template) | C++11 |


## 非推奨の詳細
Unicodeの文字コード変換を行うこれらのクラスは、不正なコードポイントに対する安全なエラー処理の方法を提供していなかったため、セキュリティ上の欠陥があった。

仕様もあいまいであったため、不正なコードポイントに対してどのように振る舞うかも不明であった。

Unicode以外のShift_JISやBig5といった文字コードの利用が急激に減少している。標準ライブラリでの現代的なUnicodeの変換機能は非常に必要とされているが、`<codecvt>`の設計はお粗末なものだった。将来より良いものを作るために、これらの機能は非推奨とする。

標準ライブラリにUnicodeの文字コード変換をする代替機能はないため、他の専門特化した文字コード変換のライブラリを使用すること。


## バージョン
### 言語
- C++11


## 参照
- [P0618R0 Deprecating `<codecvt>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0618r0.html)
