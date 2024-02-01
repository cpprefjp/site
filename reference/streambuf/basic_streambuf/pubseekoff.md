# pubseekoff
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    pos_type pubseekoff(off_type off, ios_base::seekdir way,
                        ios_base::openmode which = ios_base::in | ios_base::out);

    ……
  };
}
```
* ios_base::seekdir[link /reference/ios/ios_base/type-seekdir.md]
* ios_base::openmode[link /reference/ios/ios_base/type-openmode.md]

## 概要
相対位置指定での移動。

## 効果
protected virtualの[`seekoff()`](seekoff.md)を呼ぶ。

## 戻り値
[`seekoff`](seekoff.md)(off, way, which)。

## バージョン
### 言語
- C++98

## 参照
- [`seekoff()`](seekoff.md)
