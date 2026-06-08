# cuchar
* cuchar[meta header]
* cpp11[meta cpp]

`<cuchar>`ヘッダでは、マルチバイト文字とUnicode文字 (`char8_t`、`char16_t`、`char32_t`) との変換関数を定義する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<uchar.h>`ヘッダと同じである (ただし`char8_t`、`char16_t`、`char32_t`型は宣言しない)。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size_t`](/reference/cstddef/size_t.md) | 符号なし整数型 | C++11 |
| `mbstate_t` | マルチバイト文字とワイド文字の変換状態を保持する型 | C++11 |


## 変換関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`mbrtoc8`](cuchar/mbrtoc8.md)  | マルチバイト文字を、UTF-8文字 (`char8_t`) に変換する | C++26 |
| [`c8rtomb`](cuchar/c8rtomb.md)  | UTF-8文字 (`char8_t`) を、マルチバイト文字に変換する | C++26 |
| `mbrtoc16` | マルチバイト文字を、UTF-16文字 (`char16_t`) に変換する | C++11 |
| `c16rtomb` | UTF-16文字 (`char16_t`) を、マルチバイト文字に変換する | C++11 |
| `mbrtoc32` | マルチバイト文字を、UTF-32文字 (`char32_t`) に変換する | C++11 |
| `c32rtomb` | UTF-32文字 (`char32_t`) を、マルチバイト文字に変換する | C++11 |


## バージョン情報マクロ

| マクロ | 説明 | 対応バージョン |
|--------|------|----------------|
| `__STDC_VERSION_UCHAR_H__` | `<cuchar>`が提供するC標準ライブラリ機能のバージョン (`202311L`) | C++26 |


## バージョン
### 言語
- C++11


## 関連項目
- [`<cstdlib>`](cstdlib.md)


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、`mbrtoc8`・`c8rtomb`・`__STDC_VERSION_UCHAR_H__`が追加された
