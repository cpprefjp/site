# starts_with
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool starts_with(std::basic_string_view<charT, traits> x) const noexcept; // (1)
bool starts_with(charT x) const noexcept;                                 // (2)
bool starts_with(const charT* x) const;                                   // (3)
```

## 概要
指定の文�列で始まるかを判定する。

- (1) : `*this`が保持する文�列の先�が、`x`が参照する文�列範囲と一致するかを判定する
- (2) : `*this`が保持する文�列の先�が、文�`x`と一致するかを判定する
- (3) : `*this`が保持する文�列の先�が、文�列`x`と一致するかを判定する


## 戻り値
以下と�価である：

```cpp
return std::basic_string_view<charT, traits>(data(), size()).starts_with(x);
```
* data()[link data.md]
* size()[link size.md]
* starts_with[link /reference/string_view/basic_string_view/starts_with.md]


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
    std::string_view sv = "aaa";
    assert(s.starts_with(sv));
  }

  // (2)
  {
    assert(s.starts_with('a'));
  }

  // (3)
  {
    assert(s.starts_with("aaa"));
  }
}
```
* starts_with[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2019 update 1

## 参照
- [P0457R2 String Prefix and Suffix Checking](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0457r2.html)
