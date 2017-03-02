#regex_match
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator, class Allocator, class charT, class traits>
    bool regex_match(BidirectionalIterator first, BidirectionalIterator last,
                     match_results<BidirectionalIterator, Allocator>& m,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (1)

  template <class charT, class Allocator, class traits>
    bool regex_match(const charT* str,
                     match_results<const charT*, Allocator>& m,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (2)

  template <class ST, class SA, class Allocator, class charT, class traits>
    bool regex_match(const basic_string<charT, ST, SA>& s,
                     match_results<typename basic_string<charT, ST, SA>::const_iterator, Allocator>& m,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (3)

  template <class ST, class SA, class Allocator, class charT, class traits>
    bool regex_match(basic_string<charT, ST, SA>&& s,
                     match_results<typename basic_string<charT, ST, SA>::const_iterator, Allocator>& m,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default) = delete;     // (4) C++14 から

  template <class BidirectionalIterator, class charT, class traits>
    bool regex_match(BidirectionalIterator first, BidirectionalIterator last,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (5)

  template <class charT, class traits>
    bool regex_match(const charT* str,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (6)

  template <class ST, class SA, class charT, class traits>
    bool regex_match(const basic_string<charT, ST, SA>& s,
                     const basic_regex<charT, traits>& e,
                     regex_constants::match_flag_type flags = regex_constants::match_default);              // (7)
}
```
* match_results[link match_results.md]
* basic_regex[link basic_regex.md]
* regex_constants::match_default[link regex_constants/match_flag_type.md]
* basic_string[link ../string/basic_string.md]

##概要
指定された文字列全体が、正規表現にマッチするか否かの判定を行う。  
引数に [`match_results`](match_results.md) がある場合、当該オブジェクトにマッチの結果を格納する。  
なお、同様の関数である [`regex_search`](regex_search.md) と異なり、正規表現が文字列全体にマッチしなければならない。


##要件
`BidirectionalIterator` は双方向イテレータの要件を満たすこと。


##効果
- (1) `[first, last)` で指定された文字列全体が、`e` で指定された正規表現にマッチするか否かの判定を行う。  
    `flags` は正規表現が文字列に対してどのようにマッチするかを指定する。
- (2) `return regex_match(str, str +` [`char_traits`](../string/char_traits.md)`::`[`length`](../string/char_traits/length.md)`(str), m, e, flags)` と同等。
- (3) `return regex_match(s.`[`begin`](../string/basic_string/begin.md)`(), s.`[`end`](../string/basic_string/end.md)`(), m, e, flags)` と同等。
- (4) `deleted` 宣言されているため、使用するとコンパイルエラーとなる。
- (5) [`match_results`](match_results.md)`<BidirectionalIterator>` 型のダミーオブジェクト `what` を構築し、`return regex_match(first, last, what, e, flags)` としたものと同等。
- (6) `return regex_match(str, str +` [`char_traits`](../string/char_traits.md)`::`[`length`](../string/char_traits/length.md)`(str), e, flags)` と同等。
- (7) `return regex_match(s.`[`begin`](../string/basic_string/begin.md)`(), s.`[`end`](../string/basic_string/end.md)`(), e, flags)` と同等。

##事後条件

- (1) 常に `m.`[`ready`](match_results/ready.md)`() == true` となる。  
    もし、戻り値が `false` の場合、`m` の [`ready`](match_results/ready.md)`()` 以外の状態については、`m.`[`size`](match_results/size.md)`() == 0` および `m.`[`empty`](match_results/empty.md)`() == true` となる事以外は未規定である。  
    もし、戻り値が `true` の場合、`m` の [`ready`](match_results/ready.md)`()` 以外の状態は以下の表を満たす。

    | 要素                                                | 値                                                                                                                                                                                                                                                               |
    |-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | `m.`[`size`](match_results/size.md)`()`             | `1 + e.`[`mark_count`](basic_regex/mark_count.md)`()`                                                                                                                                                                                                            |
    | `m.`[`empty`](match_results/empty.md)`()`           | `false`                                                                                                                                                                                                                                                          |
    | `m.`[`prefix`](match_results/prefix.md)`().first`   | `first`                                                                                                                                                                                                                                                          |
    | `m.`[`prefix`](match_results/prefix.md)`().second`  | `first`                                                                                                                                                                                                                                                          |
    | `m.`[`prefix`](match_results/prefix.md)`().matched` | `false`                                                                                                                                                                                                                                                          |
    | `m.`[`suffix`](match_results/suffix.md)`().first`   | `last`                                                                                                                                                                                                                                                           |
    | `m.`[`suffix`](match_results/suffix.md)`().second`  | `last`                                                                                                                                                                                                                                                           |
    | `m.`[`suffix`](match_results/suffix.md)`().matched` | `false`                                                                                                                                                                                                                                                          |
    | `m.[0].first`                                       | `first`                                                                                                                                                                                                                                                          |
    | `m.[0].second`                                      | `last`                                                                                                                                                                                                                                                           |
    | `m.[0].matched`                                     | `true`                                                                                                                                                                                                                                                           |
    | `m.[n].first`                                       | `0 < n < m.`[`size`](match_results/size.md)`()` となるすべての整数 `n` について、正規表現内の `n` 番目のキャプチャグループがマッチした文字列の最初の文字を指すイテレータ。<br />もし、`n` 番目のキャプチャグループがマッチに参加していない場合には、`last`。     |
    | `m.[n].second`                                      | `0 < n < m.`[`size`](match_results/size.md)`()` となるすべての整数 `n` について、正規表現内の `n` 番目のキャプチャグループがマッチした文字列の最後の文字の次を指すイテレータ。<br />もし、`n` 番目のキャプチャグループがマッチに参加していない場合には、`last`。 |
    | `m.[n].matched`                                     | `0 < n < m.`[`size`](match_results/size.md)`()` となるすべての整数 `n` について、正規表現内の `n` 番目のキャプチャグループがマッチに参加していれば `true`。<br />もし、`n` 番目のキャプチャグループがマッチに参加していない場合には、`false`。                   |


##戻り値
指定した文字列全体が、正規表現にマッチした場合、`true`。マッチしなかった場合は `false`。


##例外
本関数は [`regex_error`](regex_error.md) を送出する可能性がある。  
もしそのような例外 `e` が送出された場合、 `e.`[`code`](regex_error/code.md)`()` は [`regex_constants::error_complexity`](regex_constants/error_type.md) か [`regex_constants::error_stack`](regex_constants/error_type.md) のいずれかである。


##備考
[`match_results`](match_results.md) オブジェクトを引数に取る形式の場合、そのオブジェクトは引数で指定した検索対象文字列へのイテレータを保持する。  
このため、検索対象文字列は本関数を呼び出した後も [`match_results`](match_results.md) オブジェクトを使用し終わるまで破棄されないようにする必要がある。  
従って、(3) の形式に渡す引数 `s` に一時オブジェクトを指定することはほぼ間違いなくプログラミング上のエラーを意味する。  
(4) の形式が `deleted` として C++14 で追加された理由は、このような事態をコンパイル時に検出するためである。


##例
```cpp
#include <iostream>
#include <iterator>
#include <list>
#include <regex>
#include <string>

int main()
{
  std::cout << std::boolalpha;
  {
    // (1) の形式
    const std::list<char> s = { 'a', 'b', 'c', '1', '2', '3', 'd', 'e', 'f' };
    std::match_results<std::list<char>::const_iterator> m;
    std::cout << "(1) " << std::regex_match(std::begin(s), std::end(s), m, std::regex("\\w+")) << std::endl;
    std::cout << "str = '" << m.str() << "', position = " << m.position() << std::endl;
  }
  {
    // (2) の形式
    std::cmatch m;
    std::cout << "(2) " << std::regex_match("abc123def", m, std::regex("\\w+")) << std::endl;
    std::cout << "str = '" << m.str() << "', position = " << m.position() << std::endl;
  }
  {
    // (3) の形式
    const std::string s = "abc123def";
    std::smatch m;
    std::cout << "(3) " << std::regex_match(s, m, std::regex("\\w+")) << std::endl;
    std::cout << "str = '" << m.str() << "', position = " << m.position() << std::endl;
  }
  {
    // (4) の形式（コメントアウトを外すと C++14 ではエラーになる）
    //std::smatch m;
    //std::cout << "(4) " << std::regex_match(std::string("abc123def"), m, std::regex("\\w+")) << std::endl;
    //std::cout << "str = '" << m.str() << "', position = " << m.position() << std::endl;
  }
  {
    // (5) の形式
    const std::list<char> s = { 'a', 'b', 'c', '1', '2', '3', 'd', 'e', 'f' };
    std::cout << "(5) " << std::regex_match(std::begin(s), std::end(s), std::regex("\\w+")) << std::endl;
  }
  {
    // (6) の形式
    std::cout << "(6) " << std::regex_match("abc123def", std::regex("\\w+")) << std::endl;
  }
  {
    // (7) の形式、その１
    const std::string s = "abc123def";
    std::cout << "(7)-1 " << std::regex_match(s, std::regex("\\w+")) << std::endl;
  }
  {
    // (7) の形式、その２（C++14 でもエラーにならない）
    std::cout << "(7)-2 " << std::regex_match(std::string("abc123def"), std::regex("\\w+")) << std::endl;
  }
}
```
* std::regex_match[color ff0000]
* std::regex[link basic_regex.md]
* std::match_results[link match_results.md]
* std::cmatch[link match_results.md]
* std::smatch[link match_results.md]
* m.str()[link match_results/str.md]
* m.position()[link match_results/position.md]

###出力
```
(1) = true
str = 'abc123def', position = 0
(2) true
str = 'abc123def', position = 0
(3) true
str = 'abc123def', position = 0
(5) true
(6) true
(7)-1 true
(7)-2 true
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
Clang(libc++) では、3.4 までは (4) の形式は存在しない。  
GCC(libstdc++) では、4.9.2 までは (4) の形式は存在しない。


##参照
* [C++の正規表現ライブラリ: std::regex | 本の虫](https://cpplover.blogspot.jp/2015/01/c-stdregex.html)
