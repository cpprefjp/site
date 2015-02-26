#codecvt_mode (C++11)
* codecvt[meta header]
* std[meta namespace]
* enum[meta id-type]

```cpp
namespace std {
  enum codecvt_mode {
    consume_header = 4,
    generate_header = 2,
    little_endian = 1
  };
}
```

##概要
文字コード変換の設定をするための列挙型。

| 列挙値 | 説明 |
|-------------------|--------------------------------------------------------------------|
| `consume_header`  | 読み込み時に先頭のバイトオーダーマーク(BOM)を消費する              |
| `generate_header` | 先頭にバイトオーダーマーク(BOM)を出力する                          |
| `little_endian`   | リトルエンディアンで出力する（デフォルト動作はビッグエンディアン） |


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??

##参照


