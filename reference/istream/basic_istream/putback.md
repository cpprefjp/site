# putback
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream<CharT, Traits>& putback(char_type c);
```

## 概要
（非書式化入力関数）指定した1文�をストリームバッファの入力に戻す。
実引数で戻す文�を指定する点が`unget`メンバ関数と異なる。

非書式化入力関数であるが、初めに`eofbit`を消去する点が通常と異なる。

## 効果

1. `sentry`オブジェクトを構築する。
1. `!good()`なら`setstate(failbit)`を呼び出して終わる。
1. `rdbuf()->sputbackc()`を呼び出す。
    - `rdbuf()`がヌルポインタであるか、`sputbackc()`が`Traits::eof()`を返した場合、`setstate(badbit)`を呼び出す。

## 戻り値
`*this`。

## 備考
この関数は1文�も入力を行わないため、この後の`gcount()`は常に`0`を返す。

## 例
```
#include <iostream>
#include <locale>
#include <string>

// 入力の先�を大文�にしてから文�列として�み込む
std::string get_word(std::istream& is) {
  std::string s;
  char c;
  if (is >> c) {
    // 大文�にしてからput_backで戻す。
    is.putback(std::toupper(c, is.getloc()));

    is >> s;
  }
  return s;
}

int main() {
  std::cout << get_word(std::cin) << std::endl;
}
```
* putback[color ff0000]
* std::toupper[link /reference/locale/toupper.md]
* getloc()[link /reference/ios/ios_base/getloc.md]
* std::cin[link /reference/iostream/cin.md]

### 入力
```
tomato
```

### 出力
```
Tomato
```

## 実装例
```cpp
basic_istream<CharT, Traits>& putback(char_type c) {
  clear(rdstate() & ~eofbit);
  try {
    sentry s(*this, true);
    if (s) {
      if (auto sb = rdbuf()) {
        if (sb->sputbackc(c) != Traits::eof()) {
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

## バージョン
### 言語
- C++98

## 参照

- [`basic_istream::unget`](unget.md)
- `basic_streambuf::sputbackc`
