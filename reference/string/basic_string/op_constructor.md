# コンストラクタ
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string();                                                 // (1) C++14
basic_string() noexcept(noexcept(Allocator()))                  // (1) C++17
  : basic_string(Allocator()) {}

explicit basic_string(const Allocator& a);                      // (2) C++14
explicit basic_string(const Allocator& a) noexcept;             // (2) C++17

explicit basic_string(const Allocator& a = Allocator());        // (1) + (2) C++03

basic_string(const basic_string& str);                          // (3)
basic_string(basic_string&& str) noexcept;                      // (4) C++11

basic_string(const basic_string& str,
             size_type pos,
             size_type n = npos,
             const Allocator& a = Allocator());                 // (5) C++14まで

basic_string(const basic_string& str,
             size_type pos,
             size_type n,
             const Allocator& a = Allocator());                 // (5) C++17

basic_string(const basic_string& str,
             size_type pos,
             const Allocator& a = Allocator());                 // (6) C++17

basic_string(const charT* s,
             size_type n,
             const Allocator& a = Allocator());                 // (7)

basic_string(const charT* s,
             const Allocator& a = Allocator());                 // (8)

basic_string(size_type n,
             charT c,
             const Allocator& a = Allocator());                 // (9)

template <class InputIterator>
basic_string(InputIterator begin, InputIterator end,
             const Allocator& a = Allocator());                 // (10)

basic_string(initializer_list<charT> init,
             const Allocator& = Allocator());                   // (11) C++11

basic_string(const basic_string& str, const Allocator&);        // (12) C++11
basic_string(basic_string&& str, const Allocator&);             // (13) C++11

explicit basic_string(std::basic_string_view<charT, traits> sv,
                      const Allocator& a = Allocator());        // (14) C++17
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : デフォルトコンストラクタ。ア�ケータをデフォルト構築して空の`basic_string`オブジェクトを構築する。
- (2) : ア�ケータを受け取るデフォルトコンストラクタ。空の`basic_string`オブジェクトを構築する。
- (3) : コピーコンストラクタ。`str`オブジェクトと同じ文�列を構築する。
- (4) : ムーブコンストラクタ。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (5) : `str`オブジェクトの部分文�列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から`n`文�の部分文�列がコピーされる。`n == npos`の場合、`pos`番目から末尾までの部分文�列がコピーされる。
- (6) : `str`オブジェクトの部分文�列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から末尾までの部分文�列がコピーされる。
- (7) : 文�配列`s`の先�`n`文�からなる部分文�列のコピーから`basic_string`オブジェクトを構築する。
- (8) : 文�配列`s`のコピーから`basic_string`オブジェクトを構築する。
- (9) : 文�`c`の`n`回繰り返した文�列からなる`basic_string`オブジェクトを構築する。
- (10) : 文�列の範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
- (11) : 文�の初期化�リストから`basic_string`オブジェクトを構築する。
- (12) : ア�ケータを受け取るコピーコンストラクタ。
- (13) : ア�ケータを受け取るムーブコンストラクタ。
- (14) : [`std::basic_string_view`](/reference/string_view/basic_string_view.md)オブジェクトからの変換コンストラクタ。`sv`が参照する範囲の文�列を`*this`にコピーする


## 要件
- (7)
    - C++03 : `s`がヌルポインタではないこと。`n < npos`であること。
    - C++14 : `s`は、`charT`型の要素を少なくても`n`個を持つ配列を指していること。
- (8)
    - C++03 : `s`がヌルポインタではないこと。
    - C++14 : `s`は、`charT`型の要素を少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個持つ配列を指していること。


## 例外
- (5), (6) : `pos > str.`[`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (13) : `alloc == str.`[`get_allocator()`](get_allocator.md)の場合、例外を投げない。


## 備考
- C++14 では、`explicit basic_string(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバー�ードに分割された。  
    これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
    std::basic_string<char> s = {};
    ```

    のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。


## 例
```cpp example
#include <iostream>
#include <string>
#include <utility>

int main()
{
  // デフォルト構築
  std::string s1;
  std::cout << "s1 : " << s1 << std::endl;

  // 文�配列からの構築
  std::string s2 = "hello";
  std::cout << "s2 : " << s2 << std::endl;

  // コピー構築
  std::string s3 = s2;
  std::cout << "s3 : " << s3 << std::endl;

  // ムーブ構築
  std::string s4 = std::move(s3);
  std::cout << "s4 : " << s4 << std::endl;

  // 部分文�列のコピーから構築
  // s4文�列オブジェクトの1番目の文�から3文�
  std::string s5(s4, 1, 3);
  std::cout << "s5 : " << s5 << std::endl;

  // 文�配列の先�N文�から構築
  std::string s6("hello", 3);
  std::cout << "s6 : " << s6 << std::endl;

  // 文�をN回繰り返して構築
  std::string s7(3, 'a');
  std::cout << "s7 : " << s7 << std::endl;

  // 文�列の範囲から構築
  std::string s8(s4.begin(), s4.end());
  std::cout << "s8 : " << s8 << std::endl;

  // 文�の初期化�リストから構築
  std::string s9 = {'h', 'e', 'l', 'l', 'o'};
  std::cout << "s9 : " << s9 << std::endl;

  // string_viewからの変換
  auto sv = std::string_view{"Hello World"}.substr(0, 5);
  std::string s14 {sv};
  std::cout << "s14 : " << s14 << std::endl;
}
```
* std::move[link /reference/utility/move.md]
* s4.begin()[link begin.md]
* s4.end()[link end.md]

### 出力
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
s14 : Hello
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (11)の経緯となる提案文書
- [LWG Issue 2069. Inconsistent exception spec for `basic_string` move constructor](https://wg21.cmeerw.net/lwg/issue2069)
- [LWG Issue 2193. Default constructors for standard library containers are explicit](https://wg21.cmeerw.net/lwg/issue2193)
    - `explicit basic_string(const Allocator& a = Allocator())` を 2 つのオーバー�ードに分割するきっかけとなったレポート
- [LWG Issue 2235. Undefined behavior without proper requirements on `basic_string` constructors](https://wg21.cmeerw.net/lwg/issue2235)
    - C++14で、(7)と(8)の要件を見直した。
- [LWG Issue 2583. There is no way to supply an allocator for `basic_string(str, pos)`](https://wg21.cmeerw.net/lwg/issue2583)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
