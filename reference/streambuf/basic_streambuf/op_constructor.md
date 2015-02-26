#コンストラクタ
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    basic_streambuf(); // (1)
    basic_streambuf(basic_streambuf&& rhs); // (2) C++11

    ……
  };
}
```

##概要
オブジェクトを構築する。

##効果

- (1)
    - 入力部分列・出力部分列の各ポインタをヌルにする。
    - 現在のグローバルロケールを`locale`デフォルトコンストラクタで取得し、`getloc()`の初期値とする。
- (2): ムーブ構築する。

##事後条件
- (1)
    - `gptr()` == `nullptr`
    - `egptr()` == `nullptr`
    - `pptr()` == `nullptr`
    - `epptr()` == `nullptr`
    - `eback()` == `nullptr`
    - `gptr()` == `nullptr`
    - `egptr()` == `nullptr`
    - `getloc()` == `locale()`
- (2)
    - `gptr()` == `rhs.gptr()`
    - `egptr()` == `rhs.egptr()`
    - `pptr()` == `rhs.pptr()`
    - `epptr()` == `rhs.epptr()`
    - `eback()` == `rhs.eback()`
    - `gptr()` == `rhs.gptr()`
    - `egptr()` == `rhs.egptr()`
    - `getloc()` == `rhs.getloc()`

##実装例

##バージョン
###言語
- C++98
- C++11: ムーブコンストラクタの追加

##参照
