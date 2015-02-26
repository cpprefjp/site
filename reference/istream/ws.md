#ws
* istream[meta header]
* std[meta namespace]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& ws(basic_istream<CharT, Traits>& is);
}
```

##概要
（非書式化入力関数）空白文字を読み捨てるマニピュレータ。

書式化入力関数の前処理と同じ手順で、空白文字を読み捨てる処理を実行する。

##効果
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 空白文字が続く間、ストリームから文字を入力する。
    - EOFに達した場合、`setstate(eofbit)`を呼び出す。

##戻り値
`is`

##例
TBD

###出力
TBD

##実装例
TBD

##バージョン
###言語
- C++98

##参照
