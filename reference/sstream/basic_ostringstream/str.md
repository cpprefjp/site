# str
* sstream[meta header]
* std[meta namespace]
* basic_ostringstream[meta class]
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
  // 文字列の取得
  std::ostringstream oss;
  oss << "Hello " << 123 << " World";
  std::cout << "Content: " << oss.str() << std::endl;
  
  // 追記モード
  oss << " + more";
  std::cout << "After append: " << oss.str() << std::endl;
  
  // 新しい文字列を設定（内容を置き換える）
  oss.str("Reset content");
  std::cout << "After reset: " << oss.str() << std::endl;
  
  // 書き込み位置は先頭にリセットされる
  oss << "!!";
  std::cout << "After write: " << oss.str() << std::endl;
  
  // 空文字列でクリア
  oss.str("");
  oss << "Fresh start";
  std::cout << "Final: " << oss.str() << std::endl;
}
```

### 出力
```
Content: Hello 123 World
After append: Hello 123 World + more
After reset: Reset content
After write: !!set content
Final: Fresh start
```

## 関連項目
- [`basic_stringbuf::str`](../basic_stringbuf/str.md)
