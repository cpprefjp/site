# seekp
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>& seekp(pos_type pos);              // (1)
basic_ostream<CharT, Traits>& seekp(off_type off, seekdir dir); // (2)
```

## 概要
ストリームバッファに対し、書き込み位置の移動を指示する。

`seekp`は、`seek put`の略称。「書き込み用の位置の移動」を意味する。

## 効果

- (1) 出力ストリームの書き込み位置を `pos` に�定する。
- (2) 出力ストリームの書き込み位置を `dir` を基準として相対位置 `off` に�定する。

## 戻り値
`*this`

## 備考
本関数の処理内容は以下の通り。

1. [`sentry`](sentry.md) オブジェクトを構築する（C++11 以降のみ）。
1. 与えられた実引数により、以下のいずれかを実行する。
    - (1) [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()->`[`pubseekpos`](../../streambuf/basic_streambuf/pubseekpos.md.nolink)`(pos, ios_base::out)`
    - (2) [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()->`[`pubseekoff`](../../streambuf/basic_streambuf/pubseekoff.md.nolink)`(off, dir, ios_base::out)`
1. 処理に失敗した場合（上記の戻り値が `-1` だった場合）、[`setstate`](../../ios/basic_ios/setstate.md)`(failbit)`を呼び出す。

## 例
以下は、`off_type` と `seekdir` を使用する例。
`pos_type` のみを引数に取るオーバー�ードの例は、[`tellp`](tellp.md) を参照。

```cpp example
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
* std::ostringstream[link ../../sstream/basic_ostringstream.md.nolink]
* seekp[color ff0000]
* str()[link ../../sstream/basic_ostringstream/str.md.nolink]

### 出力
```
123ABC
```

## 実装例
```cpp
basic_ostream<CharT, Traits>& seekp(pos_type pos) {
  sentry s(*this);
  if (!this->fail()) {
    if (this->rdbuf()->pubseekpos(pos, ios_base::out) == pos_type(-1)) {
      this->setstate(failbit);
    }
  }
  return *this;
}

basic_ostream<CharT, Traits>& seekp(off_type off, seekdir dir) {
  sentry s(*this);
  if (!this->fail()) {
    if (this->rdbuf()->pubseekoff(off, dir, ios_base::out) == pos_type(-1)) {
      this->setstate(failbit);
    }
  }
  return *this;
}
```
* sentry[link sentry.md]
* fail[link ../../ios/basic_ios/fail.md]
* rdbuf[link ../../ios/basic_ios/rdbuf.md]
* pubseekpos[link ../../streambuf/basic_streambuf/pubseekpos.md.nolink]
* pubseekoff[link ../../streambuf/basic_streambuf/pubseekoff.md.nolink]
* setstate[link ../../ios/basic_ios/setstate.md]

## バージョン
### 言語
- C++98

## 参照

- [`basic_ostream::tellp`](tellp.md)
- [`basic_streambuf::pubseekpos`](../../streambuf/basic_streambuf/pubseekpos.md.nolink)
- [`basic_streambuf::pubseekoff`](../../streambuf/basic_streambuf/pubseekoff.md.nolink)
