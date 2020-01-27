# コンストラクタ
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_regex();                                                              // (1)

basic_regex(const basic_regex& that);                                       // (2)

basic_regex(basic_regex&& that) noexcept;                                   // (3)

explicit basic_regex(const charT* ptr,
                     flag_type f = regex_constants::ECMAScript);            // (4)

basic_regex(const charT* ptr, size_t len, flag_type f);                     // (5)

template <class ST, class SA>
basic_regex(const basic_string<charT, ST, SA>& p,
            flag_type f = regex_constants::ECMAScript);                     // (6)

template <class ForwardIterator>
basic_regex(ForwardIterator first, ForwardIterator last,
            flag_type f = regex_constants::ECMAScript);                     // (7)

basic_regex(initializer_list<charT> il,
            flag_type f = regex_constants::ECMAScript);                     // (8)
```
* regex_constants::ECMAScript[link ../regex_constants/syntax_option_type.md]
* basic_string[link ../../string/basic_string.md]
* initializer_list[link ../../initializer_list.md]


## 概要
�規表現オブジェクトを構築する。


## 要件
- `ptr` はヌルポインタではないこと。
- `InputIterator` は入力イテレータの要件を満たすこと。


## 効果
- (1) デフォルトコンストラクタ。いかなる文�列にもマッチしない `basic_regex` オブジェクトを構築する。
- (2) コピーコンストラクタ。`that` をコピーして `basic_regex` オブジェクトを構築する。
- (3) ムーブコンストラクタ。`that` をムーブして `basic_regex` オブジェクトを構築する。
- (4) 引数 `f` で指定されたフラグに従って、先�が `ptr` で長さ [`char_traits`](../../string/char_traits.md)`::`[`length`](../../string/char_traits/length.md)`(ptr)` の文�列から `basic_regex` オブジェクトを構築する。  
    指定された文�列が有効な�規表現で無い場合には、例外 [`regex_error`](../regex_error.md) を投げる。
- (5) 引数 `f` で指定されたフラグに従って、先�が `ptr` で長さ `len` の文�列から `basic_regex` オブジェクトを構築する。  
    指定された文�列が有効な�規表現で無い場合には、例外 [`regex_error`](../regex_error.md) を投げる。
- (6) 引数 `f` で指定されたフラグに従って、`p` で指定された文�列から `basic_regex` オブジェクトを構築する。  
    文�列 `p` が有効な�規表現で無い場合には、例外 [`regex_error`](../regex_error.md) を投げる。
- (7) 引数 `f` で指定されたフラグに従って、範囲 `[first, last)` で指定された文�列から `basic_regex` オブジェクトを構築する。  
    文�列 `[first, last)` が有効な�規表現で無い場合には、例外 [`regex_error`](../regex_error.md) を投げる。
- (8) `basic_regex(il.`[`begin`](../../initializer_list/initializer_list/begin.md)`(), il.`[`end`](../../initializer_list/initializer_list/end.md)`(), f)` と�価。


## 事後条件
- (1) -
- (2) [`flags`](flags.md)`()` と [`mark_count`](mark_count.md)`()` は、それぞれ `that.`[`flags`](flags.md)`()` と `that.`[`mark_count`](mark_count.md) を返す。
- (3) [`flags`](flags.md)`()` と [`mark_count`](mark_count.md)`()` は、それぞれ `that.`[`flags`](flags.md)`()` と `that.`[`mark_count`](mark_count.md) の元の値を返す。  
    `that` は未規定の有効な状態である。
- (4) [`flags`](flags.md)`()` は引数 `f` を、[`mark_count`](mark_count.md)`()` は指定された�規表現内の�ャプチャグループの数を返す。
- (5) [`flags`](flags.md)`()` は引数 `f` を、[`mark_count`](mark_count.md)`()` は指定された�規表現内の�ャプチャグループの数を返す。
- (6) [`flags`](flags.md)`()` は引数 `f` を、[`mark_count`](mark_count.md)`()` は指定された�規表現内の�ャプチャグループの数を返す。
- (7) [`flags`](flags.md)`()` は引数 `f` を、[`mark_count`](mark_count.md)`()` は指定された�規表現内の�ャプチャグループの数を返す。
- (8) -


## 備考
- `charT` は `basic_regex` の 1 番目のテンプレートパラメータで、文�型である。
- `flag_type` は [`regex_constants::syntax_option_type`](../regex_constants/syntax_option_type.md) の別名である。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char s[] = " abc ";
  std::cout << std::boolalpha;

  const std::regex re1;                                                 // (1) の形式
  std::cout << std::regex_search(s, re1) << std::endl;

  std::regex re4("\\w+");                                               // (4) の形式
  std::cout << std::regex_search(s, re4) << std::endl;

  const std::regex re2(re4);                                            // (2) の形式
  std::cout << std::regex_search(s, re2) << std::endl;

  const std::regex re3(std::move(re4));                                 // (3) の形式
  std::cout << std::regex_search(s, re3) << std::endl;

  const std::regex re5("ABC\\d+", 3, std::regex_constants::icase);      // (5) の形式
  std::cout << std::regex_search(s, re5) << std::endl;

  const std::string restr("ABC");
  const std::regex re6(restr, std::regex_constants::icase);             // (6) の形式
  std::cout << std::regex_search(s, re6) << std::endl;

  const std::string p("[[:alpha:]]+");
  const std::regex re7(std::begin(p), std::end(p));                     // (7) の形式
  std::cout << std::regex_search(s, re7) << std::endl;

  const std::regex re8{ '\\', 'd', '+' };                               // (8) の形式
  std::cout << std::regex_search(s, re8) << std::endl;
}
```
* std::regex_search[link ../regex_search.md]
* std::move[link ../../utility/move.md]
* std::regex_constants::icase[link ../regex_constants/syntax_option_type.md]

### 出力
```
false
true
true
true
true
true
true
false
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
Clang バージョン 3.0 は [`initializer_list`](../../initializer_list.md) に対応していないため、(8) の形式は提供されていない。  


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (8)の経緯となる提案文書

