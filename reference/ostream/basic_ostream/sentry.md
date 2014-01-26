#basic_ostream<>::sentry
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ostream<CharT, Traits>::sentry {
  public:
    explicit sentry(basic_ostream<CharT, Traits>& os);
    ~sentry();
    explicit operator bool() const;

    sentry(const sentry&) = delete;
    sentry& operator=(const setnry&) = delete;
  };
}
```
* basic_ostream[link ../basic_ostream.md]

##概要
`basic_ostream<>::sentry`は、出力処理共通の前処理・後処理を実行するためのクラスである。
前処理・後処理がそれぞれコンストラクタ・デストラクタ内部で実行される。

書式化出力関数・非書式化出力関数は、内部で必ず`sentry`オブジェクトを構築・破棄する。

`explicit operator bool`関数は、コンストラクタでの処理が成功していれば`true`、さもなくば`false`を返す。

なお、C++標準規格では、規格で要求している処理のほかに、追加の処理を行っても良いとされている。

##メンバ
| 名前                                | 説明           | 対応バージョン |
|-------------------------------------|----------------|----------------|
| [`(constructor)`](sentry/sentry.md) | コンストラクタ |                |
| [`(destructor)`](sentry/-sentry.md) | デストラクタ   |                |


##参照

- [`basic_ostream`](../basic_ostream.md)
- [`basic_istream<>::sentry`](../../istream/basic_istream/sentry.md)
