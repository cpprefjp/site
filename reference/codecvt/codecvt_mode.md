# codecvt_mode
* codecvt[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

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
文字コード変換の設定をするための列挙型。

| 列挙値 | 説明 |
|-------------------|--------------------------------------------------------------------|
| `consume_header`  | 読み込み時に先頭のバイトオーダーマーク(BOM)を消費する              |
| `generate_header` | 先頭にバイトオーダーマーク(BOM)を出力する                          |
| `little_endian`   | リトルエンディアンで出力する（デフォルト動作はビッグエンディアン） |

この型は、以下のクラステンプレートにおいて、テンプレート仮引数として使用されている。

- [`codecvt_utf8`](codecvt_utf8.md)
- [`codecvt_utf16`](codecvt_utf16.md)
- [`codecvt_utf8_utf16`](codecvt_utf8_utf16.md)

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1

## 参照


