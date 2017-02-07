#seekg
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream<CharT, Traits>& seekg(pos_type pos);
basic_istream<CharT, Traits>& seekg(off_type off, seekdir dir);
```

##概要
（非書式化入力関数）ストリームバッファに対し、読み取り位置の移動を指示する。

非書式化入力関数であるが、後続の`gcount()`呼び出しに影響を及ぼさない点が通常と異なる。

`seekg`は、`seek get`の略称。「読み取り用の位置の移動」を意味する。


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
以下は、`off_type`と`seekdir`を使用する例。
`pos_type`のみを引数に取るオーバーロードの例は、[`tellg`](tellg.md)を参照。

```cpp
#include <iostream>
#include <sstream>

int main() {
  std::istringstream is("ABC");
  char x;

  is >> x;
  std::cout << x << std::endl;

  is.seekg(0, std::ios_base::beg);
  is >> x;
  std::cout << x << std::endl;
}
```
* seekg[color ff0000]
* std::istringstream[link /reference/sstream/bsic_istringstream.md]
* std::ios_base[link /reference/ios/ios_base.md]
* beg[link /reference/ios/ios_base/type-seekdir.md]

###出力
```
A
A
```

##実装例
```cpp
basic_istream<CharT, Traits>& seekg(pos_type pos) {
  iostate state = goodbit;
  try {
    this->clear(this->rdstate() & ~eofbit);
    sentry s(*this, true);
    if (s) {
      if (this->rdbuf()->pubseekpos(pos, ios_base::in) == -1) {
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

basic_istream<CharT, Traits>& seekg(off_type off, seekdir dir) {
  iostate state = goodbit;
  try {
    sentry s(*this, true);
    if (s) {
      if (this->rdbuf()->pubseekoff(off, dir, ios_base::in) == -1) {
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
* clear[link /reference/ios/basic_ios/clear.md]
* rdstate()[link /reference/ios/basic_ios/rdstate.md]
* eofbit[link /reference/ios/ios_base/type-iostate.md]
* sentry[link sentry.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* pubseekpos()[link /reference/streambuf/basic_streambuf/pubseekpos.md.nolink]
* ios_base[link /reference/ios/ios_base.md]
* in[link /reference/ios/ios_base/type-openmode.md]
* failbit[link /reference/ios/ios_base/type-iostate.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]
* exceptions()[link /reference/ios/basic_ios/exceptions.md]
* setstate[link /reference/ios/basic_ios/setstate.md]

##バージョン
###言語
- C++98

##参照

- [`basic_istream::tellg`](tellg.md)
- `basic_streambuf::pubseekpos`
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekpos`
- `basic_streambuf::seekoff`
