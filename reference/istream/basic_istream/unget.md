# unget
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream<CharT, Traits>& unget();
```

## 概要
（非書式化入力関数）最後に�み取った1文�をストリームバッファの入力に戻す。

非書式化入力関数であるが、初めに`eofbit`を消去する点が通常と異なる。

## 効果
1. `eofbit`を消去する。
1. `sentry`オブジェクトを構築する。
1. `!good()`なら`setstate(failbit)`して終わる。
1. `rdbuf()->sungetc()`を呼び出す。
    - `rdbuf()`がヌルポインタであるか、`sungetc()`が`Traits::eof()`を返した場合、`setstate(badbit)`を呼び出す。

## 戻り値
`*this`。

## 備考
この関数は1文�も入力を行わないため、この後の`gcount()`は`0`を返す。

## 例
```cpp example
#include <iostream>
#include <locale>
#include <sstream>
#include <string>

// isからアルファベットだけを�み込んで返す関数。
std::string input_alphabet(std::istream& is) {
  std::string s;
  char c;
  while (is.get(c)) {
    // getで得た文�がアルファベットではなかったら、ungetでストリームに戻す。
    if (!std::isalpha(c, is.getloc())) {
      is.unget();
      break;
    }
    s.push_back(c);
  }
  return s;
}

int main() {
  std::istringstream iss("abc123");
  std::cout << input_alphabet(iss) << std::endl;

  // 残りを出力
  std::cout << iss.rdbuf() << std::endl;
}
```
* unget()[color ff0000]
* std::isalpha[link /reference/locale/isalpha.md.nolink]
* getloc()[link /reference/ios/ios_base/getloc.md]
* push_back[link /reference/string/basic_string/push_back.md]
* std::istringstream[link /reference/sstream/basic_istringstream.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]

### 出力
```
abc
123
```

## 実装例
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
    例外を投げずにbadbitを�定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return *this;
}
```
* clear[link /reference/ios/basic_ios/clear.md]
* rdstate()[link /reference/ios/basic_ios/rdstate.md]
* eofbit[link /reference/ios/ios_base/type-iostate.md]
* sentry[link sentry.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* sungetc()[link /reference/streambuf/basic_streambuf/sungetc.md.nolink]
* exceptions()[link /reference/ios/basic_ios/exceptions.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]

## バージョン
### 言語
- C++98

## 参照

- [`basic_istream::putback`](putback.md)
- `basic_streambuf::sungetc`
