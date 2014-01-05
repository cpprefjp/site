#unget
```cpp
basic_istream<CharT, Traits>& unget();
```

##概要
（非書式化入力関数）最後に読み取った1文字をストリームバッファの入力に戻す。

非書式化入力関数であるが、初めに`eofbit`を消去する点が通常と異なる。

##効果

1. `sentry`オブジェクトを構築する。
1. `!good()`なら`setstate(failbit)`して終わる。
1. `rdbuf()->sungetc()`を呼び出す。
 - `rdbuf()`がヌルポインタであるか、`sungetc()`が`Traits::eof()`を返した場合、`setstate(badbit)`を呼び出す。

##戻り値
`*this`。

##備考
この関数は1文字も入力を行わないため、この後の`gcount()`は`0`を返す。

##例
TBD

##出力
TBD

##実装例
```cpp
basic_istream<CharT, Traits>& unget() {
  clear(rdstate() & ~eofbit);
  try {
    sentry s(*this, true);
    if (s) {
      if (auto sb = rdbuf()) {
        if (sb->sungetc() != Traits::eof()) {
          return *this;
        }
      }
      setstate(badbit);
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return *this;
}
```

##バージョン
###言語
- C++98

##参照

- [`basic_istream::putback`](./putback.md)
- `basic_streambuf::sungetc`
