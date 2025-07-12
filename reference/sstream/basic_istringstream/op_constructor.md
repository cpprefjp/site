# コンストラクタ
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
* function[meta id-type]

```cpp
basic_istringstream()
  : basic_istringstream(ios_base::in) {}      // (1) C++11
explicit basic_istringstream(
  ios_base::openmode which);                  // (2) C++11
explicit basic_istringstream(
  ios_base::openmode which = ios_base::in);   // (1)+(2) C++03

explicit basic_istringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which = ios_base::in);          // (2) C++03

explicit basic_istringstream(
  basic_string<CharT, Traits, Allocator>&& s,
  ios_base::openmode which = ios_base::in);          // (3) C++20

basic_istringstream(
  ios_base::openmode which,
  const Allocator& a);                               // (4) C++20

explicit basic_istringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  const Allocator& a)
    : basic_istringstream(s, ios_base::in, a) {}     // (5) C++20

explicit basic_istringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which,
  const Allocator& a);                               // (6) C++20

template<class SAlloc>
explicit basic_istringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which = ios_base::in);          // (7) C++20

template<class SAlloc>
basic_istringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  const Allocator& a)
    : basic_istringstream(s, ios_base::in, a) {}     // (8) C++20

template<class SAlloc>
basic_istringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which,
  const Allocator& a);                               // (9) C++20

basic_istringstream(basic_istringstream&& rhs);      // (10) C++11

template<class T>
explicit basic_istringstream(
  const T& t,
  ios_base::openmode which = ios_base::in);          // (11) C++26

template<class T>
basic_istringstream(
  const T& t,
  const Allocator& a);                               // (12) C++26

template<class T>
basic_istringstream(
  const T& t,
  ios_base::openmode which,
  const Allocator& a);                               // (13) C++26
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_istringstream`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : 指定されたモードで構築する
- (3) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーを指定して構築する
- (4) : 指定されたモードとアロケータで構築する
- (5) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (6) : 入力文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (7) : 入力文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、モードを指定して構築する
- (8) : 入力文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (9) : 入力文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (10) : ムーブコンストラクタ
- (11) : 入力文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、モードを指定して構築する
- (12) : 入力文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、アロケータを指定して構築する
- (13) : 入力文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列、モード、アロケータを指定して構築する


## テンプレートパラメータ制約
- (11), (12), (13) : `is_convertible_v<const T&, basic_string_view<CharT, Traits>>`が`true`であること

## 効果
- (1) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(ios_base::in)`で構築する
- (2) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::in)`で構築する
- (3) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(s, which | ios_base::in)`で構築する
- (4) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(std::move(s), which | ios_base::in)`で構築する
- (5) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::in, a)`で構築する
- (6), (7), (8), (9) : 各引数が対応する`basic_stringbuf`のコンストラクタに渡される
- (10) : `rhs`から`basic_istringstream`オブジェクトをムーブ構築する
- (11) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which | ios_base::in`に設定する
- (12) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`ios_base::in`、アロケータは`a`に設定する
- (13) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which | ios_base::in`、アロケータは`a`に設定する


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  // (1) デフォルト構築
  std::istringstream ss1;
  
  // (3) 文字列を指定して構築
  std::istringstream ss2("initial text");
  
  std::string value;
  ss2 >> value;
  std::cout << value << std::endl;
}
```

#### 出力
```
initial
```

### string_viewからの構築 (C++26)
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main()
{
  // 文字列リテラルから構築
  std::istringstream ss1{"Hello World"};
  std::string s1;
  ss1 >> s1;
  std::cout << s1 << std::endl;

  // string_viewから構築
  std::string_view sv = "Hello World";
  std::istringstream ss2{sv};
  std::string s2;
  ss2 >> s2;
  std::cout << s2 << std::endl;
}
```

#### 出力
```
Hello
Hello
```


## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した
