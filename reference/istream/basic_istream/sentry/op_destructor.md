#デストラクタ
* istream[meta header]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream<CharT, Traits>::sentry {
  public:
    ~sentry();
  };
}
```

##概要
入力処理の後処理を行う。

##効果
（標準では）何もしない。
