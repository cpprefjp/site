# ends_with
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool
  ends_with(std::basic_string_view<charT, traits> x) const noexcept; // (1) C++20
constexpr bool
  ends_with(charT x) const noexcept;                                 // (2) C++20
constexpr bool
  ends_with(const charT* x) const;                                   // (3) C++20
```

## 概要
指定の文字列で終わるかを判定する。

- (1) : `*this`が保持する文字列の末尾が、`x`が参照する文字列範囲と一致するかを判定する
- (2) : `*this`が保持する文字列の末尾が、文字`x`と一致するかを判定する
- (3) : `*this`が保持する文字列の末尾が、文字列`x`と一致するかを判定する


## 戻り値
以下と等価である：

```cpp
return std::basic_string_view<CharT, Traits>(data(), size()).ends_with(x);
```
* data()[link data.md]
* size()[link size.md]
* ends_with[link /reference/string_view/basic_string_view/ends_with.md]


## 例外
- (1), (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <string>

int main()
{
  const std::string s = "aaabbbcccdddeee";

  // (1)
  {
    std::string_view sv = "eee"; 
    assert(s.ends_with(sv));
  }

  // (2)
  {
    assert(s.ends_with('e'));
  }

  // (3)
  {
    assert(s.ends_with("eee"));
  }
}
```
* ends_with[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 1 [mark verified]

## 参照
- [P0457R2 String Prefix and Suffix Checking](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0457r2.html)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
