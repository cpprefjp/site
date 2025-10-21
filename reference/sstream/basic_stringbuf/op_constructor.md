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

template<class T>
explicit
basic_stringbuf(
  const T& t,
  ios_base::openmode which = ios_base::in | ios_base::out);   // (13) C++26

template<class T>
basic_stringbuf(
  const T& t,
  const Allocator& a);                                        // (14) C++26

template<class T>
basic_stringbuf(
  const T& t,
  ios_base::openmode which,
  const Allocator& a);                                        // (15) C++26
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_stringbuf`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : 指定されたモードで構築する
- (3) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、指定されたモードで構築する
- (4) : モードとアロケータを指定して構築する
- (5) : アロケータを指定して構築する
- (6) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (7) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (8) : 入力文字列として`Allocator`に変換可能なアロケータ型をもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、指定されたモードで構築する
- (9) : 入力文字列として`Allocator`に変換可能なアロケータ型をもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (10) : 入力文字列として`Allocator`に変換可能なアロケータ型をもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (11) : ムーブコンストラクタ
- (12) : ムーブコンストラクタでアロケータを指定して構築する
- (13) : 入力文字列として[`basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、モードを設定する
- (14) : 入力文字列として[`basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、アロケータを設定する
- (15) : 入力文字列として[`basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、モードとアロケータを設定する


## テンプレートパラメータ制約
- (13), (14), (15) : `is_convertible_v<const T&, basic_string_view<CharT, Traits>>`が`true`であること


## 効果
- (1) : 内部の文字列バッファを空にし、モードは`ios_base::in | ios_base::out`に設定する
- (2) : 内部の文字列バッファを空にし、モードは`which`に設定する
- (3) : 内部の文字列バッファを`s`のコピー、モードは`which`に設定する
- (4) : 内部の文字列バッファを`std::move(s)`で、モードは`which`に設定する
- (5) : 内部の文字列バッファを空にし、モードは`which`、アロケータは`a`に設定する
- (6), (7), (8), (9), (10) : 各引数は内部状態の初期化に使用される
- (11) : `rhs`から`basic_stringbuf`オブジェクトをムーブ構築する
- (12) : `rhs`から`basic_stringbuf`オブジェクトをムーブ構築し、アロケータは`a`を使用する
- (13) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which`に設定する
- (14) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`ios_base::in | ios_base::out`、アロケータは`a`に設定する
- (15) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which`、アロケータは`a`に設定する


## 例
### 基本的な使い方
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
  std::stringbuf buf2("initial", std::ios_base::out | std::ios_base::app);
  buf2.sputc('!');
  std::cout << buf2.str() << std::endl;
}
```
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* str()[link str.md]
* std::ios_base[link /reference/ios/ios_base.md]
* out[link /reference/ios/ios_base/type-openmode.md]
* app[link /reference/ios/ios_base/type-openmode.md]

#### 出力
```
a
initial!
```

#### string_viewからの構築 (C++26)
```cpp example
#include <print>
#include <sstream>
#include <string_view>

int main()
{
  std::string_view sv = "from string literal";
  std::stringbuf buf1{sv};
  std::println("{}", buf1.str());

  std::string_view sv2 = "from string_view";
  std::stringbuf buf2{sv2};
  std::println("{}", buf2.str());
}
```

#### 出力
```
from string literal
from string_view
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した
