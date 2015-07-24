#append
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& append(const basic_string& str);                 // (1)

basic_string& append(const basic_string& str,
                     size_type pos,
                     size_type n);                             // (2) C++03

basic_string& append(const basic_string& str,
                     size_type pos,
                     size_type n = npos);                      // (2) C++14

basic_string& append(const charT* s, size_type n);             // (3)

basic_string& append(const charT* s);                          // (4)

basic_string& append(size_type n, charT c);                    // (5)

template <class InputIterator>
basic_string& append(InputIterator first, InputIterator last); // (6)

basic_string& append(initializer_list<charT> il);              // (7) C++11 から
```
* initializer_list[link /reference/initializer_list.md]

##概要
指定された文字列、文字、あるいは初期化リストを追加する。


##要件
- (2) では、`pos <=` [`size`](./size.md)`()` であること。

- (3) では、`s` は少なくとも `n` の長さを持つ `charT` 型の配列を指していること。

- (4) では、`s` は少なくとも `traits_type::length(s) + 1` の長さを持つ `charT` 型の配列を指していること。

- (6) では、`[first, last)` が有効な範囲であること。


##効果
- (1) 対象オブジェクトの末尾に `str` の値が追加（コピー）される。
    * C++03 まで：`append(str, 0, npos)` と同一。
    * C++11 から：`append(str.`[`data`](./data.md)`(), str.`[`size`](./size.md)`())` と同一。

- (2) 対象オブジェクトの末尾に `str` の `pos` 以降の文字が追加される。
    追加される文字列の長さ `rlen` は、`n` と `str.`[`size`](./size.md)`() - pos` の小さい方である。 `n == npos` の場合は、 `str.`[`size`](./size.md)`() - pos` が使用される。
    * C++03 まで：対象オブジェクトの末尾に `str` の `pos` 番目からの `rlen` 文字を追加（コピー）する。
    * C++11 から：`append(str.`[`data`](./data.md)`() + pos, rlen)` と同一。

- (3) 対象オブジェクトの末尾に `s` が指す長さ `n` の文字列が追加（コピー）される。
    * C++03 まで：`append(`[`basic_string`](op_constructor.md)`<value_type, traits_type, allocator_type>(s, n))` と同一。
    * C++11 から：対象オブジェクトの末尾に `s` からの `n` 文字を追加（コピー）する。

- (4) 対象オブジェクトの末尾に `s` が指す NULL 終端された文字列が追加（コピー）される。
    * C++03 まで：`append(`[`basic_string`](op_constructor.md)`<value_type, traits_type, allocator_type>(s))` と同一。
    * C++11 から：`append(s, traits_type::length(s))` と同一。

- (5) 対象オブジェクトの末尾に、文字 `c` が `n` 文字が追加（コピー）される。  
    `append(`[`basic_string`](op_constructor.md)`<value_type, traits_type, allocator_type>(n, c))` と同一。

- (6) 対象オブジェクトの末尾に、範囲 `[first, last)` の文字列が追加（コピー）される。  
    `append(`[`basic_string`](op_constructor.md)`<value_type, traits_type, allocator_type>(first, last))` と同一。

- (7) 対象オブジェクトの末尾に初期化リスト `il` で表された文字列が追加される。  
    `append(il.begin(), il.end())` と同一。


##戻り値
`*this`


##例外
- (1) C++03 まで：[`size`](size.md)`() >= npos - str.`[`size`](size.md)`()` の場合、`length_error` が送出される。  
    C++11 から：[`size`](size.md)`() + str.`[`size`](size.md)`() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (2) `pos > str.`[`size`](./size.md)`()` の場合、`out_of_range` が送出される。  
    C++03 まで：[`size`](./size.md)`() >= npos - rlen` の場合、`length_error` が送出される。  
    C++11 から：[`size`](./size.md)`() + rlen >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (3) C++03 まで：[`size`](./size.md)`() >= npos - n` の場合、`length_error` が送出される。  
    C++11 から：[`size`](./size.md)`() + n >` [`max_size`](./max_size.md)`()` の場合、`length_error` が送出される。

- (4) C++03 まで：[`size`](./size.md)`() >= npos - traits::length(s)` の場合、`length_error` が送出される。  
    C++11 から：[`size`](./size.md)`() + traits::length(s) >` [`max_size`](./max_size.md)`()` の場合、`length_error` が送出される。

- (5) C++03 まで：[`size`](./size.md)`() >= npos - n` の場合、`length_error` が送出される。  
    C++11 から：[`size`](./size.md)`() + n >` [`max_size`](./max_size.md)`()` の場合、`length_error` が送出される。

- (6) C++03 まで：[`size`](./size.md)`() >= npos -` [`distance`](/reference/iterator/distance.md)`(first, last)` の場合、`length_error` が送出される。  
    C++11 から：[`size`](./size.md)`() +` [`distance`](/reference/iterator/distance.md)`(first, last) >` [`max_size`](./max_size.md)`()` の場合、`length_error` が送出される。

- (7) [`size`](./size.md)`() + il.`[`size`](/reference/initializer_list.md)`() >` [`max_size`](./max_size.md)`()` の場合、`length_error` が送出される。


##備考
本メンバ関数の呼び出しによって、対象オブジェクトの要素への参照、ポインタ、および、イテレータは無効になる可能性がある。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s1("Hello");
  std::cout << s1 << '\n';

  std::string s2("Hell, world!");
  s1.append(s2, 4, 2);
  std::cout << s1 << '\n';

  s1.append("worldworldworld", 5);
  std::cout << s1 << '\n';

  s1.append(2, '!');
  std::cout << s1 << '\n';

  s1.append({ ' ', ':', ')' });
  std::cout << s1 << '\n';
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* append[color ff0000]

###出力
```
Hello
Hello, 
Hello, world
Hello, world!!
Hello, world!! :)
```

##関連項目

|                                     |                        |
|-------------------------------------|------------------------|
| [`operator+=`](./op_plus_assign.md) | 文字／文字列を追加する |
| [`push_back`](./push_back.md)       | 文字を追加する         |
| [`insert`](./insert.md)             | 文字／文字列を挿入する |
| [`operator+`](./op_plus.md)         | 文字列を連結する       |


##参照
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(2)のオーバーロードに、`n = npos`のデフォルト引数を追加。

