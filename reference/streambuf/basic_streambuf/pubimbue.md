# pubimbue
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    locale pubimbue(const locale& loc);

    ……
  };
}
```
* locale[link /reference/locale/locale.md]

## 概要
ストリームバッファの�ケールを変更する。

## 効果
`imbue`を呼び出す。
その後、`getloc`の内部状態を仮引数`loc`の値に変更する。

## 戻り値
この`pubimbue()`を呼び出す前の`getloc()`の値。

## 実装例
[`getloc()`](getloc.md)を参照。

## バージョン
### 言語
- C++98

## 参照
- [`getloc()`](getloc.md)
- [`imbue()`](imbue.md)
