# rfind
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr size_type rfind(basic_string_view s, size_type pos = npos) const noexcept; // (1)
constexpr size_type rfind(CharT c, size_type pos = npos) const noexcept;             // (2)
constexpr size_type rfind(const CharT* s, size_type pos, size_type n) const;         // (3)
constexpr size_type rfind(const CharT* s, size_type pos = npos) const;               // (4)
```

## 概要
最後に現れる指定文字列を検索する。

- (1) : 指定した位置`pos`より前で、`*this`に含まれる部分文字列`sv`が最後に現れる位置を検索する
- (2) : 指定した位置`pos`より前で、`*this`に含まれる文字`c`が最後に現れる位置を検索する
- (3) : 指定した位置`pos`より前で、`*this`に含まれる部分文字列`s`の先頭`n`文字が最後に現れる位置を検索する
- (4) : 指定した位置`pos`より前で、`*this`に含まれる部分文字列`s`が最後に現れる位置を検索する


## 戻り値
- (1) : 見つかればその位置を返し、見つからない場合は `basic_string_view::npos` を返す。
- (2) : `return rfind(basic_string_view(&c, 1), pos);`
- (3) : `return rfind(basic_string_view(s, n), pos);`
- (4) : `return rfind(basic_string_view(s), pos);`


## 例外
- (1), (2) : 投げない


## 備考
- `pos` は比較対象となる最後の文字位置では無いことに注意。（例を参照）
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
  const std::string_view sv = "Hello World";

  // (1)
  {
    const std::string_view target = "o";
    std::size_t pos = sv.rfind(target); // うしろの"o"が見つかる
    if (pos != std::string_view::npos) {
      std::cout << "(1) : found " << pos << std::endl;
    }
  }

  // (2)
  {
    std::size_t pos = sv.rfind('o');
    if (pos != std::string_view::npos) {
      std::cout << "(2) : found " << pos << std::endl;
    }
  }

  // (3)
  {
    // "Hello World"の末尾4番目の位置'W'から、"oAAA"の先頭1文字'o'が最後に現れる位置を検索する。
    // 返される位置は、先頭からの絶対位置
    std::size_t pos = sv.rfind("oAAA", 6, 1);
    if (pos != std::string_view::npos) {
      std::cout << "(3) : found " << pos << std::endl;
    }
  }

  // (4)
  {
    std::size_t pos = sv.rfind("o");
    if (pos != std::string_view::npos) {
      std::cout << "(4) : found " << pos << std::endl;
    }
  }
}
```
* rfind[color ff0000]

### 出力
```
(1) : found 7
(2) : found 7
(3) : found 4
(4) : found 7
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
