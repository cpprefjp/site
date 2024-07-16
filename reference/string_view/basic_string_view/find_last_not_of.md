# find_last_not_of
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr size_type find_last_not_of(basic_string_view sv,
                                     size_type pos = npos) const noexcept; // (1)
constexpr size_type find_last_not_of(CharT c,
                                     size_type pos = npos) const noexcept; // (2)
constexpr size_type find_last_not_of(const CharT* s,
                                     size_type pos,
                                     size_type n) const;                   // (3)
constexpr size_type find_last_not_of(const CharT* s,
                                     size_type pos = npos) const;          // (4)
```

## 概要
指定された文字列中のいずれかの文字にも一致しない最後の場所を検索する。

- (1) : 指定した位置`pos`より前で、文字列`sv`内のいずれかの文字にも一致しない最後の位置を検索する
- (2) : 指定した位置`pos`より前で、文字`c`に一致しない最後の位置を検索する
- (3) : 指定した位置`pos`より前で、文字列`s`の先頭`n`文字のいずれかの文字にも一致しない最後の位置を検索する
- (4) : 指定した位置`pos`より前で、文字列`s`内のいずれかの文字にも一致しない最後の位置を検索する


## 戻り値
- (1) : 一致しない文字が見つかればその位置を返し、見つからない場合は `basic_string_view::npos` を返す。
- (2) : `return find_last_not_of(basic_string_view(&c, 1), pos);`
- (3) : `return find_last_not_of(basic_string_view(s, n), pos);`
- (4) : `return find_last_not_of(basic_string_view(s), pos);`


## 例外
- (1), (2) : 投げない


## 備考
- 文字列の一致は、文字列の各文字について `traits_type::eq()` を用いて検査される。  
    例えば、(1) の形式の場合、以下のような条件を満たす最大の `xpos` を求める。
    * `xpos <= pos` かつ `xpos + sv.size() <= size()`
    * `0 <= I` かつ `I < sv.size()` を満たす全ての `I` について、`traits_type::eq(at(xpos + I), sv.at(I))`
- (4) の形式の場合、`s` の文字列長は `traits_type::length(s)` で求められる。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  const std::string_view sv = "Hello, world. Welcome to C++ world.";

  // (1)
  // 1 つめの "world" の "d" より前で "world" を検索すると、最初の空白が見つかる
  {
    const std::string_view target = "world";
    std::size_t pos = sv.find_last_not_of(target, 11);
    if (pos != std::string_view::npos) {
      std::cout << "(1) : " << pos << " [" << sv.substr(pos) << ']' << std::endl;
    }
  }

  // (2)
  // "C++" の 2 つめの "+" より前で '+' を検索すると "C" が見つかる
  {
    std::size_t pos = sv.find_last_not_of('+', 27);
    if (pos != std::string_view::npos) {
      std::cout << "(2) : " << pos << " [" << sv.substr(pos) << ']' << std::endl;
    }
  }

  // (3)
  // "Welcome to C++ world." を検索すると、"," が見つかる
  {
    std::size_t pos = sv.find_last_not_of("Welcome to C++ world.");
    if (pos != std::string_view::npos) {
      std::cout << "(3) : " << pos << " [" << sv.substr(pos) << ']' << std::endl;
    }
  }
}
```
* find_last_not_of[color ff0000]
* sv.substr[link substr.md]

### 出力
```
(1) : 6 [ world. Welcome to C++ world.]
(2) : 25 [C++ world.]
(3) : 5 [, world. Welcome to C++ world.]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
