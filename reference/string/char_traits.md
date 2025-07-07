# char_traits
* string[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class charT> struct char_traits;

  template<> struct char_traits<char>;
  template<> struct char_traits<char8_t>;  // C++20から
  template<> struct char_traits<char16_t>; // C++11から
  template<> struct char_traits<char32_t>; // C++11から
  template<> struct char_traits<wchar_t>;
}
```

## 概要
`char_traits`は、[`basic_string`](basic_string.md)文字列クラスのおける、各要素の特性を使用するためのクラスである。  
このクラスと同じインタフェースのクラスを用意して[`basic_string`](basic_string.md)クラスのテンプレート引数として指定することにより、ユーザー独自の処理に切り替えることが可能である。たとえば、大文字・小文字を区別しない比較のためのカスタマイズに利用できる。

テンプレートパラメータは以下を意味する：

- `charT` : `basic_string`クラスが扱う文字型


## 静的メンバ関数

| 名前           | 説明 | 対応バージョン |
|----------------|---------------------------------------------------|-----|
| [`assign`](char_traits/assign.md)             | 代入 | |
| [`eq`](char_traits/eq.md)                     | 等値比較 | |
| [`lt`](char_traits/lt.md)                     | 小なり比較 | |
| [`compare`](char_traits/compare.md)           | 比較 | |
| [`length`](char_traits/length.md)             | 文字列長を取得する | |
| [`find`](char_traits/find.md)                 | 文字列中から特定の値を検索する | |
| [`move`](char_traits/move.md)                 | 文字列を他のシーケンスにコピーする | |
| [`copy`](char_traits/copy.md)                 | 文字列を他のシーケンスにコピーする | |
| [`not_eof`](char_traits/not_eof.md)           | 文字がファイル終端文字(EOF)ではないかを判定する | |
| [`to_char_type`](char_traits/to_char_type.md) | 数値を文字に変換する | |
| [`to_int_type`](char_traits/to_int_type.md)   | 文字を数値に変換する | |
| [`eq_int_type`](char_traits/eq_int_type.md)   | 数値の等値比較 | |
| [`eof`](char_traits/eof.md)                   | ファイル終端文字(EOF)を表す数値を取得する | |

## メンバ型

| 名前         | 説明                                 | 対応バージョン |
|--------------|--------------------------------------|----------------|
| `char_type`  | 文字コンテナの実装で使用される文字型 | |
| `int_type`   | 文字に対応する値を表す数値型 | |
| `off_type`   | 文字の差を表す型 | |
| `pos_type`   | 位置を表す型 | |
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 | |
| `comparison_category` | 比較カテゴリ | C++20 |


### charによる特殊化のメンバ型定義

| 名前         | 説明        | 対応バージョン |
|--------------|-------------|----------------|
| `char_type`  | `char`      | |
| `int_type`   | `int`       | |
| `off_type`   | `streamoff` | |
| `pos_type`   | `streampos` | |
| `state_type` | `mbstate_t` | |
| `comparison_category` | [`strong_ordering`](/reference/compare/strong_ordering.md) | C++20 |

### char8_tによる特殊化のメンバ型定義 (C++20)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char8_t`       | C++20          |
| `int_type`   | `unsigned int` | C++20          |
| `off_type`   | `streamoff`      | C++20          |
| `pos_type`   | `u8streampos`   | C++20          |
| `state_type` | `mbstate_t`      | C++20          |
| `comparison_category` | [`strong_ordering`](/reference/compare/strong_ordering.md) | C++20 |

### char16_tによる特殊化のメンバ型定義 (C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char16_t`       | C++11          |
| `int_type`   | `uint_least16_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u16streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |
| `comparison_category` | [`strong_ordering`](/reference/compare/strong_ordering.md) | C++20 |


### char32_tによる特殊化のメンバ型定義 (C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char32_t`       | C++11          |
| `int_type`   | `uint_least32_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u32streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |
| `comparison_category` | [`strong_ordering`](/reference/compare/strong_ordering.md) | C++20 |


### wchar_tによる特殊化のメンバ型定義

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `wchar_t`        | |
| `int_type`   | `wint_t`         | |
| `off_type`   | `streamoff`      | |
| `pos_type`   | `wstreampos`     | |
| `state_type` | `mbstate_t`      | |
| `comparison_category` | [`strong_ordering`](/reference/compare/strong_ordering.md) | C++20 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <string>

int main()
{
  // std::stringと同じ
  std::basic_string<char, std::char_traits<char>> a = "aaa";
  std::basic_string<char, std::char_traits<char>> b = "bbb";

  // char_traits::compare()で比較が行われる
  if (a < b) {
    std::cout << "then" << std::endl;
  }
  else {
    std::cout << "else" << std::endl;
  }
}
```
* std::char_traits[color ff0000]

#### 出力
```
then
```

### 大文字・小文字を区別しない文字列比較をする`basic_string`を定義 (C++20)
```cpp example
#include <string>
#include <compare>
#include <cctype>
#include <algorithm>

template <class T>
class case_insensitive_char_traits {
  using base_traits = std::char_traits<T>;
public:
  using char_type = char;
  using int_type = int;
  using off_type = std::streamoff;
  using pos_type = std::streampos;
  using state_type = std::mbstate_t;
  using comparison_category = std::weak_ordering;

  static constexpr void assign(char_type& c1, const char_type& c2) noexcept {
    base_traits::assign(c1, c2);
  }

  static constexpr bool eq(char_type c1, char_type c2) noexcept {
    return base_traits::eq(std::tolower(c1), std::tolower(c2));
  }

  static constexpr bool lt(char_type c1, char_type c2) noexcept {
    return base_traits::lt(std::tolower(c1), std::tolower(c2));
  }

  static constexpr int compare(const char_type* s1, const char_type* s2, size_t n) {
    auto order = std::lexicographical_compare_three_way(s1, s1 + n, s2, s2 + n,
           [](char_type c1, char_type c2) -> std::weak_ordering {
             return std::tolower(c1) <=> std::tolower(c2);
           });
    return order == std::weak_ordering::equivalent ? 0 :
           order == std::weak_ordering::greater ? 1 :
           -1;
  }

  static constexpr size_t length(const char_type* s) {
    return base_traits::length(s);
  }

  static constexpr const char_type* find(const char_type* s, size_t n,
                                         const char_type& a) {
    return std::find_if(s, s + n, [a](char_type c) {
      return std::tolower(c) == a;
    });
  }

  static constexpr char_type* move(char_type* s1, const char_type* s2, size_t n) {
    return base_traits::move(s1, s2, n);
  }

  static constexpr char_type* copy(char_type* s1, const char_type* s2, size_t n) {
    return base_traits::copy(s1, s2, n);
  }

  static constexpr char_type* assign(char_type* s, size_t n, char_type a) {
    return base_traits::assign(s, n, a);
  }
};

#include <iostream>
int main() {
  using case_insensitive_string =
      std::basic_string<char, case_insensitive_char_traits<char>>;
  case_insensitive_string a = "AbC";
  case_insensitive_string b = "aBc";

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* std::weak_ordering[link /reference/compare/weak_ordering.md]


#### 出力
```
equal
```


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
