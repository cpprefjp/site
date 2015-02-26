#find_last_not_of
* string[meta header]
* std[meta namespace]

```cpp
size_type find_last_not_of(const basic_string& str, size_type pos = npos) const noexcept; // (1)
size_type find_last_not_of(const charT* s, size_type pos, size_type n) const;             // (2)
size_type find_last_not_of(const charT* s, size_type pos = npos) const;                   // (3)
size_type find_last_not_of(charT c, size_type pos = npos) const noexcept;                 // (4) C++11
size_type find_last_not_of(charT c, size_type pos = npos) const;                          // (4) C++14
```

##概要
指定された文字列中のいずれの文字にも一致しない最後の場所を検索する。


##要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


##効果
- (1) `pos` 以前で最後に `str` 内に存在しない文字の位置を返す。
- (2) `pos` 以前で最後に `s` 内に存在しない文字の位置を返す。`s` は長さ `n` の文字列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文字列を扱う。
- (4) `pos` 以前で最後に `c` と一致しない文字の位置を返す。


##戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


##例外
- (1) 投げない
- (2) -
- (3) -
- (4) 投げない（但し、備考参照）


##備考
- 一致しない文字の検索は、指定された文字列の各文字について `traits_type::eq` を使用することで行われる。  
	例えば、(1) の形式の場合、以下のような条件を満たす最大の `xpos` を求める。
	* `xpos <= pos` かつ `xpos < size()`
	* `0 <= I` かつ `I < str.size()` を満たす全ての `I` について、`!traits_type::eq(at(xpos), str.at(I))`
- (3) の形式の場合、`s` の文字列長は `traits_type::length(s)` で求められる。
- C++03 では、例外指定は無い。
- C++11 では、(4) の形式には `noexcept` が付いているが、下記の実装例のような実装を許すために C++14 では削除されるかもしれない。  
	（そのような実装では新たな `std::basic_string` が割り当てられるため、メモリのアロケーションが行われる）


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  const std::string s("Hello, world. Welcome to C++ world.");
  const std::string str("world");

  // 1 つめの "world" の "d" 以前で "world" を検索すると、最初の空白が見つかる
  std::cout << s.find_last_not_of(str, 11) << std::endl;

  // "Welcome to C++ world." を検索すると、"," が見つかる
  std::cout << s.find_last_not_of("Welcome to C++ world.") << std::endl;

  // "C++" の 2 つめの "+" 以前で '+' を検索すると "C" が見つかる
  std::cout << s.find_last_not_of('+', 27) << std::endl;
}
```
* find_last_not_of[color ff0000]

###出力
```cpp
6
5
25
```


##実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_not_of(const charT* s, size_type pos, size_type n) const
{
  return find_last_not_of(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_not_of(const charT* s, size_type pos = npos) const
{
  return find_last_not_of(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_last_not_of(charT c, size_type pos = npos) const noexcept
{
  return find_last_not_of(std::basic_string(1, c), pos);
}
```

##参照
- [LWG2064 - More noexcept issues in basic_string](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2064)

