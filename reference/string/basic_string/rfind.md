# rfind
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type rfind(const basic_string& str, size_type pos = npos) const;          // (1) C++03
size_type rfind(const basic_string& str, size_type pos = npos) const noexcept; // (1) C++11

size_type rfind(const charT* s, size_type pos, size_type n) const;             // (2)
size_type rfind(const charT* s, size_type pos = npos) const;                   // (3)

size_type rfind(charT c, size_type pos = npos) const noexcept;                 // (4) C++11
size_type rfind(charT c, size_type pos = npos) const;                          // (4) C++14
```

## 概要
指定した文字列を検索する。


## 要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


## 効果
- (1) `pos` より前で最後に `str` と一致する位置を返す。
- (2) `pos` より前で最後に `s` と一致する位置を返す。`s` は長さ `n` の文字列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文字列を扱う。
- (4) `pos` より前で最後に `c` と一致する位置を返す。


## 戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


## 例外
- (1) 投げない
- (2) -
- (3) -
- (4) 投げない（但し、備考参照）


## 備考
- `pos` は比較対象となる最後の文字位置では無いことに注意。（例を参照）
- 文字列の一致は、文字列の各文字について `traits_type::eq` を用いて検査される。  
	例えば、(1) の形式の場合、以下のような条件を満たす最大の `xpos` を求める。
	* `xpos <= pos` かつ `xpos + str.size() <= size()`
	* `0 <= I` かつ `I < str.size()` を満たす全ての `I` について、`traits_type::eq(at(xpos + I), str.at(I))`
- (3) の形式の場合、`s` の文字列長は `traits_type::length(s)` で求められる。
- C++03 では、例外指定は無い。
- C++11 では、(4) の形式には `noexcept` が付いているが、下記の実装例のような実装を許すために C++14 では削除されるかもしれない。  
	（そのような実装では新たな `std::basic_string` が割り当てられるため、メモリのアロケーションが行われる）
- コンテナに対して同様の検索を行う関数は [`algorithm`](/reference/algorithm.md) ヘッダの [`find_end`](/reference/algorithm/find_end.md)であるが、これらがイテレータベースであるのに対して、本メンバ関数は添字ベースであることに注意。  
	なお、[`algorithm`](/reference/algorithm.md) には検索対象が単一の値の場合の関数は存在しない。




## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::string s("Hello, world. Welcome to C++ world.");
  const std::string str("world");

  // pos を後ろの "world" の "w" の位置にしても、後ろの "world" が見つかる
  std::cout << s.rfind(str, 29) << std::endl;

  // pos を後ろの "world" の "w" の一つ前にすると、後ろの "world" は見つからずに前の "world" が見つかる
  std::cout << s.rfind("world", 28) << std::endl;

  // 標準の char_traits では大文字と小文字は区別されるため、"world" の "w" は見つからずに "Welcome" の "W" が見つかる
  std::cout << s.rfind('W', 29) << std::endl;
}
```
* rfind[color ff0000]

### 出力
```cpp
29
7
14
```


## 実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::rfind(const charT* s, size_type pos, size_type n) const
{
  return rfind(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::rfind(const charT* s, size_type pos = npos) const
{
  return rfind(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::rfind(charT c, size_type pos = npos) const noexcept
{
  return rfind(std::basic_string(1, c), pos);
}
```


## 参照

| 名前                                           | 説明                                     |
|------------------------------------------------|------------------------------------------|
| [`find_end`](/reference/algorithm/find_end.md) | 指定された最後のサブシーケンスを検索する |

- [LWG2064 - More noexcept issues in basic_string](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2064)
