# operator>> (非メンバ関数)
* istream[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // 文�
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is, CharT& c);        // (1) C++03
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, unsigned char& c); // (2) C++03
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, signed char& c);   // (3) C++03

  // 文�列
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is, CharT* c);             // (4) C++03
  template<class CharT, class Traits, std::size_t N>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is, CharT (&s)[N]);        // (4) C++20
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, unsigned char* c);      // (5) C++03
  template<class Traits, std::size_t N>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, unsigned char (&s)[N]); // (5) C++20
  template<class Traits>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, signed char* c);        // (6) C++03
  template<class Traits, std::size_t N>
  basic_istream<char, Traits>& operator>>(basic_istream<CharT, Traits>& is, signed char (&s)[N]);   // (6) C++20

  // 右辺値参照ストリームからの入力
  template<class CharT, class Traits, class T>
  basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>&& is, T& x);           // (7) C++11
}
```

## 概要

ストリームからの入力を行う。

- 文�、および、文�列に対するオーバー�ードは、書式化入力関数である。
- 右辺値参照ストリームからの入力に対するオーバー�ードそれ自体は、書式化入力関数・非書式化入力関数いずれにも該当しない。
    - 実際に実行される入力が書式化入力関数・非書式化入力関数であるということはあり得る。

### 文�列入力における注意

ここで説明するオーバー�ード（`CharT*`、`unsigned char*`、`signed char*`）で文�列への入力を行う場合、必ずマニピュレータ`setw`で配列の要素数を指定すること（この記事の下方にある例（文�列）を参照）。
さもなくば、バッファオーバーフ�ーの可能性があり、大変危険である。

あるいは、これらの代わりに`basic_string` (`std::string`、`std::wstring`など)に対して`>>`演算�を使用することでも、この危険を回避できる。
参考: [`>>`演算� (`basic_string`)](../../string/basic_string/op_istream.md)。

## 効果

### 文�

文�型`CharT`への参照を実引数として受け取る。
ただし、`CharT`が`char`の場合に限り`unsigned char`および`signed char`への参照も受け付ける。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクト構築が失敗を示した場合、何もしない。
1. ストリームバッファから1文�取り出し、仮引数`c`に書き込む。

入力がなされなかった場合、`setstate(failbit)`を呼び出す。

### 文�列

- C++03 : 文�型`CharT`の配列の要素を指し示すポインタを実引数として受け取る
    - ただし、`CharT`が`char`の場合に限り、`unsigned char`および`signed char`の配列の要素を指し示すポインタも受け付ける
- C++20 : 文�型`CharT`の要素数が判明している配列への参照を受け取る

1. `sentry`オブジェクトを構築する。`sentry`オブジェクト構築が失敗を示した場合、何もしない。
1. ストリームバッファから文�を�み取り、仮引数`s`が指し示す配列の要素に順に書き込む。これを以下いずれかを満たすまで繰り返す。
    - 最大文�数より1文�少ない文�数だけ書き込んだ。最大文�数は以下のようにして決まる。
        - `width()`が1以上であれば、その値を最大文�数とする。
        - `width()`が0以下であれば、ストリームの`CharT`型においてあり得る最大の配列の要素数とする。
    - EOFに達した。
    - 空白文�に達した。空白文�の判定にはストリームに�定されている�ケールが考慮される。
1. `s`の末尾にヌル文�`CharT()`を書き込む。
1. `width(0)`を呼び出す。

1文�も入力がなされなかった場合、`setstate(failbit)`を呼び出す。

`width()`の値を変更するには、`setw`マニピュレータまたは`width()`メンバ関数を使用する。

### 右辺値参照ストリームからの入力 (C++11)

`is >> x`を実行する。このオーバー�ードは、ストリームの一時オブジェクトなどに対して`>>`演算�を利用可能にするためのものである。


## 戻り値

`*this`


## 例（文�列）
```cpp example
#include <iostream>
#include <iomanip>

int main() {
  char s[8];
  // 好きな文�を入力してください
  if (std::cin >> std::setw(sizeof (s)) >> s) {
    std::cout << s << "が入力されました。" << std::endl;
  }
}
```

### 入力
```
Kerberos
```

### 出力
```
Kerberoが入力されました。
```

## 実装例
TBD

## バージョン
### 言語
- C++98
- C++11: 右辺値参照ストリームを演算�の左辺として受け取るものが追加された

## 関連項目

- このほかの`>>`演算�関数
    - [bool値・数値・ポインタ、ストリームバッファ、マニピュレータに関するもの](op_istream.md)
    - [`std::basic_string`に関するもの](../../string/basic_string/op_istream.md)
- 入力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)

## 参照
- [P0487R1 Fixing `operator>>(basic_istream&, CharT*)` (LWG 2499)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0487r1.html)
