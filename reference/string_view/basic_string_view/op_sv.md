# svリテラル
* string_view[meta header]
* std::string_view_literals[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace string_view_literals {
  constexpr std::string_view    operator""sv(const char* str, std::size_t len) noexcept;
  constexpr std::u16string_view operator""sv(const char16_t* str, std::size_t len) noexcept;
  constexpr std::u32string_view operator""sv(const char32_t* str, std::size_t len) noexcept;
  constexpr std::wstring_view   operator""sv(const wchar_t* str, std::size_t len) noexcept;
}}

}
```
* std::u16string_view[link /reference/string_view/basic_string_view.md]
* std::u32string_view[link /reference/string_view/basic_string_view.md]
* std::wstring_view[link /reference/string_view/basic_string_view.md]

## 概要
`basic_string_view`型のリテラル。

文字列リテラルを受け取り、各文字型の`basic_string_view`オブジェクトを構築する。

- (1) : `string_view`型のリテラル
- (2) : `u16string_view`型のリテラル
- (3) : `u32string_view`型のリテラル
- (4) : `wstring_view`型のリテラル


## 戻り値
- (1) : `string_view{str, len}`
- (2) : `u16string_view{str, len}`
- (3) : `u32string_view{str, len}`
- (4) : `wstring_view{str, len}`


## 例
```cpp example
#include <iostream>
#include <string_view>
#include <type_traits>

int main()
{
  using namespace std::string_view_literals;

  auto sv1 = "Hello"sv;  // sv1の型はstd::string_view
  auto sv2 = u"Hello"sv; // sv2の型はstd::u16string_view
  auto sv3 = U"Hello"sv; // sv3の型はstd::u32string_view
  auto sv4 = L"Hello"sv; // sv4の型はstd::wstring_view

  std::cout << sv1.substr(0, 3) << std::endl;

  static_assert(std::is_same<decltype(sv1), std::string_view>{});
  static_assert(std::is_same<decltype(sv2), std::u16string_view>{});
  static_assert(std::is_same<decltype(sv3), std::u32string_view>{});
  static_assert(std::is_same<decltype(sv4), std::wstring_view>{});
}
```
* sv1.substr[link substr.md]
* std::u16string_view[link /reference/string_view/basic_string_view.md]
* std::u32string_view[link /reference/string_view/basic_string_view.md]
* std::wstring_view[link /reference/string_view/basic_string_view.md]

### 出力
```
Hel
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0
- [GCC, C++17 mode](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
