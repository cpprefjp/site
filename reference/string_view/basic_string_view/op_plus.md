# operator+
* string[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(type_identity_t<basic_string_view<charT, traits>> lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (1) C++26

  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(type_identity_t<basic_string_view<charT, traits>> lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (2) C++26
}
```
* type_identity_t[link /reference/type_traits/type_identity.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
[`basic_string_view`](../basic_string_view.md)オブジェクトと[`basic_string`](/reference/string/basic_string.md)オブジェクトを連結する。

- (1) : [`basic_string_view`](../basic_string_view.md)オブジェクトと`basic_string`オブジェクトを連結する
- (2) : [`basic_string_view`](../basic_string_view.md)オブジェクトと右辺値の`basic_string`オブジェクトを連結する

`basic_string_view`側の引数に[`type_identity_t`](/reference/type_traits/type_identity.md)を使用することで非推論コンテキストとし、`basic_string_view`に暗黙変換可能な型からの連結を可能にしている。


## 戻り値
- (1) : 以下と等価
    ```cpp
    basic_string<charT, traits, Allocator> r = rhs;
    r.insert(0, lhs);
    return r;
    ```
    * insert[link /reference/string/basic_string/insert.md]

- (2) : 以下と等価
    ```cpp
    rhs.insert(0, lhs);
    return std::move(rhs);
    ```
    * insert[link /reference/string/basic_string/insert.md]


## 例
```cpp example
#include <iostream>
#include <string>
#include <string_view>

int main()
{
  std::string_view sv = "Hello, ";
  std::string s = "World!";

  // string_view + string (1)
  std::string result1 = sv + s;
  std::cout << result1 << '\n';

  // string_view + string&& (2)
  std::string result2 = sv + std::string("World!");
  std::cout << result2 << '\n';
}
```
* +[color ff0000]

### 出力
```
Hello, World!
Hello, World!
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

| 名前                          | 説明                   |
|-------------------------------|------------------------|
| [`basic_string::operator+`](/reference/string/basic_string/op_plus.md) | 文字列の連結 |

## 参照
- [P2591R5 Concatenation of strings and string views](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2591r5.html)
