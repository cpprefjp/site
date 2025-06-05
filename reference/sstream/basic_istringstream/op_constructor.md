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
```
* ios_base[link /reference/ios/ios_base.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
`basic_istringstream`オブジェクトを構築する。

## 効果
- (1) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(ios_base::in)`で構築する
- (2) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::in)`で構築する
- (3) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(s, which | ios_base::in)`で構築する
- (4) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(std::move(s), which | ios_base::in)`で構築する
- (5) : 内部の`basic_stringbuf`オブジェクトを`basic_stringbuf<CharT, Traits, Allocator>(which | ios_base::in, a)`で構築する
- (6), (7), (8), (9), (10) : 各引数が対応する`basic_stringbuf`のコンストラクタに渡される
- (11) : `rhs`から`basic_istringstream`オブジェクトをムーブ構築する


## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  // (1) デフォルト構築
  std::istringstream ss1;
  
  // (3) 文字列を指定して構築
  std::istringstream ss2("initial text");
  
  int value;
  ss2 >> value;
  std::cout << value << std::endl;
}
```

### 出力
```
initial
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)