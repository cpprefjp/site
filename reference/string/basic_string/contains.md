# contains
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr bool contains(basic_string_view<charT, traits> x) const noexcept; // (1) C++23
constexpr bool contains(charT x) const noexcept;                            // (2) C++23
constexpr bool contains(const charT* x) const;                              // (3) C++23
```

## 概要
指定の文字・文字列が含まれているかを判定する。

- (1) : `*this`が保持する文字列に、`x`が参照する文字列範囲を含んでいるかを判定する
- (2) : `*this`が保持する文字列に、文字`x`が含まれているかを判定する
- (3) : `*this`が保持する文字列に、文字列`x`が含まれているかを判定する

この関数は、[`find`](find.md)`(x) != npos`の代わりに使用できる。


## 戻り値
- 以下と等価である
    ```cpp
    return basic_string_view<charT, traits>(data(), size()).contains(x);
    ```
    * contains[link /reference/string_view/basic_string_view/contains.md]
    * data()[link data.md]
    * size()[link size.md]


## 例外
- (1), (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <string>

int main() {
  std::string s = "Hello World";

  // (1)
  {
    std::string_view target = "rl";
    assert(s.contains(target));
  }

  // (2)
  {
    assert(s.contains('W'));
  }

  // (3)
  {
    assert(s.contains("rl"));
  }
}
```
* contains[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 12.0 [mark verified]
- [GCC](/implementation.md#gcc): 11 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 [mark verified]


## 参照
- [P1679R3 string contains function](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1679r3.html)
