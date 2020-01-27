# codecvt_mode
* codecvt[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

```cpp
namespace std {
  enum codecvt_mode {
    consume_header = 4,
    generate_header = 2,
    little_endian = 1
  };
}
```

## 概要
文�コード変換の�定をするための列挙型。

| 列挙値 | 説明 |
|-------------------|--------------------------------------------------------------------|
| `consume_header`  | �み込み時に先�のバイトオーダーマーク(BOM)を消費する              |
| `generate_header` | 先�にバイトオーダーマーク(BOM)を出力する                          |
| `little_endian`   | リトルエンディアンで出力する（デフォルト動作はビッグエンディアン） |

この型は、以下のクラステンプレートにおいて、テンプレート仮引数として使用されている。

- [`codecvt_utf8`](codecvt_utf8.md)
- [`codecvt_utf16`](codecvt_utf16.md)
- [`codecvt_utf8_utf16`](codecvt_utf8_utf16.md)


## 非推奨の詳細
Unicodeの文�コード変換を行うこれらのクラスは、不�なコードポイントに対する安全なエラー処理の方法を提供していなかったため、セ�ュリティ上の欠陥があった。

仕様もあいまいであったため、不�なコードポイントに対してどのように振る舞うかも不明であった。

Unicode以外のShift_JISやBig5といった文�コードの利用が急激に減少している。標準ライブラリでの現代的なUnicodeの変換機能は非常に必要とされているが、`<codecvt>`の�計はお粗末なものだった。将来より良いものを作るために、これらの機能は非推奨とする。

標準ライブラリにUnicodeの文�コード変換をする代替機能はないため、他の専門特化した文�コード変換のライブラリを使用すること。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017

## 参照
- [P0618R0 Deprecating `<codecvt>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0618r0.html)
