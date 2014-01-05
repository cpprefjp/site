#tellg
```cpp
pos_type tellg();
```

##概要
（非書式化入力関数）ストリームバッファから現在の読み取り位置を取得する。

非書式化入力関数であるが、後続の`gcount()`呼び出しに影響を及ぼさない点が通常と異なる。

##効果

-# `sentry`オブジェクトを構築する。
-# 成功した場合、`rdbuf()->pubseekoff(0, cur, in)`を呼び出して戻り値とする。

##戻り値

- `fail() == false`であれば、`rdbuf()->pubseekoff(0, cur, in)`。
- `fail() == true`であれば、`pos_type(-1)`。

##例
TBD

##出力
TBD

##実装例
```cpp
basic_istream<CharT, Traits>& seekg(pos_type pos) {
  try {
    sentry s(*this, true);
    if (s) {
      return rdbuf()->pubseekoff(0, cur, ios_base::in);
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return pos_type(-1);
}
```

##バージョン
###言語
- C++98

##参照

- [`basic_istream::seekg`](./seekg.md)
- `basic_streambuf::pubseekpos`
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekpos`
- `basic_streambuf::seekoff`
