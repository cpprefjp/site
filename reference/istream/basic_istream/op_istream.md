# operator>>
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream : virtual public basic_ios<CharT, Traits> {
    // マニピュレータ
    // 3つとも関数へのポインタを引数に取る。
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
    basic_istream<CharT, Traits>& operator>>(long long& n); // C++11
    basic_istream<CharT, Traits>& operator>>(unsigned long long& n); // C++11
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

## 概要

ストリームからの入力またはマニピュレータの実行を行う。

- マニピュレータを実行するオーバーロードそれ自体は、書式化入力関数・非書式化入力関数いずれにも該当しない。
    - マニピュレータが書式化入力関数・非書式化入力関数であるということはあり得る（例: [`ws`](../ws.md)）。
- 数値型（`bool`も含む）と`void*`に対するオーバーロードは、書式化入力関数である。
- `basic_streambuf`に対するオーバーロードは、非書式化入力関数である。
- 文字に対するオーバーロードは、書式化入力関数である。
- 文字列に対するオーバーロードは、書式化入力関数である。

### 文字列入力における注意

ここで説明するオーバーロード（`CharT*`、`unsigned char*`、`signed char*`）で文字列への入力を行う場合、必ずマニピュレータ`setw`で配列の要素数を指定すること（この記事の下方にある例（文字列）を参照）。
さもなくば、バッファオーバーフローの可能性があり、大変危険である。

あるいは、これらの代わりに`basic_string` (`std::string`、`std::wstring`など)に対して`>>`演算子を使用することでも、この危険を回避できる。
参考: [`>>`演算子 (`basic_string`)](../../string/basic_string/op_istream.md)。

## 効果

### マニピュレータ

1. `pf(*this)`を呼び出す。

### bool値・数値・ポインタ

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `num_get::get`を使用して入力のパース・数値への変換を行う。
    - ただし、`int`と`short`の場合は、`long`を実引数に取るものを使用する。結果が`int`と`short`それぞれの範囲外の値になった場合、`failbit`を追加する。
1. `num_get::get`から得られた`iostate`値を実引数にして`setstate`関数を呼び出す。

### ストリームバッファ

ストリームからの入力を別のストリームバッファに出力する。

1. 仮引数`sb`がヌルポインタの場合、`setstate(failbit)`を呼び出して終了する。
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、`this`内のストリームバッファから文字を入力して`sb`へ出力する。
    - EOFに達した。
    - 出力処理に失敗した（この場合、失敗したときの文字は入力側のストリームバッファに戻される）。
    - 例外が発生した。

入力がなされなかった場合、`setstate(failbit)`を呼び出す。

### 文字

文字型`CharT`への参照を実引数として受け取る。
ただし、`CharT`がcharの場合に限り`unsigned char`および`signed char`への参照も受け付ける。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. ストリームバッファから1文字取り出し、仮引数`c`に書き込む。

入力がなされなかった場合、`setstate(failbit)`を呼び出す。

### 文字列

文字型`CharT`の配列の要素を指し示すポインタを実引数として受け取る。
ただし、`CharT`が`char`の場合に限り、`unsigned char`および`signed char`の配列の要素を指し示すポインタも受け付ける。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. ストリームバッファから文字を読み取り、仮引数`s`が指し示す配列の要素に順に書き込む。これを以下いずれかを満たすまで繰り返す。
    - 最大文字数より1文字少ない文字数だけ書き込んだ。最大文字数は以下のようにして決まる。
        - `width()`が1以上であれば、その値を最大文字数とする。
        - `width()`が0以下であれば、ストリームの`CharT`型においてあり得る最大の配列の要素数とする。
    - EOFに達した。
    - 空白文字に達した。空白文字の判定にはストリームに設定されているロケールが考慮される。
1. `s`の末尾にヌル文字`CharT()`を書き込む。
1. `width(0)`を呼び出す。

1文字も入力がなされなかった場合、`setstate(failbit)`を呼び出す。

`width()`の値を変更するには、`setw`マニピュレータまたは`width()`メンバ関数を使用する。

### ストリームへの右辺値参照 (C++11)

`is >> x`を実行する。このオーバーロードは、一時オブジェクトなどに対して`>>`演算子を利用可能にするためのものである。


## 戻り値

`*this`

## 例（数値）
```cpp example
#include <iostream>

int main() {
  int x;
  // 好きな整数を入力してください
  if (std::cin >> x) {
    std::cout << x << "が入力されました。" << std::endl;
  }
}
```
* std::cin[link /reference/iostream/cin.md]

### 入力
```
1
```

### 出力
```
1が入力されました。
```

## 例（文字列）
```cpp example
#include <iostream>
#include <iomanip>

int main() {
  char s[8];
  // 好きな文字を入力してください
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
- C++11: `long long`、`unsigned long long`、ストリームへの右辺値参照を実引数として受け取るものが追加された

## 関連項目

- このほかの`>>`演算子関数
    - [`std::basic_string`に対するもの](../../string/basic_string/op_istream.md)
- 入力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)


## 参照
- [N2114 `long long` Goes to the Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2114.html)

