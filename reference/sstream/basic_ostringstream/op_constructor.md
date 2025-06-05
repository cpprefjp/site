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
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_ostringstream`オブジェクトを構築する。

## 効果
- (1) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(ios_base::out)`で構築する
- (2) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::out)`で構築する
- (3) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(s, which | ios_base::out)`で構築する
- (4) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(std::move(s), which | ios_base::out)`で構築する
- (5) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::out, a)`で構築する
- (6), (7), (8), (9), (10) : 各引数が対応する`basic_stringbuf`のコンストラクタに渡される
- (11) : `rhs`から`basic_ostringstream`オブジェクトをムーブ構築する


## 例
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
  std::ostringstream ss2("initial ");
  ss2 << "text";
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
default
initial text
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)