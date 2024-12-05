# operator+=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& operator+=(const basic_string& str);           // (1) C++03
constexpr basic_string& operator+=(const basic_string& str); // (1) C++20

basic_string& operator+=(const charT* s);           // (2) C++03
constexpr basic_string& operator+=(const charT* s); // (2) C++20

basic_string& operator+=(charT c);           // (3) C++03
constexpr basic_string& operator+=(charT c); // (3) C++20

basic_string& operator+=(initializer_list<charT> il);           // (4) C++11
constexpr basic_string& operator+=(initializer_list<charT> il); // (4) C++20

// string_viewを引数に取るオーバーロード
template<class T>
basic_string& operator+=(const T& t);           // (5) C++17
template<class T>
constexpr basic_string& operator+=(const T& t); // (5) C++20
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
指定された文字列、文字、あるいは初期化リストを追加する。

## テンプレートパラメータ制約

- (5) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`

## 要件

- (3) : `s` は少なくとも `traits_type::length(s) + 1` の長さを持つ `charT` 型の配列を指していること。


## 効果
- (1) 対象オブジェクトの末尾に `str` の値が追加（コピー）される。  
	[`append`](append.md)`(str)` と等価。

- (2) 対象オブジェクトの末尾に `s` から始まる NULL で終端された文字列が追加される。  
	[`append`](append.md)`(`[`basic_string`](/reference/string/basic_string.md)`<value_type, traits_type, allocator_type>(s))`（C++03 まで）、あるいは、[`append`](append.md)`(s)`（C++11 から）と等価。  
	なお、`s` から始まる NULL 終端された文字列の長さは、`traits_type::length(s)` で求められる。

- (3) 対象オブジェクトの末尾に文字 `c` が追加される。  
	[`append`](append.md)`(`[`basic_string`](/reference/string/basic_string.md)`<value_type, traits_type, allocator_type>(1, c))` と等価。

- (4) 対象オブジェクトの末尾に初期化リスト `il` で表された文字列が追加される。  
	[`append`](append.md)`(il)` と等価。

- (5) 対象オブジェクトの末尾に[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>`に変換可能な`t`の参照する文字列が追加される。  
以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return append(sv);
    ```
    * basic_string_view[link /reference/string_view/basic_string_view.md]
    * append[link append.md]


## 戻り値
`*this`


## 例外
- (1) [`size`](size.md)`() + str.`[`size`](size.md)`() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (2) [`size`](size.md)`() + traits_type::length(s) >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (3) [`size`](size.md)`() + 1 >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (4) [`size`](size.md)`() + il.size() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。

- (5) [`size`](size.md)`() + sv.size() >` [`max_size`](max_size.md)`()` の場合、`length_error` が送出される。


## 備考
本メンバ関数の呼び出しによって、対象オブジェクトの要素への参照、ポインタ、および、イテレータは無効になる可能性がある。


## 例
```cpp example
#include <iostream>
#include <string>
#include <string_view>

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

  using namespace std::string_view_literals;

  s1 += " :)"sv;
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
Hello, world! :) :)
```

## 関連項目

| 名前                          | 説明                   |
|-------------------------------|------------------------|
| [`append`](append.md)       | 文字／文字列を追加する |
| [`push_back`](push_back.md) | 文字を追加する         |
| [`insert`](insert.md)       | 文字／文字列を挿入する |
| [`operator+`](op_plus.md)   | 文字列を連結する       |


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (4)の経緯となる提案文書
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [LWG Issue 2758. `std::string{}.assign("ABCDE", 0, 1)` is ambiguous](https://wg21.cmeerw.net/lwg/issue2758)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(5)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
