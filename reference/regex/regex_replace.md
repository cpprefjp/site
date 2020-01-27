# regex_replace
* regex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class OutputIterator, class BidirectionalIterator,
            class traits, class charT, class FST, class FSA>
  OutputIterator
  regex_replace(OutputIterator out,
                BidirectionalIterator first, BidirectionalIterator last,
                const basic_regex<charT, traits>& e,
                const basic_string<charT, FST, FSA>& fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (1)

  template <class OutputIterator, class BidirectionalIterator,
            class traits, class charT>
  OutputIterator
  regex_replace(OutputIterator out,
                BidirectionalIterator first, BidirectionalIterator last,
                const basic_regex<charT, traits>& e,
                const charT* fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (2)

  template <class traits, class charT, class ST, class SA, class FST, class FSA>
  basic_string<charT, ST, SA>
  regex_replace(const basic_string<charT, ST, SA>& s,
                const basic_regex<charT, traits>& e,
                const basic_string<charT, FST, FSA>& fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (3)

  template <class traits, class charT, class ST, class SA>
  basic_string<charT, ST, SA>
  regex_replace(const basic_string<charT, ST, SA>& s,
                const basic_regex<charT, traits>& e,
                const charT* fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (4)

  template <class traits, class charT, class FST, class FSA>
  basic_string<charT>
  regex_replace(const charT* s,
                const basic_regex<charT, traits>& e,
                const basic_string<charT, FST, FSA>& fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (5)

  template <class traits, class charT>
  basic_string<charT>
  regex_replace(const charT* s,
                const basic_regex<charT, traits>& e,
                const charT* fmt,
                regex_constants::match_flag_type flags = regex_constants::match_default); // (6)
}
```
* basic_regex[link basic_regex.md]
* regex_constants::match_default[link regex_constants/match_flag_type.md]
* basic_string[link ../string/basic_string.md]

## 概要
指定された文�列の�で、�規表現にマッチする部分を指定した文�列に置換する。  
置換は、全てのマッチする部分、あるいは、最初のマッチする部分のみのいずれかを指定可能である。  
また、マッチしない部分を残すか否かも指定可能である。


## 効果
- (1)、(2) `[first, last)` で指定された文�列内に出現する、�規表現 `e` にマッチする部分を、置換文�列 `fmt` で置換した結果を出力イテレータ `out` に出力する。  
    置換文�列 `fmt` には通常の文�の他、マッチした文�列全体や�ャプチャグループを表すシーケンスを使用することができる。  
    指定可能なシーケンスは、デフォルトでは ECMAScript の置換文�列と�価であるが、`flags` に [`regex_constants::format_sed`](regex_constants/match_flag_type.md) が指定されていた場合には POSIX にて規定されている sed の置換文�列と�価となる。  
    なお、デフォルトでは全てのマッチする部分が `fmt` で置換されるが、`flags` に [`regex_constants::format_first_only`](regex_constants/match_flag_type.md) が指定されていた場合には最初にマッチする部分のみが置換される。  
    また、デフォルトではマッチしない部分はそのまま `out` に出力されるが、`flags` に [`regex_constants::format_no_copy`](regex_constants/match_flag_type.md) が指定されていた場合には、マッチしない部分は `out` には出力されない。
- (3)、(4) 置換対象文�列が [`basic_string`](../string/basic_string.md)`<charT, ST, SA>` 型の文�列 `s` であること、および、置換結果が [`basic_string`](../string/basic_string.md)`<charT, ST, SA>` 型の文�列として返される点を除いて、(1)、(2) と同様である。
- (5)、(6) 置換対象文�列が `const charT*` 型の文�列 `s` であること、および、置換結果が [`basic_string`](../string/basic_string.md)`<charT>` 型の文�列として返される点を除いて、(1)、(2) と同様である。

## 戻り値
- (1)、(2) 置換結果出力後の `out`（引数のコピーではない）
- (3)、(4) 置換結果の文�列
- (5)、(6) 置換結果の文�列


## 例外
本関数は [`regex_error`](regex_error.md) を送出する可能性がある。  
もしそのような例外 `e` が送出された場合、 `e.`[`code`](regex_error/code.md)`()` は [`regex_constants::error_complexity`](regex_constants/error_type.md) か [`regex_constants::error_stack`](regex_constants/error_type.md) のいずれかである。


## 備考
本関数の�確な挙動は以下の通りである。

- (1)、(2) [`regex_iterator`](regex_iterator.md) 型のオブジェクト `i` を

    ```cpp
    regex_iterator<BidirectionalIterator, charT, traits> i(first, last, e, flags)
    ```
    * regex_iterator[link regex_iterator.md]

    として構築する。  

    - `i` がシーケンス終端イテレータの場合（すなわち、マッチが 1 つも�在しない場合）  
        `flags &` [`regex_constants::format_no_copy`](regex_constants/match_flag_type.md) が `0` であれば、

        ```cpp
        out = copy(first, last, out)
        ```
        * copy[link ../algorithm/copy.md]

        を呼び出す。


    - `i` がシーケンス終端イテレータでは無い場合（すなわち、マッチが 1 つ以上�在した場合）  
        `i` を用いて `[first, last)` で指定された文�列�のすべてのマッチを [`match_results`](match_results.md)`<BidirectionalIterator>` 型のオブジェクト `m` として列挙して以下を繰り返す。  
        ただし、`flags &` [`regex_constants::format_first_only`](regex_constants/match_flag_type.md) が `0` でなければ、最初のマッチのみを処理する。  

        - `flags &` [`regex_constants::format_no_copy`](regex_constants/match_flag_type.md) が `0` であれば、
            ```cpp
            out = copy(m.prefix().first, m.prefix().second, out)
            ```
            * copy[link ../algorithm/copy.md]
            * prefix[link match_results/prefix.md]

            を呼び出す。  

        - その後、(1) の形式であれば

            ```cpp
            out = m.format(out, fmt, flags)
            ```
            * format[link match_results/format.md]

            を、(2) の形式であれば

            ```cpp
            out = m.format(out, fmt, fmt + char_traits<charT>::length(fmt), flags)
            ```
            * format[link match_results/format.md]
            * char_traits[link ../string/char_traits.md]
            * length[link ../string/char_traits/length.md]

            を呼び出す。

        最後に、`flags &` [`regex_constants::format_no_copy`](regex_constants/match_flag_type.md) が `0` であれば、最後のマッチの `m` のコピーを `last_m` として

        ```cpp
        out = copy(last_m.suffix().first, last_m.suffix().second, out)
        ```
        * copy[link ../algorithm/copy.md]
        * suffix[link match_results/suffix.md]

        を呼び出す。

- (3)、(4) [`basic_string`](../string/basic_string.md)`<charT, ST, SA>` 型の空の文�列オブジェクト `result` を構築し、`regex_replace(`[`back_inserter`](../iterator/back_inserter.md)`(result), s.`[`begin`](../string/basic_string/begin.md)`(), s.`[`end`](../string/basic_string/end.md)`(), e, fmt, flags)` を呼び出す。  
    戻り値は `result` となる。
- (5)、(6) [`basic_string`](../string/basic_string.md)`<charT>` 型の空の文�列オブジェクト `result` を構築し、`regex_replace(`[`back_inserter`](../iterator/back_inserter.md)`(result), s, s +` [`char_traits`](../string/char_traits.md)`::`[`length`](../string/char_traits/length.md)`(s), e, fmt, flags)` を呼び出す。  
    戻り値は `result` となる。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <list>
#include <regex>
#include <string>

int main()
{
  {
    // (1) の形式
    const std::list<char> s = { 'a', 'b', 'c', '0', '1', '2', 'd', 'e', 'f' };
    const std::regex re("\\d+");
    const std::string fmt = "[$&]";
    std::cout << "(1) '";
    std::regex_replace(std::ostream_iterator<char>(std::cout), std::begin(s), std::end(s), re, fmt);
    std::cout << '\'' << std::endl;
  }
  {
    // (2) の形式
    const std::list<char> s = { 'a', 'b', 'c', '0', '1', '2', 'd', 'e', 'f' };
    const std::regex re("\\d+");
    const char fmt[] = "[$&]";
    const std::regex_constants::match_flag_type flags = std::regex_constants::format_no_copy;
    std::cout << "(2) '";
    std::regex_replace(std::ostream_iterator<char>(std::cout), std::begin(s), std::end(s), re, fmt, flags);
    std::cout << '\'' << std::endl;
  }
  {
    // (3) の形式
    const std::string s = "abc123def456ghi";
    const std::regex re("\\d+");
    const std::string fmt = "[$&]";
    std::cout << "(3) '" << std::regex_replace(s, re, fmt) << '\'' << std::endl;
  }
  {
    // (4) の形式
    const std::string s = "abc123def456ghi";
    const std::regex re("\\d+");
    const char fmt[] = "[$&]";
    const std::regex_constants::match_flag_type flags = std::regex_constants::format_first_only;
    std::cout << "(4) '" << std::regex_replace(s, re, fmt, flags) << '\'' << std::endl;
  }
  {
    // (5) の形式
    const char s[] = "abc123def456ghi";
    const std::regex re("(\\d)(\\d)(\\d)");
    const std::string fmt = "[$3$2$1]";
    std::cout << "(5) '" << std::regex_replace(s, re, fmt) << '\'' << std::endl;
  }
  {
    // (6) の形式
    const char s[] = "abc123def456ghi";
    const std::regex re("(\\d)(\\d)(\\d)");
    const char fmt[] = "[\\3\\2\\1]";
    const std::regex_constants::match_flag_type flags = std::regex_constants::format_sed;
    std::cout << "(6) '" << std::regex_replace(s, re, fmt, flags) << '\'' << std::endl;
  }
}
```
* std::regex_replace[color ff0000]
* std::regex[link basic_regex.md]
* std::regex_constants::match_flag_type[link /reference/regex/regex_constants/match_flag_type.md]
* std::regex_constants::format_no_copy[link /reference/regex/regex_constants/match_flag_type.md]
* std::regex_constants::format_first_only[link /reference/regex/regex_constants/match_flag_type.md]
* std::regex_constants::format_sed[link /reference/regex/regex_constants/match_flag_type.md]

### 出力
```
(1) 'abc[012]def'
(2) '[012]'
(3) 'abc[123]def[456]ghi'
(3) 'abc[123]def456ghi'
(5) 'abc[321]def[654]ghi'
(6) 'abc[321]def[654]ghi'
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
* [C++の�規表現ライブラリ: std::regex | 本の虫](https://cpplover.blogspot.jp/2015/01/c-stdregex.html)
