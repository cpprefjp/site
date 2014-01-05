#seekg
```cpp
basic_istream<CharT, Traits>& seekg(pos_type pos);
basic_istream<CharT, Traits>& seekg(off_type off, seekdir dir);
```

##概要
（非書式化入力関数）ストリームバッファに対し、読み取り位置の移動を指示する。

非書式化入力関数であるが、後続の`gcount()`呼び出しに影響を及ぼさない点が通常と異なる。

##効果

1. （`pos_type`を引数に取るもののみ）初めにeofbitを消去する。
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 与えられた実引数により、以下のいずれかを実行する。
 - `rdbuf()->pubseekpos(pos, ios_base::in)`
 - `rdbuf()->pubseekoff(off, dir, ios_base::in)`
1. 失敗した場合、`setstate(failbit)`を呼び出す。

##戻り値
`*this`

##例
TBD

##出力
TBD

##実装例
```cpp
basic_istream<CharT, Traits>& seekg(pos_type pos) {
  try {
    clear(rdstate() & ~eofbit);
    sentry s(*this, true);
    if (s) {
      if (rdbuf()->pubseekpos(pos, ios_base::in) == -1) {
        setstate(failbit);
      }
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return *this;
}

basic_istream<CharT, Traits>& seekg(off_type off, seekdir dir) {
  try {
    sentry s(*this, true);
    if (s) {
      if (rdbuf()->pubseekoff(off, dir, ios_base::in) == -1) {
        setstate(failbit);
      }
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

- [`basic_istream::tellg`](./tellg.md)
- `basic_streambuf::pubseekpos`
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekpos`
- `basic_streambuf::seekoff`
