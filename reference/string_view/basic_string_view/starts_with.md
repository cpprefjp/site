# starts_with
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool starts_with(basic_string_view x) const noexcept; // (1)
constexpr bool starts_with(CharT x) const noexcept;             // (2)
constexpr bool starts_with(const CharT* x) const;               // (3)
```

## 概要
指定の文字列で始まるかを判定する。

- (1) : `*this`が参照する文字列範囲の先頭が、`x`が参照する文字列範囲と一致するかを判定する
- (2) : `*this`が参照する文字列範囲の先頭が、文字`x`と一致するかを判定する
- (3) : `*this`が参照する文字列範囲の先頭が、文字列`x`と一致するかを判定する


## 戻り値
- (1) : 以下と等価である
    ```cpp
    return substr(0, x.size()) == x;
    ```
    * substr[link substr.md]
    * x.size()[link size.md]

- (2) : 以下と等価である
    ```cpp
    return !empty() && Traits::eq(front(), x);
    ```
    * empty()[link empty.md]
    * Traits::eq[link /reference/string/char_traits/eq.md]
    * front()[link front.md]

- (3) : 以下と等価である
    ```cpp
    return starts_with(basic_string_view(x));
    ```


## 例外
- (1), (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  const std::string_view sv = "aaabbbcccdddeee";

  // (1)
  {
    std::string_view svx = "aaa"; 
    assert(sv.starts_with(svx));
  }

  // (2)
  {
    assert(sv.starts_with('a'));
  }

  // (3)
  {
    assert(sv.starts_with("aaa"));
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
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0457R2 String Prefix and Suffix Checking](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0457r2.html)
- [LWG Issue 3040. `basic_string_view::starts_with` Effects are incorrect](https://wg21.cmeerw.net/lwg/issue3040)
