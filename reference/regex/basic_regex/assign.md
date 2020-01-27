# assign
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_regex& assign(const basic_regex& that);                   // (1)

basic_regex& assign(basic_regex&& that) noexcept;               // (2)

basic_regex& assign(const charT* ptr,
                    flag_type f = regex_constants::ECMAScript); // (3)

basic_regex& assign(const charT* ptr, size_t len,
                    flag_type f = regex_constants::ECMAScript); // (4)

template <class ST, class SA>
basic_regex& assign(const basic_string<charT, ST, SA>& p,
                    flag_type f = regex_constants::ECMAScript); // (5)

template <class InputIterator>
basic_regex& assign(InputIterator first, InputIterator last,
                    flag_type f = regex_constants::ECMAScript); // (6)

basic_regex& assign(initializer_list<charT> il,
                    flag_type f = regex_constants::ECMAScript); // (7)
```
* basic_regex[link ../basic_regex.md]
* regex_constants::ECMAScript[link ../regex_constants/syntax_option_type.md]
* initializer_list[link ../../initializer_list.md]
* basic_string[link ../../string/basic_string.md]


## 概要
�規表現オブジェクトを代入する。


## 要件
- `InputIterator` は入力イテレータの要件を満たすこと。


## 効果
- (1) `that` を `*this` にコピーする。
- (2) `that` を `*this` にムーブ代入する。
- (3) `assign(string_type(ptr), f)` と�価。
- (4) `assign(string_type(ptr, len), f)` と�価。
- (5) 引数 `f` で指定されたフラグに従って、文�列 `p` で指定された�規表現を `*this` に代入する。文�列 `p` が有効な�規表現で無い場合には、例外 [`regex_error`](../regex_error.md) を投げる。  
    例外が投げられた場合、`*this` は変更されない。
- (6) `assign(string_type(first, last), f)` と�価。
- (7) `assign(il.begin(), il.end(), f)` と�価。


## 事後条件
- (1) [`flags`](flags.md)`()` と [`mark_count`](mark_count.md) は、それぞれ `that.`[`flags`](flags.md)`()` と `that.`[`mark_count`](mark_count.md) を返す。
- (2) [`flags`](flags.md)`()` と [`mark_count`](mark_count.md) は、それぞれ `that.`[`flags`](flags.md)`()` と `that.`[`mark_count`](mark_count.md) の元の値を返す。  
    `that` は未規定の有効な状態である。
- (3) -
- (4) -
- (5) 例外が投げられなければ、[`flags`](flags.md)`()` は引数 `f` を、[`mark_count`](mark_count.md) は指定された�規表現内の�ャプチャグループの数を返す。
- (6) -
- (7) -


## 戻り値
`*this`


## 備考
- `charT` は `basic_regex` の 1 番目のテンプレートパラメータで、文�型である。
- `string_type` は `traits_type::string_type` の別名で、デフォルトは [`basic_string`](../../string/basic_string.md)`<charT>` である。
- `traits_type` は `basic_regex` の 2 番目のテンプレートパラメータで、デフォルトは [`regex_traits`](../regex_traits.md)`<charT>` である。
- `flag_type` は [`regex_constants::syntax_option_type`](../regex_constants/syntax_option_type.md) の別名である。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char s[] = " abc ";
  std::regex re;
  std::cout << std::boolalpha;

  const std::regex re1("\\w+");
  re = re1;                                             // (1) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = std::regex("\\d+");                              // (2) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = "\\w+";                                          // (3) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = { '\\', 'd', '+' };                              // (4) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  const std::string p = "\\w+";
  re = p;                                               // (5) の形式
  std::cout << std::regex_search(s, re) << std::endl;
}
```
* std::regex_search[link ../regex_search.md]

### 出力
```
true
false
true
false
true
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
Clang バージョン 3.0 は [`initializer_list`](../../initializer_list.md) に対応していないため、(7) の形式は提供されていない。  
また、Clang(libc++) では例外が発生した場合に `*this` が元の状態を保持せずに�途半端に更新されてしまう。


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (7)の経緯となる提案文書

