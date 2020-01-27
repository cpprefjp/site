# format
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class OutputIter>
OutputIter
format(OutputIter out, const char_type* fmt_first, const char_type* fmt_last,
       regex_constants::match_flag_type flags = regex_constants::format_default) const; // (1)

template <class OutputIter, class ST, class SA>
OutputIter
format(OutputIter out, const basic_string<char_type, ST, SA>& fmt,
       regex_constants::match_flag_type flags = regex_constants::format_default) const; // (2)

template <class ST, class SA>
basic_string<char_type, ST, SA>
format(const basic_string<char_type, ST, SA>& fmt,
       regex_constants::match_flag_type flags = regex_constants::format_default) const; // (3)

string_type
format(const char_type* fmt,
       regex_constants::match_flag_type flags = regex_constants::format_default) const; // (4)
```
* basic_string[link ../../string/basic_string.md]
* regex_constants::format_default[link ../regex_constants/match_flag_type.md]


## 概要
`*this` を書式文�列に従って出力する。


## 要件
- [`ready`](ready.md)`() == true` であること。
- テンプレート引数 `OutputIter` は出力イテレータの要件を満たすこと。


## 効果
- (1) 書式文�列 `[fmt_first, fmt_last)` を出力イテレータ `out` にコピーする。
    コピーされる書式文�列内のエスケープシーケンスや書式指定�は、対応する文�や `*this` 内の対応する文�列に置換される。  
    書式文�列の形式は、ビットマスク `flags` で指定する。
- (2) `return format(out, fmt.`[`data`](../../string/basic_string/data.md)`(), fmt.`[`data`](../../string/basic_string/data.md)`() + fmt.`[`size`](../../string/basic_string/size.md)`(), flags)` と�価。
- (3) [`basic_string`](../../string/basic_string.md)`<char_type, ST, SA>` 型の空の文�列変数 `result` を構築し、`format(`[`back_inserter`](../../iterator/back_inserter.md)`(result), fmt, flags)` を呼び出す。
- (4) `string_type` 型の空の文�列変数 `result` を構築し、`format(`[`back_inserter`](../../iterator/back_inserter.md)`(result), fmt, fmt +` [`char_traits`](../../string/char_traits.md)`<char_type>::`[`length`](../../string/char_traits/length.md)`(fmt), flags)` を呼び出す。


## 戻り値
- (1) `out`
- (2) `out`
- (3) 構築した文�列変数 `result`
- (4) 構築した文�列変数 `result`


## 備考
`flags` に指定可能な（指定して意味のある） [`regex_constants::match_flag_type`](../regex_constants/match_flag_type.md) のフラグは、以下のいずれかのみである。

- `format_default`
- `format_sed`


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s[] = " 000 abc 123 def 999 ";
  const std::regex re("(\\w+) (\\d+) (\\w+)");
  std::cmatch m;
  if (std::regex_search(s, m, re)) {
    std::cout << m.format("$1$3 [$2]") << std::endl;
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* format[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]

### 出力
```
abcdef [123]
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
