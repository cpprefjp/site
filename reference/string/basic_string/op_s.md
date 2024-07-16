# sリテラル
* string[meta header]
* std::string_literals[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
inline namespace literals {
inline namespace string_literals {
  string operator""s(const char* str, size_t len);                  // (1) C++14
  constexpr string operator""s(const char* str, size_t len);        // (1) C++20

  constexpr u8string operator""s(const char8_t* str, size_t len);   // (2) C++20

  u16string operator""s(const char16_t* str, size_t len);           // (3) C++14
  constexpr u16string operator""s(const char16_t* str, size_t len); // (3) C++20

  u32string operator""s(const char32_t* str, size_t len);           // (4) C++14
  constexpr u32string operator""s(const char32_t* str, size_t len); // (4) C++20

  wstring operator""s(const wchar_t* str, size_t len);              // (5) C++14
  constexpr wstring operator""s(const wchar_t* str, size_t len);    // (5) C++20
}}}
```

## 概要
`basic_string`型のリテラル。

文字列リテラルを受け取り、各文字型の`basic_string`オブジェクトを構築する。

- (1) : `string`型のリテラル
- (2) : `u8string`型のリテラル
- (3) : `u16string`型のリテラル
- (4) : `u32string`型のリテラル
- (5) : `wstring`型のリテラル


## 戻り値
- (1) : `basic_string<char>{str, len}`
- (2) : `basic_string<char8_t>{str, len}`
- (3) : `basic_string<char16_t>{str, len}`
- (4) : `basic_string<char32_t>{str, len}`
- (5) : `basic_string<wchar_t>{str, len}`


## 例
```cpp example
#include <string>

int main()
{
  using namespace std::literals::string_literals;

  std::string s1 = "hello"s;   // 文字コード未規定のstringリテラル
#if defined(__cpp_char8_t) && 201803L <= __cpp_char8_t
  std::u8string s2 = u8"hello"s; // UTF-8のstringリテラル(C++20)
#else
  std::string s2 = u8"hello"s; // UTF-8のstringリテラル(C++11～C++17)
#endif
  std::u16string s3 = u"hello"s; // u16stringリテラル
  std::u32string s4 = U"hello"s; // u32stringリテラル

  std::wstring s5 = L"hello"s; // 文字コード未規定のwstringリテラル
}
```
* "hello"s[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]


## 参照
- [N3642 User-defined Literals for Standard Library Types (part 1 - version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3642.pdf)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
