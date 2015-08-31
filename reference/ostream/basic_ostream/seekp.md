#seekp
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>& seekp(pos_type pos);
basic_ostream<CharT, Traits>& seekp(off_type off, seekdir dir);
```

##概要
ストリームバッファに対し、書き込み位置の移動を指示する。

`seekp`は、`seek put`の略称。「書き込み用の位置の移動」を意味する。

##効果

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 与えられた実引数により、以下のいずれかを実行する。
    - `rdbuf()->pubseekpos(pos, ios_base::out)`
    - `rdbuf()->pubseekoff(off, dir, ios_base::out)`
1. 失敗した場合、`setstate(failbit)`を呼び出す。

##戻り値
`*this`

##例
以下は、`off_type`と`seekdir`を使用する例。
`pos_type`のみを引数に取る多重定義の例は、[`tellp`](tellp.md)を参照。

```cpp
#include <iostream>
#include <sstream>

int main() {
  std::ostringstream os;
  os << "12345";
  os.seekp(-2, std::ios_base::cur);
  os << "ABC";
  std::cout << os.str() << std::endl;
}
```

###出力
```
123ABC
```

##実装例
```cpp
basic_ostream<CharT, Traits>& seekp(pos_type pos) {
  iostate state = goodbit;
  try {
    sentry s(*this);
    if (s) {
      if (this->rdbuf()->pubseekpos(pos, ios_base::out) == -1) {
        state |= failbit;
      }
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((this->exceptions() & badbit) != 0) {
      throw;
    }
  }
  this->setstate(state);
  return *this;
}

basic_ostream<CharT, Traits>& seekp(off_type off, seekdir dir) {
  iostate state = goodbit;
  try {
    sentry s(*this);
    if (s) {
      if (this->rdbuf()->pubseekoff(off, dir, ios_base::out) == -1) {
        state |= failbit;
      }
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((this->exceptions() & badbit) != 0) {
      throw;
    }
  }
  this->setstate(state);
  return *this;
}
```

##バージョン
###言語
- C++98

##参照

- [`basic_ostream::tellp`](tellp.md)
- `basic_streambuf::pubseekpos`
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekpos`
- `basic_streambuf::seekoff`
