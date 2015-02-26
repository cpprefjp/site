#sリテラル (C++14)
* string[meta header]

```cpp
namespace std {
inline namespace literals {
inline namespace string_literals {
  string    operator""s(const char* str, size_t len);     // (1)
  u16string operator""s(const char16_t* str, size_t len); // (2)
  u32string operator""s(const char32_t* str, size_t len); // (3)
  wstring   operator""s(const wchar_t* str, size_t len);  // (4)
}}}
```

##概要
`basic_string`型のリテラル。

文字列リテラルを受け取り、各文字型の`basic_string`オブジェクトを構築する。

- (1) : `string`型のリテラル
- (2) : `u16string`型のリテラル
- (3) : `u32string`型のリテラル
- (4) : `wstring`型のリテラル


##戻り値
- (1) : `basic_string<char>{str, len}`
- (2) : `basic_string<char16_t>{str, len}`
- (3) : `basic_string<char32_t>{str, len}`
- (4) : `basic_string<wchar_t>{str, len}`


##例
```cpp
#include <string>

int main()
{
  using namespace std::literals::string_literals;

  std::string s1 = "hello"s;   // 文字コード未規定のstringリテラル
  std::string s2 = u8"hello"s; // UTF-8のstringリテラル

  std::u16string s3 = u"hello"s; // u16stringリテラル
  std::u32string s4 = U"hello"s; // u32stringリテラル

  std::wstring s5 = L"hello"s; // 文字コード未規定のwstringリテラル
}
```
* "hello"s[color ff0000]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++1y mode](/implementation.md#clang): 3.4
- [GCC, C++1y mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 


##参照
- [N3642 User-defined Literals for Standard Library Types (part 1 - version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3642.pdf)

