# seekpos
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual pos_type seekpos(pos_type sp,
                             ios_base::openmode which = ios_base::in | ios_base::out);

    ……
  };
}
```
* ios_base::openmode[link /reference/ios/ios_base/type-openmode.md]

## 概要
絶対位置指定での移動。

## 効果
デフォルトでは -1 を返すのみ。（オーバーライドした関数の具体的な動作はそのクラスに委ねられる。）

## 戻り値
pos_type(off_type(-1))。

## バージョン
### 言語
- C++98

## 参照
- [`pubseekpos()`](pubseekpos.md)
