#getloc
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

##概要
ストリームバッファの現在のロケールを取得する。

##戻り値
- 最後に`pubimbue()`を呼び出したときの実引数。
- そのオブジェクトに対して`pubimbue()`を1回も呼び出していなければ、構築時のグローバルロケール。

##実装例
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

##バージョン
###言語
- C++98

##参照
- [`pubimbue()`](pubimbue.md)
- [`imbue()`](imbue.md)
