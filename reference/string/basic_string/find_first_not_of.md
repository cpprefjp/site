# find_first_not_of
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type
  find_first_not_of(const basic_string& str,
                    size_type pos = 0) const;          // (1) C++03
size_type
  find_first_not_of(const basic_string& str,
                    size_type pos = 0) const noexcept; // (1) C++11
constexpr size_type
  find_first_not_of(const basic_string& str,
                    size_type pos = 0) const noexcept; // (1) C++20

size_type
  find_first_not_of(const charT* s,
                    size_type pos,
                    size_type n) const; // (2) C++03
constexpr size_type
  find_first_not_of(const charT* s,
                    size_type pos,
                    size_type n) const; // (2) C++20

size_type
  find_first_not_of(const charT* s,
                    size_type pos = 0) const; // (3) C++03
constexpr size_type
  find_first_not_of(const charT* s,
                    size_type pos = 0) const; // (3) C++20

size_type
  find_first_not_of(charT c,
                    size_type pos = 0) const; // (4) C++03
constexpr size_type
  find_first_not_of(charT c,
                    size_type pos = 0) const; // (4) C++20

// string_viewを引数に取るオーバーロード
template <class T>
size_type
  find_first_not_of(const T& t,
                    size_type pos = 0) const noexcept(下記参照); // (5) C++17
template <class T>
constexpr size_type
  find_first_not_of(const T& t,
                    size_type pos = 0) const noexcept(下記参照); // (5) C++20
```

## 概要
指定された文字列中のいずれの文字にも一致しない最初の場所を検索する。

## テンプレートパラメータ制約
- (5) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&,` [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>>`が`true`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*>`が`false`であること

## 要件
(3) の形式の場合、`s` は少なくとも `traits_type::length(s) + 1` の要素を持つ `charT` の配列を指していること。


## 効果
- (1) `pos` 以降で最初に `str` 内に存在しない文字の位置を返す。
- (2) `pos` 以降で最初に `s` 内に存在しない文字の位置を返す。`s` は長さ `n` の文字列へのポインタである。
- (3) (2) と同様だが、こちらは NULL 終端の文字列を扱う。
- (4) `pos` 以降で最初に `c` と一致しない文字の位置を返す。
- (5) `basic_string_view<charT, traits> sv = t;`として変数`sv`を作成し、`pos` 以降で最初に `sv` 内に存在しない文字の位置を返す。


## 戻り値
見つかればその位置を返し、見つからない場合は `basic_string::npos` を返す。


## 例外
- (1) 投げない
- (5) `noexcept`内の式は、以下と等価である
        ```cpp
        is_nothrow_convertible_v<const T&, basic_string_view<charT, traits>>
        ```
        * is_nothrow_convertible_v[link /reference/type_traits/is_nothrow_convertible.md]
        * basic_string_view[link /reference/string_view/basic_string_view.md]


## 備考
- 一致しない文字の検索は、指定された文字列の各文字について `traits_type::eq` を使用することで行われる。  
	例えば、(1) の形式の場合、以下のような条件を満たす最小の `xpos` を求める。
	* `pos <= xpos` かつ `xpos < size()`
	* `0 <= I` かつ `I < str.size()` を満たす全ての `I` について、`!traits_type::eq(at(xpos), str.at(I))`
- (3) の形式の場合、`s` の文字列長は `traits_type::length(s)` で求められる。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::string s("Hello, world. Welcome to C++ world.");
  const std::string str("world");

  // "Hello" の "l" 以降で "world" を指定すると、"," が見つかる
  std::cout << s.find_first_not_of(str, 2) << std::endl;

  // "Hello" の "e" 以降で "worlde,. " を指定すると、"Welcome" の 1 文字目の "W" が見つかる
  std::cout << s.find_first_not_of("worlde,. ", 1) << std::endl;

  // "C++" の 1文字目の "+" 以降で '+' を指定すると、直後の空白が見つかる
  std::cout << s.find_first_not_of('+', 26) << std::endl;
}
```
* find_first_not_of[color ff0000]

### 出力
```
5
14
28
```


## 実装例
(1) 以外の形式は、(1) の形式を使用して実装することができる。
```cpp
// (2)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_not_of(const charT* s, size_type pos, size_type n) const
{
  return find_first_not_of(std::basic_string(s, n), pos);
}

// (3)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_not_of(const charT* s, size_type pos = 0) const
{
  return find_first_not_of(std::basic_string(s), pos);
}

// (4)
template <class charT, class traits, class Allocator>
size_type basic_string<charT, traits, Allocator>::find_first_not_of(charT c, size_type pos = 0) const
{
  return find_first_not_of(std::basic_string(1, c), pos);
}
```

## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(5)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
