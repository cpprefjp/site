# find_first_of
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr size_type find_first_of(basic_string_view sv, size_type pos = 0) const noexcept; // (1)
constexpr size_type find_first_of(CharT c, size_type pos = 0) const noexcept;              // (2)
constexpr size_type find_first_of(const CharT* s, size_type pos, size_type n) const;       // (3)
constexpr size_type find_first_of(const CharT* s, size_type pos = 0) const;                // (4)
```

## 概要
指定された文�列�のいずれかの文�が出現する最初の場所を検索する。

- (1) : 指定した位置`pos`から、文�列`sv`内のいずれかの文�が最初に現れる位置を検索する
- (2) : 指定した位置`pos`から、文�`c`が最初に現れる位置を検索する
- (3) : 指定した位置`pos`から、文�列`s`の先�`n`文�のいずれかの文�が最初に現れる位置を検索する
- (4) : 指定した位置`pos`から、文�列`s`内のいずれかの文�が最初に現れる位置を検索する


## 戻り値
- (1) : 見つかればその位置を返し、見つからない場合は `basic_string_view::npos` を返す。
- (2) : `return find_first_of(basic_string_view(&c, 1), pos);`
- (3) : `return find_first_of(basic_string_view(s, n), pos);`
- (4) : `return find_first_of(basic_string_view(s), pos);`


## 例外
- (1), (2) : 投げない


## 備考
- 文�列の一致は、文�列の各文�について `traits_type::eq()` を用いて検査される。  
	例えば、(1) の形式の場合、以下のような条件を満たす最小の `xpos` を求める。
	* `pos <= xpos` かつ `xpos + sv.size() <= size()`
	* `0 <= I` かつ `I < sv.size()` を満たす全ての `I` について、`traits_type::eq(at(xpos + I), sv.at(I))`
- (4) の形式の場合、`s` の文�列長は `traits_type::length(s)` で求められる。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  const std::string_view sv = "Hello, world. Welcome to C++ world.";
  const std::string_view target = "world";

  // (1)
  // "Welcome" 以降で "world" を検索すると、"Welcome" の 3 文�目の "l" が見つかる
  {
    std::size_t pos = sv.find_first_of(target, 14);
    if (pos != std::string_view::npos) {
      std::cout << "(1) : " << pos << std::endl;
    }
  }

  // (2)
  {
    // basic_string_view は NULL 終端されていないので、'\0' を検索しても見つからない
    std::cout << "(2) : "
              << std::boolalpha << (sv.find_first_of('\0') == std::string_view::npos)
              << std::endl;
  }
}
```
* find_first_of[color ff0000]

### 出力
```
(1) : 16
(2) : true
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
