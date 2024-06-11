# ends_with
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ends_with(basic_string_view x) const noexcept; // (1)
constexpr bool ends_with(CharT x) const noexcept;             // (2)
constexpr bool ends_with(const CharT* x) const;               // (3)
```

## 概要
指定の文字列で終わるかを判定する。

- (1) : `*this`が参照する文字列範囲の末尾が、`x`が参照する文字列範囲と一致するかを判定する
- (2) : `*this`が参照する文字列範囲の末尾が、文字`x`と一致するかを判定する
- (3) : `*this`が参照する文字列範囲の末尾が、文字列`x`と一致するかを判定する


## 戻り値
- (1) : 以下と等価である
    ```cpp
    return size() >= x.size() && compare(size() - x.size(), npos, x) == 0;
    ```
    * size()[link size.md]
    * compare[link compare.md]

- (2) : 以下と等価である
    ```cpp
    return !empty() && Traits::eq(back(), x);
    ```
    * empty()[link empty.md]
    * Traits::eq[link /reference/string/char_traits/eq.md]
    * back()[link back.md]

- (3) : 以下と等価である
    ```cpp
    return ends_with(basic_string_view(x));
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
    std::string_view svx = "eee"; 
    assert(sv.ends_with(svx));
  }

  // (2)
  {
    assert(sv.ends_with('e'));
  }

  // (3)
  {
    assert(sv.ends_with("eee"));
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
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0457R2 String Prefix and Suffix Checking](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0457r2.html)
- [LWG Issue 3040. `basic_string_view::starts_with` Effects are incorrect](https://wg21.cmeerw.net/lwg/issue3040)
