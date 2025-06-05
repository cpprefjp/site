# str
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]

```cpp
basic_string<CharT, Traits, Allocator> str() const;                // (1) C++03
basic_string<CharT, Traits, Allocator> str() const &;              // (1) C++20

template <class SAlloc>
basic_string<CharT, Traits, SAlloc> str(const SAlloc& sa) const;   // (2) C++20

basic_string<CharT, Traits, Allocator> str() &&;                   // (3) C++20

void str(const basic_string<CharT, Traits, Allocator>& s);  // (4) C++03

template <class SAlloc>
void str(const basic_string<CharT, Traits, SAlloc>& s);     // (5) C++20

void str(const basic_string<CharT, Traits, Allocator>&& s); // (6) C++20
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列オブジェクトを取得または設定する。

## 効果
- (1) : 文字列オブジェクトを取得する
- (2) : 文字列オブジェクトを取得して、`SAlloc`型のアロケータ`sa`によって確保する
- (3) : 保持する文字列オブジェクトをムーブして取得する
- (4) : 文字列オブジェクト`s`を設定する
- (5) : `SAlloc`型のアロケータによって確保されているデータをコピーして、文字列オブジェクト`s`を設定する
- (6) : 与えられた文字列オブジェクト`s`をムーブして設定する

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  // 文字列の取得
  std::stringbuf buf;
  buf.sputn("Hello, World!", 13);
  std::cout << "1: " << buf.str() << std::endl;
  
  // 文字列の設定
  buf.str("New content");
  std::cout << "2: " << buf.str() << std::endl;
  
  // 読み書き位置のリセット
  buf.str("Read/Write test");
  
  // 読み取り
  char ch;
  ch = buf.sbumpc();  // 'R'
  ch = buf.sbumpc();  // 'e'
  std::cout << "3: After reading 2 chars: " << buf.str() << std::endl;
  
  // 書き込み（現在の位置から）
  buf.sputc('X');
  buf.sputc('Y');
  std::cout << "4: After writing: " << buf.str() << std::endl;
  
  // C++20: ムーブによる設定
  std::string s = "Move test";
  buf.str(std::move(s));
  std::cout << "5: " << buf.str() << std::endl;
  
  // 空文字列でクリア
  buf.str("");
  std::cout << "6: Empty? " << (buf.str().empty() ? "yes" : "no") << std::endl;
}
```
* sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* sbumpc[link /reference/streambuf/basic_streambuf/sbumpc.md]
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]

### 出力
```
1: Hello, World!
2: New content
3: After reading 2 chars: Read/Write test
4: After writing: ReXY/Write test
5: Move test
6: Empty? yes
```
