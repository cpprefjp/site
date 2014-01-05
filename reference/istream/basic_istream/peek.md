#peek
```cpp
int_type peek();
```

##概要
（非書式化入力関数）ストリームバッファから次に入力される文字を先読みする。

##戻り値

- `good() == true`なら、`rdbuf()->sgetc()`。
- `good() == false`なら、`Traits::eof()`。

##例
TBD

##出力
TBD

##実装例
```cpp
int_type peek() {
  try {
    sentry s(*this, true);
    if (s) {
      return rdbuf()->sgetc();
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return Traits::eof();
}
```

##バージョン
###言語
- C++98

##参照

- [`basic_istream::get`](./get.md)
- `basic_streambuf::sgetc`
