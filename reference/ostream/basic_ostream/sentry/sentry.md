#コンストラクタ
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ostream<CharT, Traits>::sentry {
  public:
    explicit sentry(basic_ostream<CharT, Traits>& os);
  };
}
```

##概要
出力処理の前処理を行う。

##効果
1. `os.good()`が`false`なら、関数から帰る。
1. `os.tie()`が非ヌルポインタなら、`os.tie()->flush()`を呼び出す。

その他の処理によっては、`os.setstate(failbit)`が呼び出される可能性がある。

ここまでの手順が完了したら、このオブジェクトの`explicit operator bool`関数は`true`を、さもなくば`false`を返すようになる。
