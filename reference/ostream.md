# ostream
* ostream[meta header]

`<ostream>`ヘッダでは、出力処理に関するクラスやマニピュレータ（の実体である関数）などが定義されている。

## 型と関数

| 名前                                        | 説明                                                                     | 対応バージョン |
|---------------------------------------------|--------------------------------------------------------------------------|----------------|
| [`basic_ostream`](ostream/basic_ostream.md) | 出力ストリーム (class template)                                          |                |
| [`endl`](ostream/endl.md)                   | 改行を出力し、バッファを出力して空にする (maniplator, function template) |                |
| [`ends`](ostream/ends.md)                   | ヌル文字を出力する (maniplator, function template)                       |                |
| [`flush`](ostream/flush.md)                 | バッファを出力して空にする (maniplator, function template)               |                |
| [`flush_emit`](ostream/flush_emit.md)       | [`std::basic_osyncstream`](syncstream/basic_osyncstream.md)をフラッシュし、保留中の出力を転送する (maniplator, function template) | C++20 |
| [`emit_on_flush`](ostream/emit_on_flush.md) | [`std::basic_osyncstream`](syncstream/basic_osyncstream.md)の同期時排出ポリシーを`true`にする (maniplator, function template) | C++20 |
| [`noemit_on_flush`](ostream/noemit_on_flush.md) | [`std::basic_osyncstream`](syncstream/basic_osyncstream.md)の同期時排出ポリシーを`false`にする (maniplator, function template) | C++20 |

## バージョン
### 言語
- C++98
