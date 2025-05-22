# コンストラクタ
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
// デフォルトコンストラクタ
basic_string();                                                 // (1) C++14
basic_string() noexcept(noexcept(Allocator()))                  // (1) C++17
  : basic_string(Allocator()) {}
constexpr basic_string() noexcept(noexcept(Allocator()))        // (1) C++20
  : basic_string(Allocator()) {}

explicit basic_string(const Allocator& a);                      // (2) C++14
explicit basic_string(const Allocator& a) noexcept;             // (2) C++17
constexpr explicit basic_string(const Allocator& a) noexcept;   // (2) C++20

explicit basic_string(const Allocator& a = Allocator());        // (1) + (2) C++03

// コピーコンストラクタ
basic_string(const basic_string& str);                          // (3) C++03
constexpr basic_string(const basic_string& str);                // (3) C++20

// ムーブコンストラクタ
basic_string(basic_string&& str) noexcept;                      // (4) C++11
constexpr basic_string(basic_string&& str) noexcept;            // (4) C++20

// basic_stringの指定範囲から構築するコンストラクタ
basic_string(const basic_string& str,
             size_type pos,
             size_type n = npos,
             const Allocator& a = Allocator());                 // (5) C++03
basic_string(const basic_string& str,
             size_type pos,
             size_type n,
             const Allocator& a = Allocator());                 // (5) C++17
constexpr basic_string(const basic_string& str,
                       size_type pos,
                       size_type n,
                       const Allocator& a = Allocator());       // (5) C++20

basic_string(const basic_string& str,
             size_type pos,
             const Allocator& a = Allocator());                 // (6) C++17
constexpr basic_string(const basic_string& str,
                       size_type pos,
                       const Allocator& a = Allocator());       // (6) C++20

constexpr basic_string(basic_string&& str,
                       size_type pos,
                       const Allocator& a = Allocator());       // (17) C++23

constexpr basic_string(basic_string&& str,
                       size_type pos,
                       size_type n,
                       const Allocator& a = Allocator());       // (18) C++23

// 文字列ポインタから構築するコンストラクタ
basic_string(const charT* s,
             size_type n,
             const Allocator& a = Allocator());                 // (7) C++03
constexpr basic_string(const charT* s,
                       size_type n,
                       const Allocator& a = Allocator());       // (7) C++20

basic_string(const charT* s,
             const Allocator& a = Allocator());                 // (8) C++03
constexpr basic_string(const charT* s,
                       const Allocator& a = Allocator());       // (8) C++20

basic_string(nullptr_t) = delete;                               // (16) C++23

// 文字個数から構築するコンストラクタ
basic_string(size_type n,
             charT c,
             const Allocator& a = Allocator());                 // (9) C++03
constexpr basic_string(size_type n,
                       charT c,
                       const Allocator& a = Allocator());       // (9) C++20

// イテレータ範囲から構築するコンストラクタ
template <class InputIterator>
basic_string(InputIterator begin, InputIterator end,
             const Allocator& a = Allocator());                 // (10) C++03
template <class InputIterator>
constexpr basic_string(InputIterator begin, InputIterator end,
                       const Allocator& a = Allocator());       // (10) C++20

// 初期化子リストから構築するコンストラクタ
basic_string(initializer_list<charT> init,
             const Allocator& = Allocator());                   // (11) C++11
constexpr basic_string(initializer_list<charT> init,
                       const Allocator& = Allocator());         // (11) C++20

// アロケータ指定コピー／ムーブコンストラクタ
basic_string(const basic_string& str, const Allocator&);           // (12) C++11
constexpr basic_string(const basic_string& str, const Allocator&); // (12) C++20

basic_string(basic_string&& str, const Allocator&);             // (13) C++11
constexpr basic_string(basic_string&& str, const Allocator&);   // (13) C++20

// string_viewから構築するコンストラクタ
template<class T>
explicit basic_string(const T& t,
                      const Allocator& a = Allocator());           // (14) C++17
template<class T>
constexpr explicit basic_string(const T& t,
                                const Allocator& a = Allocator()); // (14) C++20

template<class T>
basic_string(const T& t,
             size_type pos,
             size_type n,
             const Allocator& a = Allocator());                  // (15) C++17
template<class T>
constexpr basic_string(const T& t,
                       size_type pos,
                       size_type n,
                       const Allocator& a = Allocator());        // (15) C++20

template <container-compatible-range<CharT> R>
constexpr basic_string(from_range_t, R&& rg,
                       const Allocator& a = Allocator());        // (19) C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* from_range_t[link ../../ranges/from_range_t.md]

## 概要
- (1) : デフォルトコンストラクタ。アロケータをデフォルト構築して空の`basic_string`オブジェクトを構築する。
- (2) : アロケータを受け取るデフォルトコンストラクタ。空の`basic_string`オブジェクトを構築する。
- (3) : コピーコンストラクタ。`str`オブジェクトと同じ文字列を構築する。
- (4) : ムーブコンストラクタ。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (5) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。`n == npos`の場合、`pos`番目から末尾までの部分文字列がコピーされる。
- (6) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から末尾までの部分文字列がコピーされる。
- (7) : 文字配列`s`の先頭`n`文字からなる部分文字列のコピーから`basic_string`オブジェクトを構築する。
- (8) : 文字配列`s`のコピーから`basic_string`オブジェクトを構築する。
- (9) : 文字`c`の`n`回繰り返した文字列からなる`basic_string`オブジェクトを構築する。
- (10) : 文字列のイテレータ範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
- (11) : 文字の初期化子リストから`basic_string`オブジェクトを構築する。
- (12) : アロケータを受け取るコピーコンストラクタ。
- (13) : アロケータを受け取るムーブコンストラクタ。
- (14) : [`std::basic_string_view`](/reference/string_view/basic_string_view.md)オブジェクトからの変換コンストラクタ。[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>`に変換可能な`t`が参照する範囲の文字列を`*this`にコピーする。
- (15) : [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>`に変換可能な`t`が参照する範囲の文字列の`pos`番目から`n`文字の部分文字列がコピーされる。`n == npos`の場合、`pos`番目から末尾までの部分文字列がコピーされる。
- (17) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。`n == npos`の場合、`pos`番目から末尾までの部分文字列がコピーされる。`str`は未規定の値になる。
- (18) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から末尾までの部分文字列がコピーされる。`str`は未規定の値になる。
- (19) : Range`rg`から`basic_string`オブジェクトを構築する。


## テンプレートパラメータ制約

- (14) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`
- (15) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`であること


## 要件
- (7)
    - C++03 : `s`がヌルポインタではないこと。`n < npos`であること。
    - C++14 : `s`は、`charT`型の要素を少なくても`n`個を持つ配列を指していること。
- (8)
    - C++03 : `s`がヌルポインタではないこと。
    - C++14 : `s`は、`charT`型の要素を少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個持つ配列を指していること。


## 例外
- (5), (6), (17), (18) : `pos > str.`[`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (13) : `alloc == str.`[`get_allocator()`](get_allocator.md)の場合、例外を投げない。


## 備考
- C++14 では、`explicit basic_string(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
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
    - `explicit basic_string(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG Issue 2235. Undefined behavior without proper requirements on `basic_string` constructors](https://wg21.cmeerw.net/lwg/issue2235)
    - C++14で、(7)と(8)の要件を見直した。
- [LWG Issue 2583. There is no way to supply an allocator for `basic_string(str, pos)`](https://wg21.cmeerw.net/lwg/issue2583)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
- [LWG Issue 2742. Inconsistent string interface taking `string_view`](https://wg21.cmeerw.net/lwg/issue2742)
    - `string_view`から範囲を指定して構築する(15)を追加
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(14)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P2166R1 A Proposal to Prohibit std::basic_string and std::basic_string_view construction from nullptr.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2166r1.html)
    - C++23での(16)`nullptr_t`をとるコンストラクタのdelete宣言追加
- [P2438R2 `std::string::substr() &&`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2438r2.html)
    - C++23での(17), (18)`basic_string&&`と範囲指定をとるコンストラクタ追加
