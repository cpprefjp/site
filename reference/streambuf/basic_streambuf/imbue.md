# imbue
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual void imbue(const locale& loc);

    ……
  };
}
```
* locale[link /reference/locale/locale.md]

## 概要
`basic_streambuf`の派生クラスに対し、ロケールの変更を通知する。

この関数は`public`なメンバ関数[`pubimbue`](pubimbue.md)から呼び出される。
そのため、この関数を呼び出そうと考えているなら、代わりに`public`なメンバ関数`pubimbue`を呼び出すほうが適切ではないか検討すべきであろう。

## 効果
`basic_streambuf`での実装は何も行わない。

`basic_streambuf`の派生クラスでは、必要に応じてオーバーライドして処理を追加してよい。

## 実装例
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual void imbue(const locale& loc) {
    }
  };
}
```

## バージョン
### 言語
- C++98

## 参照
- [`getloc()`](getloc.md)
- [`pubimbue()`](pubimbue.md)
