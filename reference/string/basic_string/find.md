# find
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type find(const basic_string& str, size_type pos = 0) const;          // (1) C++03
size_type find(const basic_string& str, size_type pos = 0) const noexcept; // (1) C++11

size_type find(const charT* s, size_type pos, size_type n) const;          // (2)
size_type find(const charT* s, size_type pos = 0) const;                   // (3)

size_type find(charT c, size_type pos = 0) const;                          // (4)

size_type find(std::basic_string_view<charT, traits> sv,
               size_type pos = 0) const noexcept;                          // (5) C++17
template <class T>
size_type find(const T& t, size_type pos = 0) const noexcept(see below);   // (5) C++20
```

## 概要
指定した文�列を検索する。


## テンプレートパラメータ制約
- (5) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&,` [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>>`が`true`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*>`が`false`であること


## 事前条件
- (3) : `s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


## 効果
- (1) `pos` 以降で最初に `str` と一致する位置を返す。
- (2) `pos` 以降で最初に `s` と一致する位置を返す。`s` は長さ `n` の文�列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文�列を扱う。
- (4) `pos` 以降で最初に `c` と一致する位置を返す。
- (5) :
    - C++17 : `pos` 以降で最初に `sv` と一致する位置を返す。
    - C++20 : `basic_string_view<charT, traits> sv = t;`として変数`sv`を作成し、`pos` 以降で最初に `sv` と一致する位置を返す。


## 戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


## 例外
- (1) 投げない
- (5) :
    - C++17 : 投げない
    - C++20 : `noexcept`内の式は、以下と�価である
        ```cpp
        is_nothrow_convertible_v<const T&, basic_string_view<charT, traits>>
        ```
        * is_nothrow_convertible_v[link /reference/type_traits/is_nothrow_convertible.md]
        * basic_string_view[link /reference/string_view/basic_string_view.md]


## 備考
- 文�列の一致は、文�列の各文�について `traits_type::eq()` を用いて検査される。  
	例えば、(1) の形式の場合、以下のような条件を満たす最小の `xpos` を求める。
	* `pos <= xpos` かつ `xpos + str.size() <= size()`
	* `0 <= I` かつ `I < str.size()` を満たす全ての `I` について、`traits_type::eq(at(xpos + I), str.at(I))`
- (3) の形式の場合、`s` の文�列長は `traits_type::length(s)` で求められる。


## 例
```cpp example
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
* find_word.length()[link length.md]

### 出力
```
7
29
```


## 実装例
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
size_type basic_string<charT, traits, Allocator>::find(charT c, size_type pos = 0) const
{
  return find(std::basic_string(1, c), pos);
}
```


## 関連項目

| 名前                                       | 説明                                     |
|--------------------------------------------|------------------------------------------|
| [`search`](/reference/algorithm/search.md) | 指定された最初のサブシーケンスを検索する |
| [`find`](/reference/algorithm/find.md)     | 指定された値を検索する                   |


## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [P0758R1 Implicit conversion traits and utility functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0758r1.html)
