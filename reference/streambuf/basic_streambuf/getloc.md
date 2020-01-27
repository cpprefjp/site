# getloc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    locale getloc() const;

    ……
  };
}
```
* locale[link /reference/locale/locale.md]

## 概要
ストリームバッファの現在の�ケールを取得する。

## 戻り値
- 最後に`pubimbue()`を呼び出したときの実引数。
- そのオブジェクトに対して`pubimbue()`を1回も呼び出していなければ、構築時のグ�ーバル�ケール。

## 実装例
[`pubimbue()`](pubimbue.md)も併せて掲載している。
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    locale getloc() const {
      return locale_;
    }

    locale publimbue(const locale& loc) {
      locale prev_loc = locale_;
      this->imbue(loc);
      locale_ = loc;
      return prev_loc;
    }

  private:
    locale locale_;

    ……
  };
}
```
* locale[link /reference/locale/locale.md]
* imbue[link imbue.md]

## バージョン
### 言語
- C++98

## 参照
- [`pubimbue()`](pubimbue.md)
- [`imbue()`](imbue.md)
