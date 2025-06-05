# str
* sstream[meta header]
* std[meta namespace]
* basic_stringstream[meta class]
* function[meta id-type]

```cpp
basic_string<CharT, Traits, Allocator> str() const;                // (1) C++03
basic_string<CharT, Traits, Allocator> str() const &;              // (1) C++20

template <class SAlloc>
basic_string<CharT, Traits, SAlloc> str(const SAlloc& sa) const &; // (2) C++20

basic_string<CharT, Traits, Allocator> str() const &&;             // (3) C++20

void str(const basic_string<CharT, Traits, Allocator>& s);  // (4) C++03

template <class SAlloc>
void str(const basic_string<CharT, Traits, SAlloc>& s);     // (5) C++20

void str(const basic_string<CharT, Traits, Allocator>&& s); // (6) C++20
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列オブジェクトを取得または設定する。

## 効果
- (1) : `return rdbuf()->str()` と等価
- (2) : `return rdbuf()->str(sa)` と等価
- (3) : `return std::move(*rdbuf()).str()` と等価
- (4) : `rdbuf()->str(s)` と等価
- (5) : `rdbuf()->str(s)` と等価
- (6) : `rdbuf()->str(std::move(s))` と等価

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  std::stringstream ss;
  
  // 文字列を設定
  ss.str("initial content");
  std::cout << "1: " << ss.str() << std::endl;
  
  // ストリームに追記
  ss << " + added";
  std::cout << "2: " << ss.str() << std::endl;
  
  // 新しい文字列で置き換え
  ss.str("new content");
  std::cout << "3: " << ss.str() << std::endl;
  
  // 読み取り位置に注意
  std::string word;
  ss >> word;  // "new"を読む
  std::cout << "Read: " << word << std::endl;
  std::cout << "4: " << ss.str() << std::endl;  // 全体は変わらない
  
  // 空文字列でクリア
  ss.str("");
  std::cout << "5: Empty? " << (ss.str().empty() ? "yes" : "no") << std::endl;
}
```

### 出力
```
1: initial content
2: initial content + added
3: new content
Read: new
4: new content
5: Empty? yes
```

## 関連項目
- [`basic_stringbuf::str`](../basic_stringbuf/str.md)
