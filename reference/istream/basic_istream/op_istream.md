#operator<<
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream : virtual public basic_ios<CharT, Traits> {
    // マニピュレータ
    basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& (*pf)(basic_istream<CharT, Traits>&));
    basic_istream<CharT, Traits>& operator>>(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&));
    basic_istream<CharT, Traits>& operator>>(ios_base& (*pf)(ios_base&));

    // bool値・数値・ポインタ
    basic_istream<CharT, Traits>& operator>>(bool& n);
    basic_istream<CharT, Traits>& operator>>(short& n);
    basic_istream<CharT, Traits>& operator>>(unsigned short& n);
    basic_istream<CharT, Traits>& operator>>(int& n);
    basic_istream<CharT, Traits>& operator>>(unsigned int& n);
    basic_istream<CharT, Traits>& operator>>(long& n);
    basic_istream<CharT, Traits>& operator>>(unsigned long& n);
    basic_istream<CharT, Traits>& operator>>(long long& n);
    basic_istream<CharT, Traits>& operator>>(unsigned long long& n);
    basic_istream<CharT, Traits>& operator>>(float& f);
    basic_istream<CharT, Traits>& operator>>(double& f);
    basic_istream<CharT, Traits>& operator>>(long double& f);
    basic_istream<CharT, Traits>& operator>>(void*& p);

    // ストリームバッファ
    basic_istream<CharT, Traits>& operator>>(basic_streambuf<char_type, Traits>* sb);

    ……
  };

  // 文字
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is, CharT& c);
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, unsigned char& c);
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, signed char& c);

  // 文字列
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is, CharT* c);
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, unsigned char* c);
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, signed char* c);

  // ストリームへの右辺値参照 (C++11)
  template<class CharT, class Traits, class T>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>&& is, T& x);
}
```

##概要

ストリームからの入力またはマニピュレータの実行を行う。

- マニピュレータを実行する多重定義それ自体は、書式化入力関数・非書式化入力関数いずれにも該当しない。
 - マニピュレータが書式化入力関数・非書式化入力関数であるということはあり得る（例: [`ws`](../ws.md)）。
- 数値型（`bool`も含む）と`void*`に対する多重定義は、書式化入力関数である。
- `basic_stringbuf`に対する多重定義は、非書式化入力関数である。
- 文字に対する多重定義は、書式化入力関数である。
- 文字列に対する多重定義は、書式化入力関数である。

なお、文字列に対して入力を行う場合、必ずマニピュレータ`setw`を使用して、配列の要素数を指定すること。
さもなくば、バッファオーバーフローの危険性がある。
あるいは、`basic_string`に対して`>>`演算子を使用することでもこの危険を回避できる。

##効果

###マニピュレータ

`pf(*this)`を呼び出す。

###bool値・数値・ポインタ

`num_get`を使用して入力のパース・数値への変換を行う。

###ストリームバッファ

ストリームからの入力を別のストリームバッファに出力する。

-# 仮引数`sb`がヌルポインタの場合、`setstate(failbit)`を呼び出して終了する。
-# `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
-# 以下のいずれかを満たすまで、`this`内のストリームバッファから文字を入力して`sb`へ出力する。
 - EOFに達した。
 - 出力処理に失敗した（この場合、失敗したときの文字は入力側のストリームバッファに戻される）。
 - 例外が発生した。

###文字

文字型`CharT`への参照を実引数として受け取る。
ただし、`CharT`がcharの場合に限り、`unsigned char`および`signed char`への参照も受け付ける。

-# `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
-# ストリームバッファから1文字取り出し、仮引数`c`に書き込む。

入力が行えなかった場合、`setstate(failbit)`を呼び出す。

###文字列

文字型`CharT`の配列の要素を指し示すポインタを実引数として受け取る。
ただし、`CharT`がcharの場合に限り、`unsigned char`および`signed char`の配列も受け付ける。

-# `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
-# ストリームバッファから文字を読み取り、仮引数`s`が指し示す配列の要素に順に書き込む。これを以下いずれかを満たすまで繰り返す。
 - 最大文字数より1文字少ない文字数だけ書き込んだ。最大文字数は`width()`の値とする。
 - EOFに達した。
 - 空白文字に達した。空白文字の判定にはストリームに設定されているロケールが考慮される。
-# `s`の末尾にヌル文字`CharT()`を書き込む。
-# `width(0)`を呼び出す。

1文字も入力がなされなかった場合、`setstate(failbit)`を呼び出す。

`width()`の値を変更するには、`setw`マニピュレータまたは`width()`メンバ関数を使用する。

###ストリームへの右辺値参照 (C++11)

`is >> x`を実行する。一時オブジェクトなどに対して、`>>`演算子を利用可能にするためのものである。


##戻り値

`*this`

##例
TBD

##出力
TBD

##実装例
TBD

##バージョン
###言語
- C++98

##参照

- [`basic_istream::get`](./get.md)
- `basic_streambuf::sgetc`
