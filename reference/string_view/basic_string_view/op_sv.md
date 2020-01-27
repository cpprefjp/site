# svリテラル
* string_view[meta header]
* std::string_view_literals[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace string_view_literals {
  constexpr std::string_view    operator""sv(const char* str, std::size_t len) noexcept;     // (1)
  constexpr std::u8string_view  operator""sv(const char8_t* str, std::size_t len) noexcept;  // (2) C++20
  constexpr std::u16string_view operator""sv(const char16_t* str, std::size_t len) noexcept; // (3)
  constexpr std::u32string_view operator""sv(const char32_t* str, std::size_t len) noexcept; // (4)
  constexpr std::wstring_view   operator""sv(const wchar_t* str, std::size_t len) noexcept;  // (5)
}}

}
```
* std::u8string_view[link /reference/string_view/basic_string_view.md]
* std::u16string_view[link /reference/string_view/basic_string_view.md]
* std::u32string_view[link /reference/string_view/basic_string_view.md]
* std::wstring_view[link /reference/string_view/basic_string_view.md]

## 概要
`basic_string_view`型のリテラル。

文�列リテラルを受け取り、各文�型の`basic_string_view`オブジェクトを構築する。

- (1) : `string_view`型のリテラル
- (2) : `u8string_view`型のリテラル
- (3) : `u16string_view`型のリテラル
- (4) : `u32string_view`型のリテラル
- (5) : `wstring_view`型のリテラル


## 戻り値
- (1) : `string_view{str, len}`
- (2) : `u8string_view{str, len}`
- (3) : `u16string_view{str, len}`
- (4) : `u32string_view{str, len}`
- (5) : `wstring_view{str, len}`


## 備考
- �間にヌル文�を含む文�列リテラルから`basic_string_view`オブジェクトを構築する場合、コンストラクタを使用するよりもこちらの関数を使用したほうがよい。
    - `const char*`をとるコンストラクタは[`std::char_traits`](/reference/string/char_traits.md)`::`[`length()`](/reference/string/char_traits/length.md)関数を使用して文�列長を計算するため、ヌル終端となってしまう
    - こちらの関数は文�列リテラルの長さを直接扱うため、文�列全体を参照する`basic_string_view`オブジェクトを構築できる


## 例
```cpp example
#include <iostream>
#include <string_view>
#include <type_traits>

int main()
{
  using namespace std::string_view_literals;

  auto sv1 = "Hello"sv;   // sv1の型はstd::string_view
  auto sv2 = u8"Hello"sv; // sv2の型はstd::string_view(C++17)/std::u8string_view(C++20)
  auto sv3 = u"Hello"sv;  // sv3の型はstd::u16string_view
  auto sv4 = U"Hello"sv;  // sv4の型はstd::u32string_view
  auto sv5 = L"Hello"sv;  // sv5の型はstd::wstring_view

  std::cout << sv1.substr(0, 3) << std::endl;

  static_assert(std::is_same<decltype(sv1), std::string_view>{});
#if defined(__cpp_char8_t) && 201803L <= __cpp_char8_t
  static_assert(std::is_same<decltype(sv2), std::u8string_view>{});
#else
  static_assert(std::is_same<decltype(sv2), std::string_view>{});
#endif
  static_assert(std::is_same<decltype(sv3), std::u16string_view>{});
  static_assert(std::is_same<decltype(sv4), std::u32string_view>{});
  static_assert(std::is_same<decltype(sv5), std::wstring_view>{});
}
```
* sv1.substr[link substr.md]
* std::u8string_view[link /reference/string_view/basic_string_view.md]
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
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [文�列リテラルからの`std::string_view`構築 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20171115/p1)
