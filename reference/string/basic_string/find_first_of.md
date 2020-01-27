# find_first_of
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type find_first_of(const basic_string& str, size_type pos = 0) const;          // (1) C++03
size_type find_first_of(const basic_string& str, size_type pos = 0) const noexcept; // (1) C++11

size_type find_first_of(const charT* s, size_type pos, size_type n) const;          // (2)
size_type find_first_of(const charT* s, size_type pos = 0) const;                   // (3)

size_type find_first_of(charT c, size_type pos = 0) const;                          // (4)

size_type find_first_of(std::basic_string_view<charT, traits> sv,
                        size_type pos = 0) const noexcept;                          // (5) C++17
```

## 概要
指定された文�列�のいずれかの文�が出現する最初の場所を検索する。


## 要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


## 効果
- (1) `pos` 以降で最初に `str` 内に�在する文�の位置を返す。
- (2) `pos` 以降で最初に `s` 内に�在する文�の位置を返す。`s` は長さ `n` の文�列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文�列を扱う。
- (4) `pos` 以降で最初に `c` と一致する文�の位置を返す。
- (5) `pos` 以降で最初に `sv` 内に�在する文�の位置を返す。


## 戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


## 例外
- (1) 投げない
- (5) 投げない


## 備考
- 一致する文�の検索は、指定された文�列の各文�について `traits_type::eq` を使用することで行われる。  
	例えば、(1) の形式の場合、以下のような条件を満たす最小の `xpos` を求める。
	* `pos <= xpos` かつ `xpos < size()`
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

  // "Welcome" 以降で "world" を検索すると、"Welcome" の 3 文�目の "l" が見つかる
  std::cout << s.find_first_of(str, 14) << std::endl;

  // "Welcome" 以降で ",.+" を検索すると、"C++" の 1 文�目の "+" が見つかる
  std::cout << s.find_first_of(",.+", 14) << std::endl;

  // basic_string は NULL 終端されていないので、'\0' を検索しても見つからない
  std::cout << std::boolalpha << (s.find_first_of('\0') == std::string::npos) << std::endl;
}
```
* find_first_of[color ff0000]

### 出力
```
16
26
true
```


## 実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_of(const charT* s, size_type pos, size_type n) const
{
  return find_first_of(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_of(const charT* s, size_type pos = 0) const
{
  return find_first_of(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_of(charT c, size_type pos = 0) const
{
  return find_first_of(std::basic_string(1, c), pos);
}
```


## 関連項目

| 名前                                                     | 説明                                          |
|----------------------------------------------------------|-----------------------------------------------|
| [`find_first_of`](/reference/algorithm/find_first_of.md) | ある集合の1つとマッチする最初の要素を検索する |


## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
