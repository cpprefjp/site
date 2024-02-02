# コンストラクタ
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    basic_streambuf();  // (1)
    basic_streambuf(const basic_streambuf& rhs);  // (2)

    ……
  };
}
```

## 概要
オブジェクトを構築する。


## 効果
- (1) :
	- 入力列・出力列の各ポインタをヌルにする。
	- 現在のグローバルロケールを`locale`デフォルトコンストラクタで取得し、`getloc()`の初期値とする。
- (2) : `rhs`の入力列・出力列の各ポインタをコピーする。


## 事後条件
- (1) :
  - `eback()` == `nullptr`
  - `gptr()` == `nullptr`
  - `egptr()` == `nullptr`
  - `pbase()` == `nullptr`
  - `pptr()` == `nullptr`
  - `epptr()` == `nullptr`
  - `getloc()` == `locale()`
- (2) :
  - `eback()` == `rhs.eback()`
  - `gptr()` == `rhs.gptr()`
  - `egptr()` == `rhs.egptr()`
  - `pbase()` == `rhs.pbase()`
  - `pptr()` == `rhs.pptr()`
  - `epptr()` == `rhs.epptr()`
  - `getloc()` == `rhs.getloc()`


## 実装例

## バージョン
### 言語
- C++98

## 参照
