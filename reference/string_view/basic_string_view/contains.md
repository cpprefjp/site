# contains
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr bool contains(basic_string_view x) const noexcept; // (1) C++23
constexpr bool contains(charT x) const noexcept;             // (2) C++23
constexpr bool contains(const charT* x) const;               // (3) C++23
```

## 概要
指定の文字・文字列が含まれているかを判定する。

- (1) : `*this`が参照する文字列範囲に、`x`が参照する文字列範囲を含んでいるかを判定する
- (2) : `*this`が参照する文字列範囲に、文字`x`が含まれているかを判定する
- (3) : `*this`が参照する文字列範囲に、文字列`x`が含まれているかを判定する

この関数は、[`find`](find.md)`(x) != npos`の代わりに使用できる。


## 戻り値
- 以下と等価である
    ```cpp
    return find(x) != npos;
    ```
    * find[link find.md]


## 例外
- (1), (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <string_view>

int main() {
  std::string_view sv = "Hello World";

  // (1)
  {
    std::string_view target = "rl";
    assert(sv.contains(target));
  }

  // (2)
  {
    assert(sv.contains('W'));
  }

  // (3)
  {
    assert(sv.contains("rl"));
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
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1679R3 string contains function](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1679r3.html)
