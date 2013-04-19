#codecvt_mode
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


| | |
|------------------------------|----------------------------------------------------------------------|
| 列挙値 | 説明 |
| `consume_header` | 読み込み時にバイトオーダーマーク(BOM)を消費する |
| `generate_header` | バイトオーダーマークを出力する |
| `little_endian` | 入力がリトルエンディアン順 |



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


