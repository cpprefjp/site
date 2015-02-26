#デストラクタ
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ostream<CharT, Traits>::sentry {
  public:
    ~sentry();
  };
}
```

##概要
出力処理の後処理を行う。

##効果
1. `(os.flags() & unitbuf) && !uncought_exception() && os.good()`が真なら、`os.rdbuf()->pubsync()`を呼び出す。
    - `os.rdbuf()->pubsync()`が-1を返したら、`bad_bit`をセットする。ただし、これにより例外を投げることはない。
