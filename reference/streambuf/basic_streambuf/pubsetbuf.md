# pubsetbuf
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    basic_streambuf* pubsetbuf(char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
バッファ領域を与える。

## 効果
protected virtualの[`setbuf()`setbuf.md)を呼ぶ。

## 戻り値
[`setbuf`](setbuf.md)(s, n)。

## バージョン
### 言語
- C++98

## 参照
- [`setbuf()`](setbuf.md)
