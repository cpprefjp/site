# operator+=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& operator+=(const basic_string& str);    // (1)

basic_string& operator+=(const charT* s);             // (2)

basic_string& operator+=(charT c);                    // (3)

basic_string& operator+=(initializer_list<charT> il); // (4) C++11 から
```
* initializer_list[link /reference/initializer_list.md]

## 概要
指定された文字列、文字、あるいは初期化リストを追加する。


## 要件
`s` は少なくとも `traits_type::length(s) + 1` の長さを持つ `charT` 型の配列を指していること。


## 効果
- (1) 対象オブジェクトの末尾に `str` の値が追加（コピー）される。  
	[`append`](append.md)`(str)` と同一。

- (2) 対象オブジェクトの末尾に `s` から始まる NULL で終端された文字列が追加される。  
	[`append`](append.md)`(`[`basic_string`](/reference/string/basic_string.md)`<value_type, traits_type, allocator_type>(s))`（C++03 まで）、あるいは、[`append`](append.md)`(s)`（C++11 から）と同一。  
	なお、`s` から始まる NULL 終端された文字列の長さは、`traits_type::length(s)` で求められる。

- (3) 対象オブジェクトの末尾に文字 `c` が追加される。  
	[`append`](append.md)`(`[`basic_string`](/reference/string/basic_string.md)`<value_type, traits_type, allocator_type>(1, c))` と同一。

- (4) 対象オブジェクトの末尾に初期化リスト `il` で表された文字列が追加される。  
	[`append`](append.md)`(il)` と同一。


## 戻り値
`*this`


## 例外
- (1) [`size`](size.md)`() + str.`[`size`](size.md)`() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (2) [`size`](size.md)`() + traits_type::length(s) >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (3) [`size`](size.md)`() + 1 >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (4) [`size`](size.md)`() + il.size() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。


## 備考
本メンバ関数の呼び出しによって、対象オブジェクトの要素への参照、ポインタ、および、イテレータは無効になる可能性がある。


## 例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s1("Hello");
  std::cout << s1 << '\n';

  std::string s2(", ");
  s1 += s2;
  std::cout << s1 << '\n';

  s1 += "world";
  std::cout << s1 << '\n';

  s1 += '!';
  std::cout << s1 << '\n';

  s1 += { ' ', ':', ')' };
  std::cout << s1 << '\n';
}
```
* +=[color ff0000]

### 出力
```
Hello
Hello, 
Hello, world
Hello, world!
Hello, world! :)
```

## 関連項目

|                               |                        |
|-------------------------------|------------------------|
| [`append`](append.md)       | 文字／文字列を追加する |
| [`push_back`](push_back.md) | 文字を追加する         |
| [`insert`](insert.md)       | 文字／文字列を挿入する |
| [`operator+`](op_plus.md)   | 文字列を連結する       |


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (4)の経緯となる提案文書

