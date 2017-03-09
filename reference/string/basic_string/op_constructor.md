#コンストラクタ
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string();                                          // (1) C++14
explicit basic_string(const Allocator&);                 // (2) C++14
explicit basic_string(const Allocator& a = Allocator()); // (1) + (2) C++03

basic_string(const basic_string& str);                   // (3)
basic_string(basic_string&& str) noexcept;               // (4) C++11

basic_string(const basic_string& str,
             size_type pos,
             size_type n = npos,
             const Allocator& a = Allocator());          // (5)

basic_string(const charT* s,
             size_type n,
             const Allocator& a = Allocator());          // (6)

basic_string(const charT* s,
             const Allocator& a = Allocator());          // (7)

basic_string(size_type n,
             charT c,
             const Allocator& a = Allocator());          // (8)

template <class InputIterator>
basic_string(InputIterator begin, InputIterator end,
             const Allocator& a = Allocator());          // (9)

basic_string(initializer_list<charT> init,
             const Allocator& = Allocator());            // (10) C++11

basic_string(const basic_string& str, const Allocator&); // (11) C++11
basic_string(basic_string&& str, const Allocator&);      // (12) C++11
```
* initializer_list[link /reference/initializer_list.md]

##概要
- (1) : デフォルトコンストラクタ。空の`basic_string`オブジェクトを構築する。
- (2) : アロケータを受け取るデフォルトコンストラクタ。空の`basic_string`オブジェクトを構築する。
- (3) : コピーコンストラクタ。`str`オブジェクトと同じ文字列を構築する。
- (4) : ムーブコンストラクタ。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (5) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。
- (6) : 文字配列`s`の先頭`n`文字からなる部分文字列のコピーから`basic_string`オブジェクトを構築する。
- (7) : 文字配列`s`のコピーから`basic_string`オブジェクトを構築する。
- (8) : 文字`c`の`n`回繰り返した文字列からなる`basic_string`オブジェクトを構築する。
- (9) : 文字列の範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
- (10) : 文字の初期化子リストから`basic_string`オブジェクトを構築する。
- (11) : アロケータを受け取るコピーコンストラクタ。
- (12) : アロケータを受け取るムーブコンストラクタ。


##要件
- (6)
    - C++03 : `s`がヌルポインタではないこと。`n < npos`であること。
    - C++14 : `s`は、`charT`型の要素を少なくても`n`個を持つ配列を指していること。
- (7)
    - C++03 : `s`がヌルポインタではないこと。
    - C++14 : `s`は、`charT`型の要素を少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個持つ配列を指していること。


##例外
- (12) : `alloc == str.`[`get_allocator()`](get_allocator.md)の場合、例外を投げない。


##備考
- C++14 では、`explicit basic_string(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
    これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
std::basic_string<char> s = {};
```

    のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。


##例
```cpp
#include <iostream>
#include <string>
#include <utility>

int main()
{
  // デフォルト構築
  std::string s1;
  std::cout << "s1 : " << s1 << std::endl;

  // 文字配列からの構築
  std::string s2 = "hello";
  std::cout << "s2 : " << s2 << std::endl;

  // コピー構築
  std::string s3 = s2;
  std::cout << "s3 : " << s3 << std::endl;

  // ムーブ構築
  std::string s4 = std::move(s3);
  std::cout << "s4 : " << s4 << std::endl;

  // 部分文字列のコピーから構築
  // s4文字列オブジェクトの1番目の文字から3文字
  std::string s5(s4, 1, 3);
  std::cout << "s5 : " << s5 << std::endl;

  // 文字配列の先頭N文字から構築
  std::string s6("hello", 3);
  std::cout << "s6 : " << s6 << std::endl;

  // 文字をN回繰り返して構築
  std::string s7(3, 'a');
  std::cout << "s7 : " << s7 << std::endl;

  // 文字列の範囲から構築
  std::string s8(s4.begin(), s4.end());
  std::cout << "s8 : " << s8 << std::endl;

  // 文字の初期化子リストから構築
  std::string s9 = {'h', 'e', 'l', 'l', 'o'};
  std::cout << "s9 : " << s9 << std::endl;
}
```
* std::move[link /reference/utility/move.md]
* s4.begin()[link begin.md]
* s4.end()[link end.md]

###出力
```
s1 : 
s2 : hello
s3 : hello
s4 : hello
s5 : ell
s6 : hel
s7 : aaa
s8 : hello
s9 : hello
```

##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (10)の経緯となる提案文書
- [LWG Issue 2069. Inconsistent exception spec for `basic_string` move constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2069)
- [LWG Issue 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
    `explicit basic_string(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG Issue 2235. Undefined behavior without proper requirements on `basic_string` constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2235)
    - C++14で、(6)と(7)の要件を見直した。

