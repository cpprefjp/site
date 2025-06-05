# コンストラクタ
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]

```cpp
basic_stringbuf()
  : basic_stringbuf(ios_base::in | ios_base::out) {}        // (1) C++11
explicit basic_stringbuf(
  ios_base::openmode which);                                // (2) C++11
explicit basic_stringbuf(
  ios_base::openmode which = ios_base::in | ios_base::out); // (1)+(2) C++03

explicit basic_stringbuf(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which = ios_base::in | ios_base::out);  // (2) C++03

explicit basic_stringbuf(
  basic_string<CharT, Traits, Allocator>&& s,
  ios_base::openmode which = ios_base::in | ios_base::out);   // (3) C++20

basic_stringbuf(
  ios_base::openmode which,
  const Allocator& a);                                        // (4) C++20

explicit basic_stringbuf(const Allocator& a)
  : basic_stringbuf(ios_base::in | ios_base::out, a) {}       // (5) C++20

explicit basic_stringbuf(
  const basic_string<CharT, Traits, Allocator>& s,
  const Allocator& a)
    : basic_stringbuf(s, ios_base::in | ios_base::out, a) {}  // (6) C++20

explicit basic_stringbuf(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which,
  const Allocator& a);                                        // (7) C++20

template<class SAlloc>
explicit basic_stringbuf(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which = ios_base::in | ios_base::out);   // (8) C++20

template<class SAlloc>
basic_stringbuf(
  const basic_string<CharT, Traits, SAlloc>& s,
  const Allocator& a)
    : basic_stringbuf(s, ios_base::in | ios_base::out, a) {}  // (9) C++20

template<class SAlloc>
basic_stringbuf(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which,
  const Allocator& a);                                        // (10) C++20

basic_stringbuf(basic_stringbuf&& rhs);                       // (11) C++11
basic_stringbuf(basic_stringbuf&& rhs, const Allocator& a);   // (12) C++20
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_stringbuf`オブジェクトを構築する。

## 効果
- (1) : 内部の文字列バッファを空にし、モードは`ios_base::in | ios_base::out`に設定する
- (2) : 内部の文字列バッファを空にし、モードは`which`に設定する
- (3) : 内部の文字列バッファを`s`のコピー、モードは`which`に設定する
- (4) : 内部の文字列バッファを`std::move(s)`で、モードは`which`に設定する
- (5) : 内部の文字列バッファを空にし、モードは`which`、アロケータは`a`に設定する
- (6), (7), (8), (9), (10), (11) : 各引数は内部状態の初期化に使用される
- (12) : `rhs`から`basic_stringbuf`オブジェクトをムーブ構築する
- (13) : `rhs`から`basic_stringbuf`オブジェクトをムーブ構築し、アロケータは`a`を使用する


## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  // (1) デフォルト構築
  std::stringbuf buf1;
  buf1.sputc('a');
  std::cout << buf1.str() << std::endl;
  
  // (3) 文字列を指定して構築
  std::stringbuf buf2("initial");
  buf2.sputc('!');
  std::cout << buf2.str() << std::endl;
}
```
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* str()[link str.md]

### 出力
```
a
initial!
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)