# pubseekpos
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    pos_type pubseekpos(pos_type sp,
                        ios_base::openmode which = ios_base::in | ios_base::out);

    ……
  };
}
```
* ios_base::openmode[link /reference/ios/ios_base/type-openmode.md]

## 概要
絶対位置指定での移動。

## 効果
protected virtualの[`seekpos()`](seekpos.md)を呼ぶ。

## 戻り値
[`seekpos`](seekpos.md)(sp, which)。

## バージョン
### 言語
- C++98

## 参照
- [`seekpos()`](seekpos.md)
