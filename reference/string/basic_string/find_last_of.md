# find_last_of
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type find_last_of(const basic_string& str, size_type pos = npos) const;          // (1) C++03
size_type find_last_of(const basic_string& str, size_type pos = npos) const noexcept; // (1) C++11

size_type find_last_of(const charT* s, size_type pos, size_type n) const;             // (2)
size_type find_last_of(const charT* s, size_type pos = npos) const;                   // (3)

size_type find_last_of(charT c, size_type pos = npos) const;                          // (4)

size_type find_last_of(std::basic_string_view<charT, traits> sv,
                       size_type pos = npos) const noexcept;                          // (5) C++17
```

## 概要
指定された文�列�のいずれかの文�が出現する最後の場所を検索する。


## 要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


## 効果
- (1) `pos` より前で最後に `str` 内に�在する文�の位置を返す。
- (2) `pos` より前で最後に `s` 内に�在する文�の位置を返す。`s` は長さ `n` の文�列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文�列を扱う。
- (4) `pos` より前で最後に `c` と一致する文�の位置を返す。
- (5) `pos` より前で最後に `sv` 内に�在する文�の位置を返す。


## 戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


## 例外
- (1) 投げない
- (5) 投げない


## 備考
- 一致する文�の検索は、指定された文�列の各文�について `traits_type::eq` を使用することで行われる。  
	例えば、(1) の形式の場合、以下のような条件を満たす最大の `xpos` を求める。
	* `xpos <= pos` かつ `xpos < size()`
	* `0 <= I` かつ `I < str.size()` を満たすいずれかの `I` について、`traits_type::eq(at(xpos), str.at(I))`
- (3) の形式の場合、`s` の文�列長は `traits_type::length(s)` で求められる。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::string s("Hello, world. Welcome to C++ world.");
  const std::string str("world");

  // "C++" の "C" 以前で "world" を検索すると、"to" の 2 文�目の "o" が見つかる
  std::cout << s.find_last_of(str, 25) << std::endl;

  // "Hello," の "," 以前で ",.+" を検索すると、"," が見つかる
  std::cout << s.find_last_of(",.+", 5) << std::endl;

  // 標準の char_traits では大文�と小文�は区別されるため、"world" の "w" は見つからずに "Welcome" の "W" が見つかる
  std::cout << s.find_last_of('W') << std::endl;
}
```
* find_last_of[color ff0000]

### 出力
```
23
5
14
```


## 実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_of(const charT* s, size_type pos, size_type n) const
{
  return find_last_of(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_of(const charT* s, size_type pos = npos) const
{
  return find_last_of(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_of(charT c, size_type pos = npos) const
{
  return find_last_of(std::basic_string(1, c), pos);
}
```

## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
