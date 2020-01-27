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
    basic_streambuf();

    ……
  };
}
```

## 概要
オブジェクトを構築する。


## 効果
- 入力部分列・出力部分列の各ポインタをヌルにする。
- 現在のグ�ーバル�ケールを`locale`デフォルトコンストラクタで取得し、`getloc()`の初期値とする。


## 事後条件
- `gptr()` == `nullptr`
- `egptr()` == `nullptr`
- `pptr()` == `nullptr`
- `epptr()` == `nullptr`
- `eback()` == `nullptr`
- `gptr()` == `nullptr`
- `egptr()` == `nullptr`
- `getloc()` == `locale()`


## 実装例

## バージョン
### 言語
- C++98

## 参照
