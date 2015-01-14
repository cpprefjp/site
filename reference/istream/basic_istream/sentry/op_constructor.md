#コンストラクタ
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream<CharT, Traits>::sentry {
  public:
    explicit sentry(basic_istream<CharT, Traits>& is, bool noskipws = false);
  };
}
```

##概要
入力処理の前処理を行う。

##効果
1. `is.good()`が`false`なら、`is.setstate(failbit)`を呼び出し、関数から帰る。
1. `is.tie()`が非ヌルポインタなら、`is.tie()->flush()`を呼び出す。
    - `is.tie()`が指す先のストリームバッファのput areaが空なら、この処理を省略しても良い。
    - `is.rdbuf()->underflow()`の呼び出しが発生するまで、この処理を遅延させても良い。
    - `is.rdbuf()->underflow()`の呼び出しが発生しなかったら、この処理を省略して良い（標準ライブラリ実装内部で、そのような最適化を行っても良い）。
1. `noskipws`が`false`かつ`is.flags() & ios_base::skipws`が真なら、ストリームから空白文字を読み捨てる。
    - 空白文字の判定は、文字`c`について`user_facet<ctype<CharT>>(is.getloc()).is(ctype.space, c)`と等価な方法で行う。
    - このとき`is.rdbuf()->sbumpc()`または`is.rdbuf()->sgetc()`が`Traits::eof()`を返したら、`setstate(failbit | eofbit)`を呼び出す。

ここまでの手順が完了したら、このオブジェクトの`explicit operator bool`関数は`true`を、さもなくば`false`を返すようになる。
