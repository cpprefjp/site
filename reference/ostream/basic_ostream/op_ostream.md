#operator<<
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ostream : virtual public basic_ios<CharT, Traits> {
    // マニピュレータ
    // 3つとも関数へのポインタを引数に取る。
    basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& (*pf)(basic_ostream<CharT, Traits>&));
    basic_ostream<CharT, Traits>& operator<<(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&));
    basic_ostream<CharT, Traits>& operator<<(ios_base& (*pf)(ios_base&));

    // bool値・数値・ポインタ
    basic_ostream<CharT, Traits>& operator<<(bool n);
    basic_ostream<CharT, Traits>& operator<<(short n);
    basic_ostream<CharT, Traits>& operator<<(unsigned short n);
    basic_ostream<CharT, Traits>& operator<<(int n);
    basic_ostream<CharT, Traits>& operator<<(unsigned int n);
    basic_ostream<CharT, Traits>& operator<<(long n);
    basic_ostream<CharT, Traits>& operator<<(unsigned long n);
    basic_ostream<CharT, Traits>& operator<<(long long n); // C++11
    basic_ostream<CharT, Traits>& operator<<(unsigned long long n); // C++11
    basic_ostream<CharT, Traits>& operator<<(float f);
    basic_ostream<CharT, Traits>& operator<<(double f);
    basic_ostream<CharT, Traits>& operator<<(long double f);
    basic_ostream<CharT, Traits>& operator<<(const void* p);

    // ストリームバッファ
    basic_ostream<CharT, Traits>& operator<<(basic_streambuf<CharT, Traits>* sb);

    ……
  };

  // 文字
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, CharT c);
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, char c);
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, char c);
  template<class CharT, class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, unsigned char c);
  template<class CharT, class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, signed char c);

  // 文字列
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const CharT s);
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const char s);
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, const char s);
  template<class CharT, class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const unsigned char s);
  template<class CharT, class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const signed char s);

  // ストリームへの右辺値参照 (C++11)
  template<class CharT, class Traits, class T>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>&& is, T& x);
}
```

##概要

ストリームへの出力またはマニピュレータの実行を行う。

- マニピュレータを実行する多重定義それ自体は、書式化出力関数・非書式化出力関数いずれにも該当しない。
- 数値型（`bool`も含む）と`void*`に対する多重定義は、書式化出力関数である。
- `basic_streambuf`に対する多重定義は、非書式化出力関数である。
- 文字に対する多重定義は、書式化出力関数である。
- 文字列に対する多重定義は、書式化出力関数である。

##効果

###マニピュレータ

1. `pf(*this)`を呼び出す。

###bool値・数値・ポインタ

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `num_put::put`を使用して入力のパース・数値への変換を行う。実引数を渡すに際し、一部の型では以下のように型変換を行う。
    - `short`
        - `flags()`に`hex`または`oct`が設定されていれば`static_cast<long>(static_cast<unsigned short>(n))`
        - それ以外では`static_cast<long>(n)`
    - `int`
        - `flags()`に`hex`または`oct`が設定されていれば`static_cast<long>(static_cast<unsigned int>(n))`
        - それ以外では`static_cast<long>(n)`
    - `unsigned short`、`unsigned int`: `static_cast<unsigned long>(n)`
    - `float`: `static_cast<double>(n)`
1. `num_put::put`から得られた`iostate`値を実引数にして`setstate`関数を呼び出す。

###ストリームバッファ

別のストリームバッファからの入力をストリームに出力する。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 仮引数`sb`がヌルポインタの場合、`setstate(badbit)`を呼び出して終了する。
1. 以下のいずれかを満たすまで、`sb`から文字を入力して`this`へ出力する。
    - EOFに達した。
    - 出力処理に失敗した（この場合、失敗したときの文字は入力側のストリームバッファに戻される）。
    - 例外が発生した。

入力がなされなかった場合、`setstate(failbit)`を呼び出す。

###文字

文字型`CharT`、`char`を実引数として受け取る。
ただし、`CharT`がcharの場合に限り、`unsigned char`および`signed char`も受け付ける。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `c`を出力する。ただし、入力が`char`、`singed char`、`unsigned char`で出力先の`char_type`が`char`以外なら、`os.widen(c)`を出力する。
    - `width()`と`flags() & (ios_base::adjustfield)`に従ってパディングの出力も行う。
1. `width(0)`を呼び出す。

###文字列

ヌル終端の文字列（文字型の配列の要素を指し示すポインタ）を実引数として受け取る。
文字型として`CharT`、`char`に対応している。
ただし、`CharT`がcharの場合に限り`unsigned char`および`signed char`も受け付ける。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 仮引数`s`が指し示す文字列を出力する。
    - 文字数は以下で求める。
        - `CharT`文字列: `traits_type::length(s)`
        - `char`文字列: `std::char_traits<char>::length(s)`
        - `signed char`と`unsigned char`文字列: `std::char_traits<char>::length(s)`
    - `width()`と`flags() & (ios_base::adjustfield)`に従ってパディングの出力も行う。
1. `width(0)`を呼び出す。

###ストリームへの右辺値参照 (C++11)

`os << x`を実行する。この多重定義は、一時オブジェクトなどに対して`<<`演算子を利用可能にするためのものである。


##戻り値

`*this`

##例
```cpp
#include <iostream>

int main() {
  std::cout << 101 << std::endl;
}
```

###出力例
```
101
```

##実装例
TBD

##バージョン
###言語
- C++98
- C++11: `long long`、`unsigned long long`、ストリームへの右辺値参照を実引数として受け取るものが追加された

##参照

- このほかの`<<`演算子関数
    - [`std::basic_string`に対するもの](../../string/basic_string/op_ostream.md)
- 出力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)
