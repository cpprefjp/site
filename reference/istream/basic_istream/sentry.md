# sentry
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* class[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream<CharT, Traits>::sentry {
  public:
    explicit sentry(basic_istream<CharT, Traits>& is, bool noskipws = false);
    ~sentry();

    operator bool() const;          // C++98
    explicit operator bool() const; // C++11

  private:
    sentry(const sentry&);            // C++98 宣言のみ
    sentry& operator=(const sentry&); // C++98 宣言のみ
  public:
    sentry(const sentry&) = delete;            // C++11
    sentry& operator=(const sentry&) = delete; // C++11
  };
}
```
* basic_istream[link ../basic_istream.md]
* char_traits[link ../../string/char_traits.md]

## 概要
`basic_istream<>::sentry`は、入力処理共通の前処理・後処理を実行するためのクラスである。
前処理・後処理がそれぞれコンストラクタ・デストラクタ内部で実行される。

書式化入力関数・非書式化入力関数は、内部で必ず`sentry`オブジェクトを構築・破棄する。

`explicit operator bool`関数は、コンストラクタでの処理が成功していれば`true`、さもなくば`false`を返す。

なお、C++標準規格では、規格で要求している処理のほかに、追加の処理を行っても良いとされている。

## メンバ
| 名前                                | 説明           | 対応バージョン |
|-------------------------------------|----------------|----------------|
| [`(constructor)`](sentry/op_constructor.md) | コンストラクタ |                |
| [`(destructor)`](sentry/op_destructor.md) | デストラクタ   |                |
| [`operator bool`](sentry/op_bool.md) | 前処理が正常に完了したかを判定する |                |

## 参照

- [`basic_istream`](../basic_istream.md)
- [`basic_ostream<>::sentry`](../../ostream/basic_ostream/sentry.md)
