#find
```cpp
size_type find(const basic_string& str, size_type pos = 0) const noexcept; // (1)
size_type find(const charT* s, size_type pos, size_type n) const;          // (2)
size_type find(const charT* s, size_type pos = 0) const;                   // (3)
size_type find(charT c, size_type pos = 0) const;                          // (4) C++11
size_type find(charT c, size_type pos = 0) const noexcept;                 // (4) C++14
```

##概要
指定した文字列を検索する。


##要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


##効果
- (1) `pos` 以降で最初に `str` と一致する位置を返す。
- (2) `pos` 以降で最初に `s` と一致する位置を返す。`s` は長さ `n` の文字列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文字列を扱う。
- (4) `pos` 以降で最初に `c` と一致する位置を返す。


##戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


##例外
- (1) 投げない
- (2) -
- (3) -
- (4) 投げない（但し、備考参照）


##備考
- 文字列の一致は、文字列の各文字について `traits_type::eq` を用いて検査される。  
	例えば、(1) の形式の場合、以下のような条件を満たす最小の `xpos` を求める。
	* `pos <= xpos` かつ `xpos + str.size() <= size()`
	* `0 <= I` かつ `I < str.size()` を満たす全ての `I` について、`traits_type::eq(at(xpos + I), str.at(I))`
- (3) の形式の場合、`s` の文字列長は `traits_type::length(s)` で求められる。
- C++03 では、例外指定は無い。
- C++11 では、(4) の形式には `noexcept` が付いているが、下記の実装例のような実装を許すために C++14 では削除されるかもしれない。  
	（そのような実装では新たな `std::basic_string` が割り当てられるため、メモリのアロケーションが行われる）
- コンテナに対して同様の検索を行う関数は [`algorithm`](/reference/algorithm.md) ヘッダの [`search`](/reference/algorithm/search.md)（検索対象がシーケンスの場合）、あるいは [`find`](/reference/algorithm/find.md)（検索対象が単一の値の場合）であるが、これらがイテレータベースであるのに対して、本メンバ関数は添字ベースであることに注意。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  const std::string s("hello, world. welcome to C++ world.");
  const std::string find_word("world");
  std::string::size_type pos = s.find(find_word);
  while (pos != std::string::npos) {
    std::cout << pos << std::endl;
    pos = s.find(find_word, pos + find_word.length());
  }
}
```
* find[color ff0000]

###出力
```cpp
7
29
```


##実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find(const charT* s, size_type pos, size_type n) const
{
  return find(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find(const charT* s, size_type pos = 0) const
{
  return find(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find(charT c, size_type pos = 0) const noexcept
{
  return find(std::basic_string(1, c), pos);
}
```


##参照

| 名前                                       | 説明                                     |
|--------------------------------------------|------------------------------------------|
| [`search`](/reference/algorithm/search.md) | 指定された最初のサブシーケンスを検索する |
| [`find`](/reference/algorithm/find.md)     | 指定された値を検索する                   |

- [LWG2064 - More noexcept issues in basic_string](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2064)


