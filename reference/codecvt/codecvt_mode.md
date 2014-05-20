#codecvt_mode (C++11)
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??

##参照


