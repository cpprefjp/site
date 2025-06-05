# コンストラクタ
* sstream[meta header]
* std[meta namespace]
* basic_stringstream[meta class]
* function[meta id-type]

```cpp
basic_stringstream()
  : basic_stringstream(ios_base::in | ios_base::out) {}     // (1) C++11
explicit basic_stringstream(
  ios_base::openmode which);                                // (1) C++11
explicit basic_stringstream(
  ios_base::openmode which = ios_base::in | ios_base::out); // (1)+(2) C++03

explicit basic_stringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which = ios_base::in | ios_base::out); // (2) C++03

explicit basic_stringstream(
  basic_string<CharT, Traits, Allocator>&& s,
  ios_base::openmode which = ios_base::in | ios_base::out);       // (3) C++20

basic_stringstream(ios_base::openmode which, const Allocator& a); // (4) C++20

explicit basic_stringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  const Allocator& a)
    : basic_stringstream(s, ios_base::in | ios_base::out, a) {}   // (5) C++20

explicit basic_stringstream(
  const basic_string<CharT, Traits, Allocator>& s,
  ios_base::openmode which,
  const Allocator& a);                                            // (6) C++20

template<class SAlloc>
explicit basic_stringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which = ios_base::in | ios_base::out);       // (7) C++20

template<class SAlloc>
basic_stringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  const Allocator& a)
    : basic_stringstream(s, ios_base::in | ios_base::out, a) {}   // (8) C++20

template<class SAlloc>
basic_stringstream(
  const basic_string<CharT, Traits, SAlloc>& s,
  ios_base::openmode which,
  const Allocator& a);                                            // (9) C++20

basic_stringstream(basic_stringstream&& rhs);                     // (10) C++11
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_stringstream`オブジェクトを構築する。

## 効果
- (1) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(ios_base::in | ios_base::out)`で構築する
- (2) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which)`で構築する
- (3) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(s, which)`で構築する
- (4) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(std::move(s), which)`で構築する
- (5) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which, a)`で構築する
- (6), (7), (8), (9), (10) : 各引数は対応する`basic_stringbuf`のコンストラクタに渡される
- (11) : `rhs`から`basic_stringstream`オブジェクトをムーブ構築する


## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  // (1) デフォルト構築
  std::stringstream ss1;
  ss1 << "hello";
  std::string s;
  ss1 >> s;
  std::cout << s << std::endl;
  
  // (3) 文字列を指定して構築
  std::stringstream ss2("initial value");
  ss2 << " added";
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
hello
initial value added
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)