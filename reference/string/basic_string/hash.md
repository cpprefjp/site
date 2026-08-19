# hash
* string[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // 標準のallocatorを使用するbasic_stringに対する明示的特殊化
  template <> struct hash<string>;    // (1) C++11からC++20まで
  template <> struct hash<u8string>;  // (2) C++20からC++20まで
  template <> struct hash<u16string>; // (3) C++11からC++20まで
  template <> struct hash<u32string>; // (4) C++11からC++20まで
  template <> struct hash<wstring>;   // (5) C++11からC++20まで

  // pmr::polymorphic_allocatorを使用するbasic_stringに対する明示的特殊化
  template <> struct hash<pmr::string>;    // (6) C++17からC++20まで
  template <> struct hash<pmr::u8string>;  // (7) C++20からC++20まで
  template <> struct hash<pmr::u16string>; // (8) C++17からC++20まで
  template <> struct hash<pmr::u32string>; // (9) C++17からC++20まで
  template <> struct hash<pmr::wstring>;   // (10) C++17からC++20まで

  // 任意のアロケータを許す部分特殊化（(1)〜(10)を統合）
  template <class Allocator>
  struct hash<basic_string<char, char_traits<char>, Allocator>>;         // (11) C++23
  template <class Allocator>
  struct hash<basic_string<char8_t, char_traits<char8_t>, Allocator>>;   // (12) C++23
  template <class Allocator>
  struct hash<basic_string<char16_t, char_traits<char16_t>, Allocator>>; // (13) C++23
  template <class Allocator>
  struct hash<basic_string<char32_t, char_traits<char32_t>, Allocator>>; // (14) C++23
  template <class Allocator>
  struct hash<basic_string<wchar_t, char_traits<wchar_t>, Allocator>>;   // (15) C++23
}
```
* hash[link /reference/functional/hash.md]
* string[link ../basic_string.md]
* u8string[link ../basic_string.md]
* u16string[link ../basic_string.md]
* u32string[link ../basic_string.md]
* wstring[link ../basic_string.md]
* pmr::string[link ../basic_string.md]
* pmr::u8string[link ../basic_string.md]
* pmr::u16string[link ../basic_string.md]
* pmr::u32string[link ../basic_string.md]
* pmr::wstring[link ../basic_string.md]
* basic_string[link ../basic_string.md]
* char_traits[link /reference/string/char_traits.md]

## 概要
[`std::hash`](/reference/functional/hash.md)クラスの、[`basic_string`](../basic_string.md)に対する特殊化。文字列の内容からハッシュ値を計算し、`basic_string`を[`unordered_map`](/reference/unordered_map/unordered_map.md)や[`unordered_set`](/reference/unordered_set/unordered_set.md)のキーとして使用できるようにする。

各文字型に対する特殊化が提供される。定義の形式は、C++のバージョンによって以下のように変遷している。

- (1)-(5) : 標準の[`allocator`](/reference/memory/allocator.md)を使用する`basic_string`（[`string`](../basic_string.md)等）に対する明示的特殊化。`char`・`char16_t`・`char32_t`・`wchar_t`版がC++11で、`char8_t`版 (2) がC++20で追加された。
- (6)-(10) : [`pmr::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)を使用する`basic_string`（`pmr::string`等）に対する明示的特殊化。`char`・`char16_t`・`char32_t`・`wchar_t`版がC++17で、`char8_t`版 (7) がC++20で追加された。
- (11)-(15) : C++23で、(1)〜(10)を統合した、任意のアロケータ`Allocator`を許す部分特殊化。ハッシュ値は文字列の内容にのみ依存しアロケータには依存しないため、標準以外のアロケータを使用する`basic_string`もハッシュ可能となった。


## 効果
`S`を対象の文字列型、`SV`を対応する文字列ビュー型（例えば`S`が[`string`](../basic_string.md)なら`SV`は[`string_view`](/reference/string_view/basic_string_view.md)）、`s`を型`S`のオブジェクトとするとき、`hash<S>()(s)`は`hash<SV>()(SV(s))`と等しい。

つまり、同じ文字列内容を表すオブジェクト同士は、文字列型・文字列ビュー型・アロケータの違いにかかわらず、同じハッシュ値を持つ。


## 例
```cpp example
#include <cassert>
#include <functional>
#include <string>
#include <string_view>

int main()
{
  std::string s = "hello";

  // 文字列の内容からハッシュ値を計算する
  std::size_t h = std::hash<std::string>{}(s);

  // 対応するstring_viewのハッシュ値と一致する
  assert(h == std::hash<std::string_view>{}(std::string_view{s}));
}
```
* std::hash[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++11


## 関連項目
- [`std::hash`](/reference/functional/hash.md)
- [`std::basic_string`](../basic_string.md)


## 参照
- [LWG Issue 3705. Hashability shouldn't depend on `basic_string`'s allocator](https://cplusplus.github.io/LWG/issue3705)
    - C++23で、`hash`の`basic_string`特殊化が、アロケータ固定の明示的特殊化から任意のアロケータを許す部分特殊化に変更された
