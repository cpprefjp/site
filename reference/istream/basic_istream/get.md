#get
* istream[meta header]
* std[meta namespace]

```cpp
// 1文字
int_type get();
basic_istream<CharT, Traits>& get(char_type c);

// 文字列
basic_istream<CharT, Traits>& get(char_type* s, streamsize n);
basic_istream<CharT, Traits>& get(char_type* s, streamsize n, char_type delim);
basic_istream<CharT, Traits>& get(basic_streambuf<char_type, Traits>* sb);
basic_istream<CharT, Traits>& get(basic_streambuf<char_type, Traits>* sb, char_type delim);
```

##概要

（非書式化入力関数）ストリームから文字または文字列を入力する。

- 上2つの多重定義は1文字のみの入力を行う。
- 残りの多重定義は`delim`または改行までの文字を入力する。入力した文字の受け取り先に応じてさらに多重定義されている。
    - 配列要素へのポインタ`s`（要素数`n`）へ書き込むもの。
    - ストリームバッファ`sb`へ書き込むもの。

##効果

###1文字
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. ストリームバッファから1文字入力を行う。
1. 入力が行えなかった場合、`setstate(failbit)`を呼び出す。
1. （引数`c`を受け取るもののみ）入力した文字を`c`に代入する。

###文字列

仮引数`delim`を持たない2つの多重定義は、それぞれ以下を実行する。

- `get(s, n, widen('\n'))`
- `get(sb, n, widen('\n'))`

仮引数`delim`を持つ残りの2つは以下の処理を実行する。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、文字を入力して書き込む。
    - 配列要素へのポインタ`s`を引数に取るもの
        - 引数`n`文字より1文字少ない文字数まで入力した。
        - EOFに達した。この場合、`setstate(eofbit)`を呼び出す。
        - 次に入力する文字を`c`として、`Traits::eq_int_type(Traits::to_int_type(c), delim)`が真となった。
    - ストリームバッファへのポインタ`sb`を引数に取るもの
        - EOFに達した。この場合、`setstate(eofbit)`を呼び出す。
        - `sb`への出力処理に失敗した。
        - 次に入力する文字を`c`として、`Traits::eq_int_type(Traits::to_int_type(c), delim)`が真となった。
        - 例外が送出された（例外は捕捉され、再送出されることはない）。

`str`に1文字も入力が行われなかった場合、`is.setstate(ios_base::failbit)`が呼び出される。

配列要素へのポインタ`s`を引数に取るものについては、入力の如何に関わらず末尾にヌル文字を書き込む処理が行われる。

##戻り値

- `int_type`を返すものについては入力した文字。入力が行われなければ`Traits::eof()`。
- `basic_istream<CharT, Traits>&`を返すものについては`*this`。

##例（文字）
```cpp
#include <iostream>
#include <locale>
#include <string>

int main() {
  int x = std::cin.get();
  if (x != EOF) {
    std::cout << std::char_traits<char>::to_char_type(x) << std::endl;
  }

  char y;
  if (std::cin.get(y)) {
    std::cout << y << std::endl;
  }
}
```

###入力
```
12
```

###出力
```
1
2
```

##実装例
TBD

##バージョン
###言語
- C++98

##参照
- [`basic_streambuf`](../../streambuf/basic_streambuf.md)
