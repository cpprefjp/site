# assign
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& assign(const basic_string& str);                  // (1)

basic_string& assign(basic_string&& str) noexcept;              // (2) C++11

basic_string& assign(const basic_string& str,
                     size_type pos,
                     size_type n);                              // (3) C++03

basic_string& assign(const basic_string& str,
                     size_type pos,
                     size_type n = npos);                       // (3) C++14

basic_string& assign(const charT* s, size_type n);              // (4)

basic_string& assign(const charT* s);                           // (5)

basic_string& assign(size_type n, charT c);                     // (6)

template <class InputIterator>
basic_string& assign(InputIterator first,
                     InputIterator last);                       // (7)

basic_string& assign(initializer_list<charT>);                  // (8) C++11

basic_string& assign(std::basic_string_view<charT, traits> sv); // (9) C++17

basic_string& assign(std::basic_string_view<charT, traits> sv,
                     size_type pos,
                     size_type n = npos);                       // (10) C++17
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
文�列の再代入を行う。

この関数は、ア�ケータを除き、`basic_string`クラスのコンストラクタと同様のパラメータを受け取り、再代入を行う。代入演算�が一つのパラメータしか扱えないため、複数パラメータによる代入として使用する。


## 要件
- (3) : `pos <= str.`[`size()`](size.md)であること。
- (4) : `s` は少なくとも `n` の長さを持つ `charT` 型の配列を指していること。
- (5) : `s` は少なくとも `traits_type::length(s) + 1` の長さを持つ `charT` 型の配列を指していること。


## 効果
- (1) : コピー代入。`str`オブジェクトと同じ文�列を構築する。
    - `assign(str, 0, npos)`と�価。
- (2) : ムーブ代入。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (3) : `str`オブジェクトの部分文�列のコピーから構築する。`str`オブジェクトの`pos`番目から`n`文�の部分文�列がコピーされる。
    - 文�列の長さ `rlen` は、`n` と `str.`[`size`](size.md)`() - pos` の小さい方である。 `n == npos` の場合は、 `str.`[`size`](size.md)`() - pos` が使用される。
    - `assign(str.data() + pos, rlen)`を呼び出す。
- (4) : 文�配列`s`の先�`n`文�からなる部分文�列のコピーから構築する。
- (5) : 文�配列`s`のコピーから構築する。
    - `assign(s,` [`traits::length`](/reference/string/char_traits/length.md)`(s))`を呼び出す。
- (6) : 文�`c`の`n`回繰り返した文�列からなる`basic_string`オブジェクトを構築する。
    - `assign(basic_string(n, c))`と�価。
- (7) : 文�列の範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
    - `assign(basic_string(first, last))`と�価。
- (8) : 文�の初期化�リストから`basic_string`オブジェクトを構築する。
    - `assign(il.begin(), il.end())`を呼び出す。
- (9) : `std::basic_string_view`オブジェクトが参照する範囲をコピーして、`basic_string`オブジェクトを構築する。
    - `assign(`[`sv.data()`](/reference/string_view/basic_string_view/data.md)`,` [`sv.size()`](/reference/string_view/basic_string_view/size.md)`)` と�価。
- (10) : `std::basic_string_view`オブジェクトが参照する文�列を範囲指定でコピーして、`basic_string`オブジェクトを構築する。
    - 文�列の長さ `rlen` は、`n` と [`sv.size()`](/reference/string_view/basic_string_view/size.md)` - pos` の小さい方である。
    - `assign(`[`sv.data()`](/reference/string_view/basic_string_view/data.md) `+ pos, rlen)` を呼び出す。


## 戻り値
`*this`


## 例外
- (3) : `pos > str.`[`size()`](size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する
- (4) : `n >` [`max_size()`](max_size.md)である場合、[`length_error`](/reference/stdexcept.md)例外を送出する
- (10) : `pos >` [`sv.size()`](/reference/string_view/basic_string_view/size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する



## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // (1) コピー代入
  std::string s1;
  std::string s1_tmp = "hello";
  s1.assign(s1_tmp);
  std::cout << "s1 : " << s1 << std::endl;

  // (2) ムーブ代入
  std::string s2;
  s2.assign(std::string("hello"));
  std::cout << "s2 : " << s2 << std::endl;

  // (3) 部分文�列のコピーを代入
  // s2文�列オブジェクトの1番目の文�から3文�
  std::string s3;
  s3.assign(s2, 1, 3);
  std::cout << "s3 : " << s3 << std::endl;

  // (4) 文�配列の先�N文�を代入
  std::string s4;
  s4.assign("hello", 3);
  std::cout << "s4 : " << s4 << std::endl;

  // (5) 文�配列を代入
  std::string s5;
  s5.assign("hello");
  std::cout << "s5 : " << s5 << std::endl;

  // (6) 文�をN回繰り返して代入
  std::string s6;
  s6.assign(3, 'a');
  std::cout << "s6 : " << s6 << std::endl;

  // (7) 文�列の範囲を代入
  std::string s7;
  s7.assign(s1.begin(), s1.end());
  std::cout << "s7 : " << s7 << std::endl;

  // (8) 文�の初期化�リストを代入
  std::string s8;
  s8.assign({'h', 'e', 'l', 'l', 'o'});
  std::cout << "s8 : " << s8 << std::endl;

  // (9) std::basic_string_viewオブジェクトを代入
  std::string s9;
  s9.assign(std::string_view{"Hello World"}.substr(0, 5));
  std::cout << "s9 : " << s9 << std::endl;

  // (10) std::basic_string_viewオブジェクトを範囲指定して代入
  std::string s10;
  s10.assign(std::string_view{"Hello World"}, 0, 5);
  std::cout << "s10 : " << s10 << std::endl;
}
```
* assign[color ff0000]

### 出力
```
s1 : hello
s2 : hello
s3 : ell
s4 : hel
s5 : hello
s6 : aaa
s7 : hello
s8 : hello
s9 : Hello
s10 : Hello
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (7)の経緯となる提案文書
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(3)のオーバー�ードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
