# コンストラクタ
* sstream[meta header]
* std[meta namespace]
* basic_ostringstream[meta class]
* function[meta id-type]

```cpp
basic_ostringstream()
  : basic_ostringstream(ios_base::out) {}     // (1) C++11
explicit basic_ostringstream(
  ios_base::openmode which);                  // (2) C++11
explicit basic_ostringstream(
  ios_base::openmode which = ios_base::out);  // (1)+(2) C++03

explicit basic_ostringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which = ios_base::out);         // (2) C++03

explicit basic_ostringstream(
  basic_string<CharT, Traits, Allocator>&& s,
  ios_base::openmode which = ios_base::out);         // (3) C++20

basic_ostringstream(
  ios_base::openmode which,
  const Allocator& a);                               // (4) C++20

explicit basic_ostringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  const Allocator& a)
    : basic_ostringstream(s, ios_base::out, a) {}    // (5) C++20

explicit basic_ostringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which,
  const Allocator& a);                               // (6) C++20

template<class SAlloc>
explicit basic_ostringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which = ios_base::out);         // (7) C++20

template<class SAlloc>
basic_ostringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  const Allocator& a)
    : basic_ostringstream(s, ios_base::out, a) {}    // (8) C++20

template<class SAlloc>
basic_ostringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which,
  const Allocator& a);                               // (9) C++20

basic_ostringstream(basic_ostringstream&& rhs);      // (10) C++11

template<class T>
explicit basic_ostringstream(
  const T& t,
  ios_base::openmode which = ios_base::out);         // (11) C++26

template<class T>
basic_ostringstream(
  const T& t,
  const Allocator& a);                               // (12) C++26

template<class T>
basic_ostringstream(
  const T& t,
  ios_base::openmode which,
  const Allocator& a);                               // (13) C++26
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_ostringstream`オブジェクトを構築する。

ここで、初期値として設定する文字列は、既存のファイルを上書きモードで開くことに似ており、ストリームの初期位置が先頭のまま、ストリーム内容の文字列を設定するものである。モードとして[`std::ios_base::ate`](/reference/ios/ios_base/type-openmode.md)を指定しすると、ストリームの初期位置が末尾に設定される。

- (1) : デフォルトコンストラクタ
- (2) : 指定されたモードで構築する
- (3) : 初期文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーを指定して構築する
- (4) : 指定されたモードとアロケータで構築する
- (5) : 初期文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (6) : 初期文字列として[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (7) : 初期文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、モードを指定して構築する
- (8) : 初期文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピーと、アロケータを指定して構築する
- (9) : 初期文字列として`Allocator`に変換可能なアロケータをもつ[`std::basic_string`](/reference/string/basic_string.md)オブジェクトのコピー、モード、アロケータを指定して構築する
- (10) : ムーブコンストラクタ
- (11) : 初期文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、モードを指定して構築する
- (12) : 初期文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列と、アロケータを指定して構築する
- (13) : 初期文字列として[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列、モード、アロケータを指定して構築する


## テンプレートパラメータ制約
- (11), (12), (13) : `is_convertible_v<const T&, basic_string_view<CharT, Traits>>`が`true`であること

## 効果
- (1) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(ios_base::out)`で構築する
- (2) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::out)`で構築する
- (3) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(s, which | ios_base::out)`で構築する
- (4) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(std::move(s), which | ios_base::out)`で構築する
- (5) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::out, a)`で構築する
- (6), (7), (8), (9) : 各引数が対応する`basic_stringbuf`のコンストラクタに渡される
- (10) : `rhs`から`basic_ostringstream`オブジェクトをムーブ構築する
- (11) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which | ios_base::out`に設定する
- (12) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`ios_base::out`、アロケータは`a`に設定する
- (13) : `basic_string_view<CharT, Traits>(t)`で文字列を初期化し、モードは`which | ios_base::out`、アロケータは`a`に設定する


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  // (1) デフォルト構築
  std::ostringstream ss1;
  ss1 << "default";
  std::cout << ss1.str() << std::endl;
  
  // (3) 文字列を指定して構築
  std::ostringstream ss2("xxxx yyyy");
  ss2 << "text";
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

#### 出力
```
default
text yyyy
```

### string_viewからの構築 (C++26)
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main()
{
  // 文字列リテラルから構築
  std::ostringstream ss1{"Hello?", std::ios_base::ate};
  ss1 << "World";
  std::cout << ss1.str() << std::endl;

  // string_viewから構築
  std::string_view sv = "Hello?";
  std::ostringstream ss2{sv};
  ss2 << "World";
  std::cout << ss2.str() << std::endl;
}
```

#### 出力
```
Hello?World
World?
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した