# UTF-8文�リテラル
* cpp17[meta cpp]

## 概要
C++14までは、UTF-8エンコーディングであることを示す`u8`プレフィックスを、文�列リテラルに対してのみ指定できた。C++17では、文�リテラルに対しても`u8`プレフィックスを付けられる。

```cpp
char s[] = u8"あいうえお"; // OK : C++11以降
char c = u8'A'; // OK : C++17以降
```


## 仕様
- `u8`プレフィックスが付いた文�リテラルは、`char`文�型の、UTF-8文�リテラルとなる
- UTF-8文�リテラルの値は、ISO 10646のコードポイント値と同値となる。そのコードポイント値は、単一のUTF-8コードユニットで表現できること
    - UTF-8文�リテラルが扱えるコードポイントの範囲は、C0 Controls and Basic Latin Unicode block (C0制御文�とラテン基本文�)となる
    - そのコードポイント範囲を超える値が指定された場合、プ�グラムは不適格となる


## 関連項目
- [C++11 UTF-8文�列リテラル](/lang/cpp11/utf8_string_literals.md)
- [C++11 `char16_t`と`char32_t`](/lang/cpp11/char16_32.md)


## 参照
- [N4267 Adding `u8` character literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4267.html)
- [C0 Controls and Basic Latin - The Unicode Consortium](http://www.unicode.org/charts/PDF/U0000.pdf)
- [基本ラテン文� (Unicodeのブ�ック) - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9F%BA%E6%9C%AC%E3%83%A9%E3%83%86%E3%83%B3%E6%96%87%E5%AD%97_(Unicode%E3%81%AE%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF))

